import express from "express";
import faker from "faker";
const router = express.Router();

import {
  getScripts,
  createScript,
  updateScript,
  deleteScript,
  likeScript,
  getScript,
} from "../controllers/scriptController.js";

import {
  createScene,
  getScenes,
  deleteScene,
  updateScene,
} from "../controllers/sceneController.js";

// SCRIPT
router.get("/scripts", getScripts);
router.get("/:id", getScript);

router.post("/", createScript);
router.patch("/:id", updateScript);
router.delete("/:id", deleteScript);
router.patch("/:id/likeScript", likeScript);

// SCENE
router.get("/script/:id/scenes", getScenes);
router.post("/script/:id/scene", createScene);
router.delete("/script/:id/scene/:id", deleteScene);
router.patch("/scene/:id", updateScene);

export default router;
