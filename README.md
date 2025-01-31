# Exam Central

A centralized web application designed to streamline and automate examination-related activities in educational institutions, particularly for Mumbai University. Exam Central offers robust features for seating arrangements, supervisor assignments, semester marks calculations, and result management, ensuring enhanced accuracy, efficiency, and transparency.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)


## Features

### 1. Seating Arrangement Module
- Automatically generate seating arrangements based on branch, semester, subject, and special accommodations.
- Dynamic adjustments for last-minute changes (room changes, absentee students).
- Visual layout for supervisors to monitor and manage seating.

### 2. Supervisor Assignment Module
- Automatic assignment of supervisors based on availability and workload.
- Notification system to inform supervisors of their assignments.

### 3. Semester Marks Calculation Module
- Automates semester mark calculations by integrating internal assessment scores, attendance percentages, and practical exam scores.
- Faculty input and verification with confidentiality and data security.
- Dashboard for class performance and individual student progress analysis.

### 4. Results Management
- Generate and publish results securely with access control.
- Detailed scorecards for students and analytical reports for faculty.

### 5. Administrative Dashboard
- Central dashboard to manage and monitor examination activities.
- Generate reports, analyze trends, and track policy compliance.

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Authentication:** JWT
- **Email Notifications:** Nodemailer

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/exam-central.git
   ```

2. Navigate to the project directory:
   ```bash
   cd exam-central
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the `.env` file with the required environment variables (see [Environment Variables](#environment-variables)).

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Access the application at `http://localhost:3000` for the frontend.
- The backend server runs on `http://localhost:5000`.

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
DB_NAME=exam_central
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=yourapppassword
PORT=5000
```

## API Endpoints

### Supervisor Routes

- **POST** `/api/supervisors/add` - Add a new supervisor.
- **GET** `/api/supervisors` - Retrieve all supervisors.
- **POST** `/api/supervisors/assign` - Assign a supervisor to an exam room.
- **GET** `/api/supervisors/assignments` - Retrieve all room assignments.

## Project Structure

```text
exam-central/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── utils/
 │   ├── app.js
 │   └── server.js
 ├── frontend/
 │   ├── components/
 │   ├── pages/
 │   └── styles/
 └── .env
```
