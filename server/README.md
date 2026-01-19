# Event Management System - Server

This is the backend server for the Event Management System. It handles all the business logic, API endpoints, and database interactions.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing data.
- **Mongoose:** ODM for MongoDB.
- **JSON Web Tokens (JWT):** For user authentication.
- **Nodemailer:** For sending emails.
- **Cloudinary:** For image and file uploads.
- **Multer:** For handling multipart/form-data.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance (local or remote).

### Installation

1.  Clone the repository.
2.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

### Running the Server

To run the server in development mode (with hot-reloading):

```bash
npm run dev
```

To run the server in production mode:

```bash
npm start
```

The server will be running on `http://localhost:5000` (or the port you specified in your `.env` file).

## Folder Structure

```
server/
├── src/
│   ├── config/         # Configuration files (db, cloudinary, etc.)
│   ├── controllers/    # Route handlers and business logic
│   ├── middlewares/    # Custom Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
└── index.js            # Server entry point
```

## API Endpoints

The API routes are defined in the `src/routes/` directory. Each file corresponds to a different resource.

- `authRoutes.js`: User authentication (login, signup).
- `eventRoutes.js`: Event management.
- `registrationRoutes.js`: Event registrations.
- `userRoutes.js`: User management.
- `adminRoutes.js`: Admin-specific routes.
- `attendanceRoutes.js`: Attendance tracking.
- `budgetRoutes.js`: Budget management.
- `certificateRoutes.js`: Certificate generation.
- `feedbackRoutes.js`: Feedback collection.
