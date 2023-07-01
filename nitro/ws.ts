import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/adapters/node-http';
import EventEmitter from 'events';
import { IncomingMessage } from 'http';
import WebSocket, { WebSocketServer as WSWebSocketServer, WebSocketServer } from 'ws';
import { appRouter } from '~/server/trpc/router';

export default defineNitroPlugin((nitro) => {
  const WebSocketServer = WebSocket.Server || WSWebSocketServer;
  const wss = new WebSocketServer({
    host: "0.0.0.0",
    port: 3002,
  });

  const handler = applyWSSHandler({
    wss, router: appRouter,
    createContext: function (opts: NodeHTTPCreateContextFnOptions<IncomingMessage, WebSocket>) {
      const ee = new EventEmitter();
      return { ee };
    }
  });


  const onClose = (ws: WebSocketServer) => {
    console.log(`client disconnected: ${JSON.stringify(ws)}`)
  };

  const onConnection = (ws: WebSocketServer) => {
    console.log(`client connected: ${JSON.stringify(ws)}`)
    ws.once('close', onClose)
  }

  wss.on('connection', onConnection);

  nitro.hooks.hookOnce('close', async () => {
    handler.broadcastReconnectNotification();
    wss.close();
  })
})
