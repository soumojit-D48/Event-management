import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userAuth = async (req, res, next) => {
    try {
        // const { token } = req.cookies;
        // console.log("🔍 Cookies:", req.cookies);
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            const user = await User.findById(tokenDecode.id);
            
            if (!user) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
            }

            req.user = user;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' });
    }
};

export default userAuth;