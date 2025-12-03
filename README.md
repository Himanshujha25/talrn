📘 Developer Directory – Full Stack App (Round-2 Submission)

A fully functional Full-Stack Developer Directory Application built as part of Talrn Round-2 Full-Stack Internship Selection Task.
This system includes secure authentication, CRUD operations, developer profiles, search, filters, sorting, pagination, and production-ready deployment.

🚀 Features Implemented (as per Round-2 Requirements)
✅ 1. Authentication (JWT + Protected Routes)

Signup with: Name, Email, Password

Secure login with JWT token

Password hashing using bcrypt

All developer-related routes protected using Auth Middleware

Only logged-in users can:

View developer list

Create developer

Edit developer

Delete developer

View developer profile page

✅ 2. Developer Profile Page

Each developer has a dedicated page showing:

Name

Role (Frontend / Backend / Full-Stack)

Tech stack (displayed as tags)

Experience

Description / About section

Joining date

Optional: Image upload support (extendable)

✅ 3. Enhanced Developer Directory

Search by name or tech stack

Filter by role (Frontend / Backend / Full-Stack)

Sort developers by experience (Low → High, High → Low)

Pagination with Next / Previous buttons

Fully responsive and optimized UI

✅ 4. CRUD Improvements

Backend:

POST /developers → Create developer

GET /developers → List developers (with search, filter, sort, pagination)

GET /developers/:id → Get single developer

PUT /developers/:id → Update developer

DELETE /developers/:id → Delete developer

Input validation with custom validation + Mongoose validations

Authentication middleware protects all dev routes

Frontend:

Create Developer page

Edit Developer page

Delete with confirmation prompt

Developer profile page

✅ 5. UI/UX Enhancements

Toast notifications (success / error) using React Toastify

Global loading indicators

Fully responsive UI

Clean modern design using Tailwind CSS v4

Light / Dark mode toggle

Clean filters section with debounce search

Error fallback messages

✅ 6. Deployment

Frontend Hosted on: Vercel

Backend Hosted on: Render (or Railway/Cyclic)

CORS configured properly

Environment variables secured

API fully connected and working from deployed frontend

🛠 Tech Stack
Frontend

React (Functional Components + Hooks)

React Router DOM

Axios

Tailwind CSS v4

React Toastify

Heroicons

Vite

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt password hashing

CORS enabled

Tools

Postman for API testing

GitHub for version control

Vercel (Frontend Deployment)

Render (Backend Deployment)

📂 Folder Structure
Frontend
/src
  /components
  /pages
  /context
  App.jsx
  main.jsx
  index.css

Backend
/controllers
/middleware
/models
/routes
server.js
.env

⚙️ Setup Instructions
1. Clone the Repo
git clone <your-frontend-repo>
git clone <your-backend-repo>

🔧 Backend Setup
cd backend
npm install


Create .env:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000


Run backend:

npm start

🎨 Frontend Setup
cd frontend
npm install
npm run dev

🌐 Environment Variables (Frontend)

Create .env:

VITE_API_URL=https://your-backend.onrender.com

🏗 Architecture Overview
Frontend Architecture

Centralized auth state using Context API

Token stored in localStorage

ProtectedRoute + PublicRoute for route guarding

Modular pages:

Login

Signup

Dashboard

AddDeveloper

EditDeveloper

DeveloperProfile

Backend Architecture

MVC Structure:

Models → DB schema

Controllers → Logic

Routes → API endpoints

Middleware-based authentication

Clean reusable code

Pagination + search + filtering logic inside controllers