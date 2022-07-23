import mongoose from "mongoose";

import { playerSchema } from "../player/model";

const { model, Schema } = mongoose;

const gameSchema = new Schema({
  createdBy: {
    ref: "Player",
    type: Schema.Types.ObjectId,
  },
  hasStarted: {
    default: false,
    type: Boolean,
  },
  isOver: {
    default: false,
    type: Boolean,
  },
  players: [playerSchema],
  startTime: Number,
  words: [String],
});

const Game = model("Game", gameSchema);

export default Game;
