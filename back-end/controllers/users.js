import { User } from "../models/users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getAllManagers = async (req, res) => {
    try {
        const managers = await User.findAll({
            where: {
                role: 'MANAGER'
            }
        });
        return res.status(200).send({ managers: managers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllWorkers = async (req, res) => {
    try {
        const workers = await User.findAll({
            where: {
                role: 'WORKER'
            }
        });
        return res.status(200).send({ workers: workers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, password, email, role, managerId } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name: name,
            password: hashedPassword,
            email: email,
            role: role
        };

        if (managerId) {
            userData.managerId = managerId;
        }

        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, 'AnaAreMere', { expiresIn: '1h' });
            res.status(200).json({
              token,
              id: user.id,
              role: user.role,
              name: user.name
            });
        } else {
            res.status(404).json({ message: 'Wrong credentials' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllManagers,
    getAllWorkers,
    createUser,
    login,
}

