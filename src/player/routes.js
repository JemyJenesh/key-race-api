import express from "express";
import playerController from "./controller";

const router = express.Router();
const { create, get } = playerController;

router.post("/", create);
router.get("/:id", get);

export default router;
