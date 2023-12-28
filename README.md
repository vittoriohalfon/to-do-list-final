## Task Management Application

## Overview
This Task Management Application is a full-stack solution for organizing and tracking tasks. It features user authentication, task categorization, and a dynamic to-do list interface. Built with React.js on the frontend and Node.js/Express.js on the backend, this project showcases a comprehensive understanding of full-stack development concepts.

## Features
- **User Authentication**: Secure login and registration system to manage user sessions.
- **Task Management**: Add, update, and delete tasks with features to mark them as complete.
- **Task Categorization**: Organize tasks into categories for better manageability.
- **Dynamic Interface**: Real-time updates as tasks are added, completed, or removed.

## Technologies Used
- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: bcrypt for hashing, JSON Web Tokens for session management

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. **Clone the repository:**
   bash
   git clone https://github.com/vittoriohalfon/to-do-list-final.git
   cd to-do-list-final

## Install backend dependencies:

cd server
npm install

## Set up the database:

Create a new PostgreSQL database.
Run the SQL commands from the provided initializeDB.sql to set up tables.

## Configure environment variables:

Create a .env file in the server directory.
Add the following variables:

DB_CONNECTION=your_database_connection_string
JWT_SECRET=your_jwt_secret

## Start the backend server:

npm start

## Install frontend dependencies:

cd ../client
npm install

## Start the React application:

npm start

## Usage

After installation, open http://localhost:3000 to view the application in your browser. Register as a new user or log in to begin managing tasks.





