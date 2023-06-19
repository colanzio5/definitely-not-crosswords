import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  gamesList: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const activeGames = await prisma.activeGame.findMany({
        include: { game: true },
        where: { gameMembers: { some: { user: { email: input.email } } } },
      });
      const completedGames = await prisma.completedGame.findMany({
        include: { game: true },
        where: { gameMembers: { some: { user: { email: input.email } } } },
      });

      const filterIds = [
        ...completedGames.map((c) => c.game.id),
        ...activeGames.map((a) => a.game.id),
      ];
      const games = await prisma.game.findMany({
        where: { id: { notIn: filterIds } },
      });
      return new Array().concat(games, completedGames, activeGames);
    }),

  getActiveGameById: publicProcedure
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

// export type definition of API
export type AppRouter = typeof appRouter;
