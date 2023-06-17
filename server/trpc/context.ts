import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";
// import { usePrisma } from '@sidebase/nuxt-prisma'
/**
 *
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add \`prisma\` like this if you've set it up:
   * \`\`\`
   * const prisma = usePrisma(event)
   * return { prisma }
   * \`\`\`
   *
   * You can import \`usePrisma\` like this: \`import { usePrisma } from '@sidebase/nuxt-prisma'\`
   */
  //   const prisma = usePrisma(event)
  const prisma = new PrismaClient();
  return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
