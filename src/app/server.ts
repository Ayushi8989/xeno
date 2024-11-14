import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/dbConfig.ts'; 
import customerRoutes from './routes/customer.routes.ts';
import orderRoutes from './routes/order.routes.ts';
import subscribeToCustomerEvents from './api/subscribers/customerSubscriber.ts';
import subscribeToOrderEvents from './api/subscribers/orderSubscriber.ts';
import segmentRoutes from './routes/segment.routes.ts';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to Database
connectDB(); 

subscribeToCustomerEvents();
subscribeToOrderEvents();

// Define routes
app.use(customerRoutes); 
app.use(orderRoutes)
app.use(segmentRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
