import User from '../models/User.js';
// import transporter from '../config/nodemailer.js';

import User from '../models/User.js';
// Role request email template
const ROLE_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .role-badge { background: #667eea; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Role Request Received!</h1>
        </div>
        <div class="content">
            <h2>Hello {{name}},</h2>
            <p>Thank you for your interest in taking on a more active role!</p>
            <p>You have requested the following role:</p>
            <div class="role-badge">{{requestedRole}}</div>
            <p>Your request is currently under review. We'll notify you once processed.</p>
            <p>Email: <strong>{{email}}</strong></p>
            <p>Best regards,<br>The Admin Team</p>
        </div>
    </div>
</body>
</html>
`;

const getProfile = async (req, res) => {
    try {
        const user = req.user;

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

        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, phone, department } = req.body;

        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (department) user.department = department;

        await user.save();

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            department: user.department
        };

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const requestRole = async (req, res) => {
    try {
        const { requestedRole } = req.body;

        if (!["organizer", "faculty", "volunteer"].includes(requestedRole)) {
            return res.status(400).json({ success: false, message: 'Invalid role request' });
        }

        const user = await User.findById(req.user._id);

        if (user.role !== "participant") {
            return res.status(400).json({
                success: false,
                message: 'You already have a special role'
            });
        }

        if (user.requestedRole && !user.isApproved) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending role request'
            });
        }

        user.requestedRole = requestedRole;
        user.isApproved = false;
        await user.save();

        // Send email notification
        try {
            const mailOptions = {
                from: {
                    name: 'Your Platform Name',
                    address: process.env.SENDER_EMAIL
                },
                to: user.email,
                subject: 'Role Request Submitted',
                html: ROLE_REQUEST_TEMPLATE
                    .replace(/{{name}}/g, user.name)
                    .replace(/{{requestedRole}}/g, requestedRole)
                    .replace(/{{email}}/g, user.email)
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.log('Email sending failed:', emailError);
        }

        res.status(200).json({
            success: true,
            message: 'Role request submitted successfully. Awaiting admin approval.',
            requestedRole: user.requestedRole,
            isApproved: user.isApproved,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    getProfile,
    updateProfile,
    requestRole
};
