import express from "express";
import gameController from "./controller";

const router = express.Router();
const { create, get, update } = gameController;

router.post("/", create);
router.get("/:id", get);
router.put("/:id", update);

export default router;
