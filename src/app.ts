import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import index from './routes/index';

const app = express();

app.use(express.json());
app.use(index);
app.use(errorHandler);

export default app;