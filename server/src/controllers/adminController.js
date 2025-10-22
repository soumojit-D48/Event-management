import User from '../models/User.js';
// import transporter from '../config/nodemailer.js';
// import { ROLE_APPROVED_TEMPLATE, ROLE_REJECTED_TEMPLATE } from '../config/emailTemplates.js';

const getPendingRequests = async (req, res) => {
    try {
        const pendingUsers = await User.find({ 
            isApproved: false,
            requestedRole: { $ne: null }
        }).select('-password -resetOtp -resetOtpExpireAt');
        
        res.status(200).json({ 
            success: true, 
            users: pendingUsers 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const approveRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.requestedRole) {
            return res.status(400).json({ success: false, message: 'No role request found' });
        }

        const approvedRole = user.requestedRole; // organizer 
        user.role = approvedRole; // now role = organizer
        user.requestedRole = null; // clear req
        user.isApproved = true;
        await user.save();

        // Send approval email
        // try {
        //     const mailOptions = {
        //         from: {
        //             name: 'Your Platform Name',
        //             address: process.env.SENDER_EMAIL
        //         },
        //         to: user.email,
        //         subject: 'Role Request Approved!',
        //         html: ROLE_APPROVED_TEMPLATE
        //             .replace(/{{name}}/g, user.name)
        //             .replace(/{{role}}/g, approvedRole)
        //             .replace(/{{email}}/g, user.email)
        //     };

        //     await transporter.sendMail(mailOptions);
        // } catch (emailError) {
        //     console.log('Email sending failed:', emailError);
        // }

        res.status(200).json({ 
            success: true,
            message: `User role updated to ${approvedRole}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const rejectRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const rejectedRole = user.requestedRole;
        // user.role = approvedRole // in accept role but here it stays as a perticipent 
        user.requestedRole = null;
        user.isApproved = true;
        await user.save();

        // Send rejection email
        // try {
        //     const mailOptions = {
        //         from: {
        //             name: 'Your Platform Name',
        //             address: process.env.SENDER_EMAIL
        //         },
        //         to: user.email,
        //         subject: 'Role Request Update',
        //         html: ROLE_REJECTED_TEMPLATE
        //             .replace(/{{name}}/g, user.name)
        //             .replace(/{{requestedRole}}/g, rejectedRole)
        //             .replace(/{{email}}/g, user.email)
        //     };

        //     await transporter.sendMail(mailOptions);
        // } catch (emailError) {
        //     console.log('Email sending failed:', emailError);
        // }

        res.status(200).json({ 
            success: true,
            message: 'Role request rejected',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -resetOtp -resetOtpExpireAt');
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        
        if (!["admin", "organizer", "faculty", "volunteer", "participant"].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.role = role;
        user.requestedRole = null;
        user.isApproved = true;
        await user.save();

        res.status(200).json({ 
            success: true,
            message: 'User role updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await user.deleteOne();
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    getPendingRequests,
    approveRole,
    rejectRole,
    
    getAllUsers,
    updateUserRole,
    deleteUser
};