import express from 'express';
import { router as userRouter } from './users.js';
import { router as taskRouter } from './tasks.js';
export const router = express.Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);

