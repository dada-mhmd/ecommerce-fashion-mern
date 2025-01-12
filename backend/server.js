import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import cloudinaryConfig from './config/cloudinary.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

const PORT = process.env.PORT || 4000;

cloudinaryConfig();

// middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: [
      'https://ecommerce-fashion-frontend.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  })
);

// api routes

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
