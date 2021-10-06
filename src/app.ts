import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as http from 'http';
import { config } from 'dotenv';

config(); // load data from .env

import { Container } from 'typedi';
import { DatabaseLoader } from './loaders/database.loader';
import { appPort } from './configs/app.conf';
import * as path from "path";

/**
 * Initialization
 */
const app: Application = express();
const server = http.createServer(app);
const database = Container.get(DatabaseLoader);
const routes = require('./routes/index');

/**
 * Application Usages
 */
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../images'))); // Route for public images
// app.use(express.json());
app.use('/', routes);

/**
 * CONNECT DB and START SERVER
 */

database.connect().then(() => {
    server.listen(appPort, () => {
        console.log('Info: Server listening on: http://localhost:' + appPort);
    });
}).catch((error) => {
    console.log('Error: Could not connect to DB - ' + error.toString());
    process.exit(2);
});

