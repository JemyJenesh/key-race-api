import { Server } from "socket.io";
import gameService from "../game/service";

export const initSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connect", (socket) => {
    socket.on("gameCreated", async (game) => {
      socket.join(game._id);
    });

    socket.on("start", async (game) => {
      const gameId = game?._id;

      socket.join(gameId);

      const updatedGame = await gameService.update(gameId, {
        hasStarted: true,
      });

      io.to(gameId).emit("gameUpdated", updatedGame);
    });

    socket.on("playerJoined", async (game) => {
      const gameId = game?._id;
      socket.join(gameId);
      const updatedGame = await gameService.get(gameId);
      io.to(gameId).emit("gameUpdated", updatedGame);
    });
  });
};
