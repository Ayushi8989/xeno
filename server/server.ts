import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './src/config/dbConfig.ts'; 
import customerRoutes from './src/routes/customer.routes.ts';
import orderRoutes from './src/routes/order.routes.ts';
import subscribeToCustomerEvents from './src/api/subscribers/customerSubscriber.ts';
import subscribeToOrderEvents from './src/api/subscribers/orderSubscriber.ts';
import segmentRoutes from './src/routes/segment.routes.ts';
import campaignRoutes from './src/routes/campaign.routes.ts';
import subscribeToSegmentEvents from './src/api/subscribers/segmentSubscriber.ts';
import { subscribeToMessageEvents } from './src/api/subscribers/messageSubscriber.ts';

dotenv.config();

const app = express();

app.use(cors());

// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to Database
connectDB(); 

subscribeToCustomerEvents();
subscribeToOrderEvents();
subscribeToSegmentEvents();
subscribeToMessageEvents();

// Define routes
app.use(customerRoutes); 
app.use(orderRoutes);
app.use(segmentRoutes);
app.use(campaignRoutes);


app.get("/", (req, res) =>{res.send("xeno express server")});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app }