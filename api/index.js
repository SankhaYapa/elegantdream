import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config as configDotenv } from 'dotenv'; // Import config method from dotenv
import serviceRoutes from './routes/serviceRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import galleryRoutes from './routes/galleryRoutes.js';
import headerRoutes from './routes/headerRoutes.js';


const app = express();
const PORT = 8800;

// Load environment variables from .env file
configDotenv();

// Directory path for saving uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};


const corsOptions = {
  origin: ["https://elegantdreamphotography.com", "https://www.elegantdreamphotography.com","http://localhost:5173"],
  credentials: true, // Allow credentials (cookies)  
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/services', serviceRoutes);
app.use('/gallery', galleryRoutes);
app.use('/headers', headerRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).send(errorMessage);
});

// Start server
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}`);
});
