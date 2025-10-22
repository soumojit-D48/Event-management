import 'dotenv/config'
import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

import connectDB from "./config/dbConfig.js"
import cofigureCors from './config/corsConfig.js'


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

import certificateRoutes from "./routes/certificateRoutes.js";  

// dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000
connectDB()

app.use(cors(cofigureCors()))
app.use(express.json())
app.use(cookieParser())

// app.get('/', (req, res) => res.send('api working fine'))


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/budget", (await import('./routes/budgetRoutes.js')).default);

app.use("/api/attendance", (await import('./routes/attendanceRoutes.js')).default);

app.use("/api/feedback", (await import('./routes/feedbackRoutes.js')).default);

app.use("/api", certificateRoutes);



// Error handling middleware

// app.use((err, req, res, next) => {
//     console.error('Error:', err.stack)
//     res.status(500).json({ 
//         success: false, 
//         message: 'Something went wrong!',
//         ...(process.env.NODE_ENV === 'development' && { error: err.message })
//     })
// })

// // Handle undefined routes
// app.use('*', (req, res) => {
//     res.status(404).json({ 
//         success: false, 
//         message: `Route ${req.originalUrl} not found` 
//     })
// })

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
