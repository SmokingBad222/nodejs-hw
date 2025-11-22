import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { logger } from './middleware/logger.js';
import "dotenv/config";
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js.';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(cors());
app.use(express.json({
  type: ['application/json', 'application/vnb.api+json'],
  limit: '100kb',
}));
app.use(helmet());
app.use(cookieParser());

app.use(authRoutes);
app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
