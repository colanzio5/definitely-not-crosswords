// import { inferAsyncReturnType } from '@trpc/server'
// import { H3Event } from 'h3'

import * as trpc from '@trpc/server';
import { EventEmitter } from 'events';

export const createContext = async () => {
  const ee = new EventEmitter();
  // const redis = createClient({ url: 'redis://127.0.0.1:6379' })
  // const prisma = new PrismaClient()
  const ctx = { ee }
  return ctx;
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
