import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
const app = express();

if (process.env.NODE_ENV != 'test') {
  await connectDB();
}

import indexRouter from './routes/index.js';
import urlsRouter from './routes/urls.js';

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
const server = app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

export { app, server };

