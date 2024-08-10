# Shopping List App

This project is a full-stack shopping list application built with React, TypeScript, and Node.js. It allows users to create, manage, and organize their shopping lists efficiently.

![shopping_list](https://github.com/user-attachments/assets/3c5dae7a-89cc-4055-9744-f5d8e751b5de)

## Features

- Add, update, and delete items in your shopping list
- Organize items by categories
- Real-time quantity updates
- Responsive design for both desktop and mobile use

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit for state management
- Material-UI for component styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- TypeScript
- ORM library - Sequelize 
- Microsoft SQL Server Express 2022 for database


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- Microsoft SQL Server Express 2022
- SQL Server Configuration Manager

## Database Setup

1. Install Microsoft SQL Server Express 2022
2. Open SQL Server Configuration Manager
3. Enable TCP/IP:
   - Expand "SQL Server Network Configuration"
   - Click on "Protocols for SQLEXPRESS"
   - Right-click on TCP/IP and select "Enable"
4. Set the TCP dynamic port:
   - Right-click on TCP/IP and select "Properties"
   - Go to the "IP Addresses" tab
   - Scroll to IPALL and set "TCP Dynamic Ports" to 0
5. Enable SQL Server Browser:
   - Click on "SQL Server Services"
   - Right-click on "SQL Server Browser" and select "Properties"
   - Set "Start Mode" to "Automatic"
   - Click "Apply", then "OK"
   - Right-click on "SQL Server Browser" again and select "Start"

6. Restart the SQL Server service for changes to take effect

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/YitavGil/shopping_list.git
   cd shopping_list
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   DB_SERVER=localhost\\SQLEXPRESS
   DB_NAME=shopping_list
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_ENCRYPT=false
   DB_TRUST_SERVER_CERTIFICATE=true
   ```
   Replace `your_username` and `your_password` with your SQL Server credentials.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to use the application.

