# Event Management System

A comprehensive full-stack web application for managing events, built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and Bcrypt.
- **Event Management**: Create, update, and manage events.
- **Registration System**: Users can register for events.
- **QR Code Integration**: Generate and scan QR codes for ticketing/check-in (`qrcode`, `html5-qrcode`).
- **PDF Generation**: Generate event tickets or reports (`pdfkit`, `pdf-lib`).
- **File Uploads**: Image handling using Multer and Cloudinary.
- **Interactive Dashboard**: Data visualization with Chart.js.
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI primitives.
- **Email Notifications**: Integrated via Nodemailer.

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: React (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, generic CSS
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form, Zod
- **Animations**: Framer Motion
- **Routing**: React Router DOM

### Server (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, setup for cookies
- **Utilities**: Cloudinary, Nodemailer, PDFKit, QRcode

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Event-management
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Configuration

You need to set up environment variables for both the client and server.

### Server (`server/.env`)
Create a `.env` file in the `server` directory with the following variables (adjust keys based on your actual code):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### Client (`client/.env`)
Create a `.env` file in the `client` directory if needed (e.g., for API base URL):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Usage

### Start the Backend Server
From the `server` directory:
```bash
npm run dev
```
The server will start (defaulting to port specified in `.env`, usually 5000).

### Start the Frontend Application
From the `client` directory:
```bash
npm run dev
```
The application will launch in your default browser (usually at `http://localhost:5173`).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the [ISC License](LICENSE).
