    // when we pass 'admin' as arg means only admin can access that route


export const authorize = (...roles) => { 
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized: User not authenticated' 
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false,
                message: `Forbidden: Role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};

export const checkApproval = (req, res, next) => {
    if (!req.user.isApproved) {
        return res.status(403).json({ 
            success: false,
            message: 'Your account is pending approval' 
        });
    }
    next();
};


/*
❌ NOT Needed in:

Auth routes (public - register/login)
User routes (any authenticated user can access their own profile)

Why?
userAuth → Checks if user is logged in
authorize('admin') → Checks if logged-in user has 'admin' role
Without it: Any logged-in participant could approve their own role request or delete users! 🚨
With it: Only admins can manage users and approve role requests ✅
Flow:
Request → userAuth (verify token) → authorize('admin') (check role) → Controller

*/