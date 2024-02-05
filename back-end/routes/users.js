import express from 'express';
import * as userController from "../controllers/users.js";
import { validateRole, validateToken } from '../middleware/auth.js';

export const router = express.Router();

//Login route
router.post("/login", userController.login);

//Create user route
router.post("/create", validateToken, validateRole("ADMIN"), userController.createUser);

//Get users
router.get("/managers", validateToken, validateRole("ADMIN"), userController.getAllManagers);
router.get("/workers", validateToken, validateRole("MANAGER"), userController.getAllWorkers);