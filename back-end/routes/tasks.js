import express from 'express';
import * as taskController from "../controllers/tasks.js";
import { validateRole, validateToken } from '../middleware/auth.js';

export const router = express.Router();

//get all tasks
router.get("/", validateToken, validateRole("WORKER"), taskController.getAllTasks);
//get a worker's tasks
router.get("/worker/:workerId", validateToken, validateRole("WORKER"), taskController.getTasksByWorkerId);
//get a certain task by id
router.get("/:taskId", validateToken, validateRole("WORKER"), taskController.getTaskById);

//creates a task
router.post("/", validateToken, validateRole("MANAGER"), taskController.createTask);
//sets a task to the worker
router.patch("/:taskId/set-task", validateToken, validateRole("MANAGER"), taskController.setTaskToWorker);
//solves a task
router.patch("/solve/:taskId", validateToken, validateRole("WORKER"), taskController.solveTask);
//closes a task
router.patch("/close/:taskId", validateToken, validateRole("MANAGER"), taskController.closeTask);

