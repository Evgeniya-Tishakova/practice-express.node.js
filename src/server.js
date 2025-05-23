// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import studentsRouter from './routers/students.js';
import { errorHadler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api + json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/api/students', studentsRouter);

  app.use(notFoundHandler);

  app.use(errorHadler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
