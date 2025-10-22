import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// import transporter from '../config/nodemailer.js';
// import { WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplate.js';

// const register = async (req, res) => {
//     const { name, email, password, requestedRole, phone, department } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ success: false, message: 'All fields are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(409).json({ success: false, message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const isApproved = requestedRole ? false : true; //  false if role requested
//         const role = "participant";

//         const user = new User({ 
//             name, 
//             email, 
//             password: hashedPassword,
//             role,
//             requestedRole: requestedRole || null,
//             isApproved,
//             isAccountVerified: true,
//             phone,
//             department
//         });

//         await user.save();

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' }
//         );

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

//         // Send welcome email
//         // try {
//         //     const mailOptions = {
//         //         from: {
//         //             name: 'Campus Sync',
//         //             address: process.env.SENDER_EMAIL
//         //         },
//         //         to: user.email,
//         //         subject: 'Welcome to Our Platform!',
//         //         html: WELCOME_EMAIL_TEMPLATE
//         //             .replace(/{{name}}/g, user.name)
//         //             .replace(/{{email}}/g, user.email)
//         //     };

//         //     await transporter.sendMail(mailOptions);
//         // } catch (emailError) {
//         //     console.log('Email sending failed:', emailError);
//         // }

//         const userData = {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             requestedRole: user.requestedRole,
//             isApproved: user.isApproved
//         };

//         res.status(201).json({
//             success: true,
//             message: requestedRole 
//                 ? "Registration successful. Your role request is pending approval." 
//                 : "Registration successful",
//             user: userData
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };



const register = async (req, res) => {
    const { name, email, password, requestedRole, phone, department } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate requestedRole if provided
        const validRoles = ["organizer", "faculty", "volunteer"];
        let finalRequestedRole = null;
        let isApproved = true;

        if (requestedRole && requestedRole !== "participant") {
            if (validRoles.includes(requestedRole)) {
                finalRequestedRole = requestedRole;
                isApproved = false; // Needs admin approval
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role requested. Choose from: participant, organizer, faculty, or volunteer'
                });
            }
        }

        // Everyone starts as participant
        const role = "participant";

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            requestedRole: finalRequestedRole,
            isApproved,
            isAccountVerified: true,
            phone,
            department
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            requestedRole: user.requestedRole,
            isApproved: user.isApproved
        };

        res.status(201).json({
            success: true,
            message: finalRequestedRole
                ? `Registration successful. Your ${finalRequestedRole} role request is pending admin approval.`
                : "Registration successful",
            user: userData
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match result:", matchPassword);

        if (!matchPassword) {
            console.log("❌ Password mismatch. Given:", password, "Stored hash:", user.password);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            requestedRole: user.requestedRole,
            isApproved: user.isApproved,
            isAccountVerified: user.isAccountVerified,
            phone: user.phone,
            department: user.department
        };

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            requestedRole: user.requestedRole,
            isApproved: user.isApproved,
            isAccountVerified: user.isAccountVerified,
            phone: user.phone,
            department: user.department
        };

        return res.status(200).json({
            success: true,
            user: userData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: {
                name: 'Your Platform Name',
                address: process.env.SENDER_EMAIL
            },
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_TEMPLATE
                .replace("{{otp}}", otp)
                .replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully to:', user.email);

        return res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP and new password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {
    register,
    login,
    logout,
    isAuthenticated,
    sendResetOtp,
    resetPassword
};

// ✅ User registers with "organizer" → Saved as participant
// ✅ requestedRole = "organizer" (stored for admin review)
// ✅ isApproved = false (blocks special features)
// ✅ Admin can see in pending requests
// ✅ Approve → role changes to "organizer"
// ✅ Reject → stays as "participant"