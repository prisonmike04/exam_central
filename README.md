Exam Central

A centralized web application designed to streamline and automate examination-related activities in educational institutions, particularly for Mumbai University. Exam Central offers robust features for seating arrangements, supervisor assignments, semester marks calculations, and result management, ensuring enhanced accuracy, efficiency, and transparency.

Table of Contents

Features

Technologies Used

Installation

Usage

Environment Variables

API Endpoints

Project Structure

Contributing

License

Features

1. Seating Arrangement Module

Automatically generates seating arrangements based on branch, semester, subject, and special accommodations.

Allows dynamic adjustments for changes (e.g., room reallocation, absentee students).

Provides a visual layout for supervisors to monitor and manage seating in real time.

2. Supervisor Assignment Module

Automatically assigns supervisors to exam rooms based on availability, workload, and predefined criteria.

Includes a notification system to inform supervisors of their assignments via email.

3. Semester Marks Calculation Module

Automates semester marks calculations by integrating internal assessments, attendance percentages, and practical scores.

Allows faculty to input and verify marks securely.

Provides a dashboard for analyzing class performance and tracking individual student progress.

4. Results Management

Generates and publishes results securely with role-based access control.

Allows students to view detailed scorecards and faculty to download analytical reports.

5. Administrative Dashboard

A centralized dashboard for administrators to monitor and manage all examination activities.

Generates reports, analyzes trends, and tracks compliance with institutional policies.

Technologies Used

Frontend: React.js, Next.js, TailwindCSS

Backend: Node.js, Express.js

Database: MySQL (Sequelize ORM)

Email Notifications: Nodemailer (SMTP integration with Gmail)

Deployment: Vercel (Frontend), Render (Backend)

Version Control: Git, GitHub

Installation

Prerequisites

Ensure you have the following installed:

Node.js (v18 or higher)

MySQL (or any compatible SQL server)

npm or yarn

1. Clone the Repository

git clone https://github.com/your-username/exam-central.git
cd exam-central

2. Install Dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install

3. Set Up the Database

Create a database named exam_central.

Import the provided SQL schema (exam_central.sql).

4. Configure Environment Variables

Create a .env file in both the frontend and backend directories:

Backend .env

DB_NAME=exam_central
DB_USER=root
DB_PASSWORD=your_database_password
DB_HOST=localhost

EMAIL_USER=your_gmail_email
EMAIL_PASS=your_gmail_app_password
PORT=5000

Frontend .env.local

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

5. Start the Application

Frontend

cd frontend
npm run dev

Backend

cd backend
npm run dev

Usage

Access the frontend at http://localhost:3000.

The backend API is available at http://localhost:5000/api.

Environment Variables

Ensure these environment variables are properly configured for both frontend and backend:

Variable Name

Description

Example Value

DB_NAME

Database name

exam_central

DB_USER

Database username

root

DB_PASSWORD

Database password

your_db_password

DB_HOST

Database host

localhost

EMAIL_USER

Gmail email for notifications

your_email@gmail.com

EMAIL_PASS

Gmail app password

your_app_password

PORT

Backend server port

5000

NEXT_PUBLIC_API_BASE_URL

API base URL

http://localhost:5000/api

API Endpoints

Supervisor Endpoints

Method

Endpoint

Description

POST

/api/supervisors/add

Add a new supervisor

GET

/api/supervisors

Fetch all supervisors

POST

/api/supervisors/assign

Assign a supervisor to an exam room

GET

/api/supervisors/assignments

Get all exam room assignments

Additional Endpoints

Method

Endpoint

Description

GET

/api/health

Check backend health status

Project Structure

exam-central/
│
├── frontend/                # React.js frontend
│   ├── components/          # Reusable components
│   ├── pages/               # Next.js pages
│   └── public/              # Static assets
│
├── backend/                 # Express.js backend
│   ├── controllers/         # Controller logic
│   ├── routes/              # API route definitions
│   └── utils/               # Utility modules (e.g., database, email)
│
└── README.md                # Project documentation

Contributing

We welcome contributions! To get started:

Fork the repository.

Create a new branch: git checkout -b feature-branch-name.

Commit your changes: git commit -m "Add new feature".

Push to the branch: git push origin feature-branch-name.

Submit a pull request.
