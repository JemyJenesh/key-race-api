import express from "express";

import gameRoutes from "../game/routes";
import playerRoutes from "../player/routes";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({
    App: "Key Race",
    version: "0.1",
  });
});

router.use("/games", gameRoutes);

router.use("/players", playerRoutes);

export default router;
