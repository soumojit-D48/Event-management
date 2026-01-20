# Event Management System - Server

This is the backend server for the Event Management System. It handles authentication, event management, registrations, attendance tracking, and more using Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/eventmanagement
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will be running on `http://localhost:5000`

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # MongoDB connection
│   │   ├── cloudinary.js
│   │   └── ...
│   │
│   ├── controllers/     # Route handlers & business logic
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── userController.js
│   │   ├── registrationController.js
│   │   ├── attendanceController.js
│   │   ├── budgetController.js
│   │   ├── certificateController.js
│   │   ├── feedbackController.js
│   │   └── adminController.js
│   │
│   ├── middlewares/     # Custom Express middleware
│   │   ├── auth.js      # JWT authentication
│   │   ├── upload.js    # File upload handling
│   │   ├── validate.js  # Request validation
│   │   └── ...
│   │
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Registration.js
│   │   ├── Attendance.js
│   │   ├── Budget.js
│   │   ├── Feedback.js
│   │   └── Certificate.js
│   │
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── userRoutes.js
│   │   ├── registrationRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── utils/           # Helper functions
│   │   ├── sendEmail.js
│   │   ├── generateQR.js
│   │   ├── generatePDF.js
│   │   └── ...
│   │
│   └── index.js         # Server entry point
│
├── uploads/             # Temporary file uploads
├── .env                 # Environment variables
└── package.json
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | Yes |
| GET | `/auth/me` | Get current user | Yes |
| PUT | `/auth/updateprofile` | Update profile | Yes |
| PUT | `/auth/updatepassword` | Update password | Yes |
| POST | `/auth/forgotpassword` | Send reset email | No |
| PUT | `/auth/resetpassword/:token` | Reset password | No |

### Events (`/events`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | Get all events | No |
| GET | `/events/:id` | Get single event | No |
| POST | `/events` | Create event | Yes |
| PUT | `/events/:id` | Update event | Yes |
| DELETE | `/events/:id` | Delete event | Yes |
| GET | `/events/user/my-events` | Get user's events | Yes |
| GET | `/events/user/managed` | Get managed events | Yes |
| POST | `/events/:id/apply` | Apply to manage event | Yes |

### Users (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users (admin) | Yes (Admin) |
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user | Yes (Admin) |
| DELETE | `/users/:id` | Delete user | Yes (Admin) |
| GET | `/users/profile` | Get own profile | Yes |

### Registrations (`/registrations`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/registrations` | Register for event | Yes |
| GET | `/registrations` | Get all registrations | Yes |
| GET | `/registrations/my` | Get my registrations | Yes |
| GET | `/registrations/:id` | Get registration by ID | Yes |
| DELETE | `/registrations/:id` | Cancel registration | Yes |
| GET | `/registrations/event/:eventId` | Get event registrations | Yes |

### Attendance (`/attendance`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/attendance/mark` | Mark attendance (QR) | Yes |
| GET | `/attendance/event/:eventId` | Get event attendance | Yes |
| GET | `/attendance/my` | Get my attendance | Yes |
| GET | `/attendance/scan/:qrData` | Verify QR code | Yes |
| POST | `/attendance/manual` | Manual attendance entry | Yes |

### Budgets (`/budgets`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/budgets` | Create budget | Yes |
| GET | `/budgets` | Get all budgets | Yes |
| GET | `/budgets/:id` | Get budget by ID | Yes |
| PUT | `/budgets/:id` | Update budget | Yes |
| DELETE | `/budgets/:id` | Delete budget | Yes |
| GET | `/budgets/event/:eventId` | Get event budget | Yes |

### Certificates (`/certificates`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/certificates/template` | Upload certificate template | Yes |
| POST | `/certificates/generate` | Generate participant certificates | Yes |
| GET | `/certificates/:id` | Get certificate | Yes |
| GET | `/certificates/download/:id` | Download certificate PDF | Yes |
| GET | `/certificates/verify/:id` | Verify certificate | No |

### Feedback (`/feedback`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/feedback` | Submit feedback | Yes |
| GET | `/feedback` | Get all feedback (admin) | Yes (Admin) |
| GET | `/feedback/event/:eventId` | Get event feedback | Yes |
| GET | `/feedback/my` | Get my feedback | Yes |
| PUT | `/feedback/:id` | Update feedback | Yes |
| DELETE | `/feedback/:id` | Delete feedback | Yes |

### Admin (`/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/dashboard` | Admin dashboard stats | Yes (Admin) |
| GET | `/admin/users` | Manage users | Yes (Admin) |
| PUT | `/admin/users/:id/role` | Update user role | Yes (Admin) |
| GET | `/admin/approvals` | Pending approvals | Yes (Admin) |
| POST | `/admin/approvals/:id` | Approve request | Yes (Admin) |

## 📊 Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String ('user', 'organizer', 'admin'),
  department: String,
  studentId: String,
  createdAt: Date
}
```

### Event
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  endDate: Date,
  location: String,
  capacity: Number,
  registrationDeadline: Date,
  organizer: ObjectId (User),
  status: String ('draft', 'published', 'cancelled', 'completed'),
  category: String,
  image: String,
  requirements: [String],
  createdAt: Date
}
```

### Registration
```javascript
{
  _id: ObjectId,
  event: ObjectId (Event),
  user: ObjectId (User),
  status: String ('pending', 'confirmed', 'cancelled', 'attended'),
  registeredAt: Date,
  qrCode: String,
  checkInTime: Date
}
```

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### User Roles

| Role | Permissions |
|------|-------------|
| `user` | Register for events, view events, submit feedback |
| `organizer` | Create/manage events, view registrations, mark attendance |
| `admin` | Full access, user management, system settings |

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js 22 | Runtime environment |
| Express.js 5 | Web framework |
| MongoDB 8 | Database |
| Mongoose 8 | ODM |
| JSON Web Token | Authentication |
| Bcrypt.js | Password hashing |
| Cloudinary | File/image storage |
| Multer | File uploads |
| Nodemailer | Email service |
| PDFKit / pdf-lib | PDF generation |
| QRCode | QR code generation |
| Cookie Parser | Cookie handling |
| Helmet | Security headers |
| Morgan | HTTP request logging |

## 📧 Email Configuration

The server uses Nodemailer for sending emails. Configure these in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

## 🚢 Deployment

1. Set production environment variables
2. Build the client: `cd ../client && npm run build`
3. Configure your web server (nginx/Apache) to serve the client and proxy API requests
4. Use PM2 or similar process manager:
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name event-server
   ```
