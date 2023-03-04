import express from 'express';

import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

export default app;
