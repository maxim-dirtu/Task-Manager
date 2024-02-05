import {db} from "./config.js";
import { User } from "./users.js";
import { DataTypes } from "sequelize";

export const Task = db.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    workerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM,
        values: ['OPEN','PENDING','COMPLETED','CLOSED'],
        allowNull: false,
    },
});