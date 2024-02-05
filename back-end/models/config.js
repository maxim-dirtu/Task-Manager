import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "storage.db",
    logging: console.log,
});

export const synchronizeDatabase = async () => {
    await db.authenticate();
    await db.sync();
}