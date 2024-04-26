import * as express from "express";
import producaoRoutes from './producaoRoutes';

import { IDataBase } from '../../../interfaces/IDataBase';

export default function urls(dbconnection: IDataBase) {
    const router = express.Router();
    router.use("/api/v1/", producaoRoutes(dbconnection));
    return router;
}

