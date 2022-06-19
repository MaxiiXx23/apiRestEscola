// Criando uma Api Rest usando classes
import dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';

import './src/database/connectionBd';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import photoRoutes from './src/routes/photoRoutes';

const allowlist = ['http://localhost:3000', 'https://www.google.com.br'];

const corsOptions = {
    origin: function (origin, callback){
        if(allowlist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback( new Error('disabled CORS for this request.'))
        }
    }
}

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(helmet({
            crossOriginResourcePolicy: {
                policy: "cross-origin"
            }
        }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads')));
    }

    routes() {
        this.app.use('/', homeRoutes);
        this.app.use('/users/', userRoutes);
        this.app.use('/token/', tokenRoutes);
        this.app.use('/alunos/', alunoRoutes);
        this.app.use('/photo/', photoRoutes);
    }
}

export default new App().app;