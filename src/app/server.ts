import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.ts'; 
import customerRoutes from './routes/customer.routes.ts';
import orderRoutes from './routes/order.routes.ts';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to Database
connectDB(); 

// Define routes
app.use(customerRoutes); 
app.use(orderRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
