import {db} from "./config.js";
import { DataTypes } from "sequelize";

export const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['ADMIN', 'MANAGER', 'WORKER'],
        allowNull: false
    },
    managerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
},
{
    indexes: [
        {
            unique: true,
            fields: ['email'],
        }
    ]
});

User.belongsTo(User, {as: "Manager", foreignKey: 'managerId'});
User.hasMany(User, {as: 'Workers', foreignKey: 'managerId', onDelete: "SET NULL"});