import express from 'express';
import cors from "cors";
import { synchronizeDatabase } from './models/config.js';
import { createAdminUser, createAssociations } from './models/associations.js';
import {router as indexRouter} from './routes/index.js';

const PORT  = 8080;

const app = express();
app.use(express.json());
app.use(cors());

createAssociations();
app.use("/", indexRouter);

const server = app.listen(PORT, async () => {
    try{
        await synchronizeDatabase();
        await createAdminUser();
        console.log(`Server started on port ${PORT}`);
    } catch (err) {
        console.log("Database error", err);
        server.close();
    }
})