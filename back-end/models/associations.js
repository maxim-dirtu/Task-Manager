import { Task } from './tasks.js';
import { User } from './users.js';
import bcrypt from 'bcrypt';


export function createAssociations() {
    User.hasMany(Task, {as: "CreatedTasks", foreignKey: 'managerId' , onDelete: "SET NULL"});
    User.hasMany(Task, {as: "AssignedTasks", foreignKey: 'workerId', onDelete: "SET NULL"});
    Task.belongsTo(User, {as: 'Manager', foreignKey: 'managerId', onDelete: "SET NULL"});
    Task.belongsTo(User, {as: 'Worker', foreignKey: "workerId", onDelete: "SET NULL"});
}

export async function createAdminUser() {
    try {
        const hashedPassword = await bcrypt.hash('admin', 10); 

        const existingAdmin = await User.findOne({ where: { name: 'admin' } });
        if (existingAdmin) {
            return;
        }

        const adminUser = await User.create({
            name: 'admin',
            password: hashedPassword,
            email: 'admin@gmail.com',
            role: 'ADMIN', 
        });

    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}