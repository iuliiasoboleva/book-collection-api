import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the "pages" directory
app.use(express.static(path.join(__dirname, 'pages')));

import bookRoutes from './routes/books.js';
import userRoutes from './routes/users.js';

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
