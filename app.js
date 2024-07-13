import './src/env/load-env.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import path from 'path';
import { db } from './src/configs/database/index.js';
import {
    errorConverterMiddleware,
    errorHandlerMiddleware,
} from './src/middlewares/error.middleware.js';
import { routes } from './src/routes/index.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);

app.use(bodyParser.json({ limit: '50mb' }));

app.use(
    bodyParser.urlencoded({
        parameterLimit: 100,
        extended: true,
        limit: '30mb',
    }),
);

app.use(cors());
app.options('*', cors());

app.disable('etag');

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use((_, res, __) => {
    res.status(404).json({
        code: 404,
        message: 'Cannot find the requested resource',
    });
});

app.use(errorConverterMiddleware);

app.use(errorHandlerMiddleware);

let server;

db().then(() => {
    console.log('Connected to MongoDB!');

    server = app.listen(3001, () => {
        console.log('Server listening on port 3001');
    });
});

const killProcessAndServer = (error) => {
    console.error(error);

    if (server) {
        server.close(() => {
            console.log('Server closed!');
        });
    }

    process.exit(1);
};

process.on('uncaughtException', killProcessAndServer);
process.on('unhandledRejection', killProcessAndServer);

process.on('SIGTERM', () => {
    if (server) {
        server.close();
    }
});