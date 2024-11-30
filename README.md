# README for Promotional Email Sending Web Project

## Overview
This project is a **Promotional Email Sending Web Application** designed to send targeted promotional emails to customers based on specific segmentation criteria. It utilizes **Express.js** for the server-side framework and **Redis** for implementing a publish-subscribe (pub-sub) messaging system, ensuring efficient handling of email notifications. This project was an assignment from Xeno and was built within 5 days. 

## Features
- **Segmented Email Campaigns**: Create customer segments based on specified criteria such as purchase history, and engagement levels.
- **Real-time Notifications**: Leverage Redis pub-sub for real-time email sending logs.
- **User-friendly Interface**: A web-based interface that allows users to easily manage email campaigns and customer segments.
- **Scalable Architecture**: Built to handle a large number of emails and customers efficiently.

## Technologies Used
- **Express.js**: A web application framework for Node.js, used to build the server-side application.
- **Redis**: An in-memory data structure store used for pub-sub messaging, allowing real-time communication between different parts of the application.
- **Next.js with typescript**
- **Nodemailer**: A module for Node.js to send emails easily.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Set up Redis:
   - Ensure Redis is installed and running on your machine. You can download it from [Redis.io](https://redis.io/download).

4. Configure environment variables:
   - Create a `.env` file in the root directory and add your email service credentials and Redis configuration.

5. To run the client and server in development:
   ```bash
   npm run dev: client
   npm run dev: server
   ```
   
![image](https://github.com/user-attachments/assets/dd3d51cf-003f-4c8b-b57b-0fd88b36b722)
![image](https://github.com/user-attachments/assets/95621d77-755f-40f5-b4ef-a64dd7a47aad)

