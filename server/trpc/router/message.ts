import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { ee } from ".";

export const messageRouter = router({
  onMessage: publicProcedure.subscription(() => {
    return observable<string>((emit) => {
      const onMessage = (data: string) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onMessage()` when `message` is triggered in our event emitter
      ee.on("message", onMessage);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("message", onMessage);
      };
    });
  }),
  sendMessage: publicProcedure
    // This is the input schema of your procedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query((opts) => {
      const { input } = opts;
      // This is what you're returning to your client
      ee.emit("message", input?.text);
      return input?.text;
    }),
});
