import { Server } from "socket.io";
import gameService from "../game/service";
import playerService from "../player/service";

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

    socket.on("wordTyped", async ({ game: g, player: p, word }) => {
      let game = await gameService.get(g._id);

      if (game.hasStarted && !game.isOver) {
        let player = game.players.find((player) => player._id == p._id);
        let playerWord = game.words[player.wordIndex];

        if (word === playerWord) {
          player.wordIndex++;
          const gameId = g._id;
          if (player.wordIndex !== game.words.length) {
            game = await game.save();
            // console.log("game", game);
            io.to(gameId).emit("gameUpdated", game);
          } else {
            let endTime = new Date().getTime();
            let { startTime } = game;

            player.speed = calculateSpeed(endTime, startTime, player);
            game = await game.save();

            socket.emit("gameFinished");
            io.to(gameId).emit("gameUpdated", game);
          }

          await playerService.update(player.id, {
            speed: player.speed,
            wordIndex: player.wordIndex,
          });
        }
      }
    });
  });
};

const calculateSpeed = (endTime, startTime, player) => {
  console.log(endTime, startTime, player);
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;
  const speed = Math.floor(player.wordIndex / timeInMinutes);

  return speed;
};
