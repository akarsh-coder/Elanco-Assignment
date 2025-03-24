import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import countryRoutes from './routes/countryRoutes';
import { cacheMiddleware } from './middlewares/cacheMiddleware';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/countries',cacheMiddleware, countryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
