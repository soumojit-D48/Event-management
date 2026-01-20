# Event Management System

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9-764ABC?style=flat-square&logo=redux)

A comprehensive full-stack web application for managing college events, built with the MERN stack (MongoDB, Express, React, Node.js).

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Secure signup and login using JWT and Bcrypt |
| **Event Management** | Create, update, and manage events with rich details |
| **Registration System** | Users can register for events with automatic confirmations |
| **QR Code Integration** | Generate and scan QR codes for ticketing/check-in |
| **PDF Generation** | Generate event tickets, certificates, and reports |
| **File Uploads** | Image handling using Multer and Cloudinary |
| **Interactive Dashboard** | Data visualization with Chart.js |
| **Role-Based Access** | Secure permissions for organizers, participants, and admins |
| **Email Notifications** | Integrated via Nodemailer for confirmations and updates |
| **Attendance Tracking** | Real-time check-in with QR code scanning |

## 🛠️ Tech Stack

### Client (Frontend)

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Redux Toolkit | State management |
| Tailwind CSS 4 | Styling |
| Radix UI | Accessible components |
| Framer Motion | Animations |
| React Router DOM | Routing |
| React Hook Form + Zod | Form handling |
| Chart.js | Data visualization |
| Lucide React | Icons |

### Server (Backend)

| Technology | Purpose |
|------------|---------|
| Node.js 22 | Runtime environment |
| Express.js 5 | Web framework |
| MongoDB 8 | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cloudinary | File storage |
| Nodemailer | Email service |
| PDFKit / pdf-lib | PDF generation |
| QRCode | QR code generation |

## 📁 Project Structure

```
Event-management/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── assets/           # Static assets (images, icons)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── dashboard/    # Dashboard widgets
│   │   │   ├── layout/       # Layout components
│   │   │   └── ui/           # Base UI components
│   │   ├── pages/            # Page components
│   │   ├── state/            # Redux store & slices
│   │   ├── lib/              # Utilities & schemas
│   │   ├── constants/        # App constants
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   └── package.json
│
├── server/                    # Backend Express application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Custom middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── index.js         # Entry point
│   └── package.json
│
└── README.md                 # This file
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Event-management
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   # Create .env file (see Configuration below)
   npm run dev
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## ⚙️ Configuration

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/eventmanagement
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventmanagement

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Cloudinary (File uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=EventHub
```

## 📚 Documentation

- [Frontend Guide](client/README.md)
- [Backend Guide](server/README.md)
- [API Documentation](server/README.md#-api-endpoints)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<div align="center">
Built with ❤️ for college event organizers
</div>
