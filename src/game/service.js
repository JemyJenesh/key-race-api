import Player from "../player/model";
import Game from "./model";
import { getData } from "../utils/quotable";

const create = async (playerId) => {
  const words = await getData();
  const player = await Player.findById(playerId);
  return await Game.create({
    words,
    createdBy: playerId,
    players: [player],
    startTime: new Date().getTime(),
  });
};

const get = async (id) => {
  return await Game.findById(id);
};

const update = async (id, { hasStarted, isOver, player }) => {
  await Game.findByIdAndUpdate(id, {
    hasStarted,
    isOver,
    $push: {
      players: player,
    },
  });

  return await get(id);
};

const gameService = {
  create,
  get,
  update,
};

export default gameService;
