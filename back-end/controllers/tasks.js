import { Task } from "../models/tasks.js";

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        if (tasks) {
            return res.status(200).json({ tasks: tasks });
        } else {
            return res.status(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTasksByWorkerId = async (req, res) => {
    try {
        const workerId = req.params.workerId;
        console.log(workerId);
        const tasks = await Task.findAll({
            where: {
                workerId: workerId
            }
        })
        if (tasks) {
            return res.status(200).json({ tasks: tasks });
        } else {
            return res.status(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.taskId;
        const task = await Task.findByPk(id);
        if (task) {
            return res.status(200).json({ task: task });
        } else {
            return res.status(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, managerId, workerId, status } = req.body;

        const newTaskData = {
            title,
            description,
            managerId,
        }

        if (workerId) {
            newTaskData.workerId = workerId;
            newTaskData.status = 'PENDING';
        } else {
            newTaskData.workerId = null;
            newTaskData.status = 'OPEN';
        }

        const newTask = await Task.create(newTaskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const setTaskToWorker = async (req, res) => {
    try {
        const workerId = req.body.workerId;
        console.log(workerId);
        const task = await Task.findByPk(req.params.taskId);
        console.log(req.params.taskId);
        task.workerId = workerId;
        task.status = "PENDING";
        await task.save();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const solveTask = async (req, res) => {
    try {
        const id = req.params.taskId;
        const task = await Task.findByPk(id);
        if (task.status === "PENDING") {
            task.status = "COMPLETED";
        } else {
            res.status(403).json({ error: "It has to be pending to be changed to completed" });
        }
        await task.save();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const closeTask = async (req, res) => {
    try {
        const id = req.params.taskId;
        const task = await Task.findByPk(id);
        if (task.status === "COMPLETED") {
            task.status = "CLOSED";
        } else {
            res.status(403).json({ error: "It has to be completed to be closed" });
        }
        await task.save();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllTasks,
    getTasksByWorkerId,
    getTaskById,
    closeTask,
    solveTask,
    setTaskToWorker,
    createTask,
}
