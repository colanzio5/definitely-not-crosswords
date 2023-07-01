import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { ee, prisma } from ".";
import { GameAction, Prisma } from "@prisma/client";

export const activeGameRouter = router({
  onAddActions: publicProcedure
    .input(
      z.object({
        activeGameId: z.string()
      })
    )
    .subscription((opts) => {
      return observable<GameAction[]>((emit) => {
        const onAdd = (data: GameAction[]) => emit.next(data);
        ee.on(`active-game-actions-${opts.input.activeGameId}`, onAdd);
        return () => ee.off(`active-game-actions-${opts.input.activeGameId}`, onAdd);
      });
    }),
  addActions: publicProcedure
    .input(
      z.object({
        userEmail: z.string().email(),
        activeGameId: z.string().uuid(),
        actions: z
          .object({
            cordX: z.number(),
            cordY: z.number(),
            actionType: z.string(),
            previousState: z.string(),
            state: z.string(),
          })
          .array(),
      })
    )
    .mutation(async (opts) => {
      const user = await prisma.user.findUnique({
        where: { email: opts.input.userEmail },
        select: { id: true },
      });
      await prisma.gameAction.createMany({
        data: opts.input.actions.map((a) => {
          return {
            ...a,
            userId: user?.id,
            type: "GameAction",
            submittedAt: new Date(),
            activeGameId: opts.input.activeGameId
          } as Prisma.GameActionCreateManyInput;
        }),
      });
      ee.emit(`active-game-actions-${opts.input.activeGameId}`, opts.input.actions);
      return opts.input.actions;
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.activeGame.findUnique({
        where: { id: input.id },
        include: {
          actions: true,
          gameMembers: true,
          game: {
            include: {
              questions: true,
            },
          },
        },
      });
    }),
});
