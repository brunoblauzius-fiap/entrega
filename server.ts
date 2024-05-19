import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import urls from './application/api/routes/urls';
import Logger from "./application/api/middler/logger";
import { IDataBase } from './interfaces/IDataBase';

export default class Server{
    public app: express.Application;

    constructor (readonly dbconnection: IDataBase) {
        this.app = express();
        this.middler();
        this.routes();
    }

    enableCors(){
        const options: cors.CorsOptions = {
            methods : "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }
        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes() {
        this.app.use(Logger.log);

        this.app.route('/').get((req, res) => {
            res.json({
                'version' : '1.2.0',
                'app' : 'APP Entrega',
                'date' : '2024-05-18' 
            });
        });
        this.app.use("/", urls(this.dbconnection));
    }
}
