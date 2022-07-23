import Player from "./model";

const create = async (name) => {
  return await Player.create({ name });
};

const get = async (id) => {
  return await Player.findById(id);
};

// const update = async (id, { hasStarted, isOver, player }) => {
//   await Game.findByIdAndUpdate(id, {
//     hasStarted,
//     isOver,
//     $push: {
//       players: player,
//     },
//   });

//   return await get(id);
// };

const playerService = {
  create,
  get,
  // update,
};

export default playerService;
