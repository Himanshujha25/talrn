Developer Directory App

This project is created as part of the Full Stack Internship Task for Talrn.com.

The application allows users to add developers, store data in MongoDB, and display the list of developers with search and filtering options.

Features
Frontend (React)

Add developer details:

Name

Role (Frontend / Backend / Full-Stack)

Tech Stack (comma separated)

Experience (in years)

Display all developers in a clean and responsive UI

Search / filter by:

Role

Tech stack

Toast messages for success and error

Functional components + Hooks

Styled using Tailwind CSS

Backend (Node.js + Express)

API Endpoints:

POST /developers → Save developer details

GET /developers → Return list of developers

MongoDB database using Mongoose

Clean and readable code

Setup Instructions
Backend Setup
cd backend
npm install


Create a .env file:

MONGO_URI=your_mongodb_atlas_url
PORT=4000


Start the backend:

npm run dev

Frontend Setup
cd frontend
npm install
npm run dev


Update backend API URL in frontend if deployed:

http://your-backend-url/developers

Technologies Used

React

Tailwind CSS

React Toastify

Node.js

Express.js

MongoDB (Mongoose)
