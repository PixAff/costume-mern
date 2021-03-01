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

import { createRole, getRoles } from "../controllers/roleController.js";

// SCRIPT
router.get("/scripts", getScripts);
router.get("/scripts/:id", getScript);

router.post("/scripts", createScript);
router.patch("/script/:id", updateScript);
router.delete("/script/:id", deleteScript);
router.patch("/script/:id/likeScript", likeScript);

// SCENE
router.get("/scenes/:scriptid", getScenes);
router.post("/scenes/:scriptid", createScene);
router.delete("/script/:id/scene/:id", deleteScene);
router.patch("/scene/:id", updateScene);

// ROLE
router.get("/roles/:scriptid", getRoles);
router.post("/roles/:scriptid", createRole);

export default router;
