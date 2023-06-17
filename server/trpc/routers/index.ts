import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  activeGames: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const activeGames = await prisma.activeGame.findMany({
        where: { gameMembers: { some: { user: { email: input.email }}} },
      });
      console.log(activeGames);
      return { activeGames };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
