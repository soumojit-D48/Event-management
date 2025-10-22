/**
 * Role-based Access Control Middleware
 * 
 * Checks if authenticated user has required role to access a route
 * Must be used AFTER authMiddleware
 * 
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 * @returns {Function} Express middleware function
 * 
 * @example
 * router.get('/admin', authMiddleware, roleMiddleware(['admin']), controller);
 * router.get('/event', authMiddleware, roleMiddleware(['admin', 'organizer', 'faculty']), controller);
 */

 ///// Not needed for now
 // same work authorize('admin', 'organizer', 'faculty'),
export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated (req.user should be set by authMiddleware)
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }

      // Check if user's role is in the allowed roles array
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied. Insufficient permissions",
          requiredRoles: allowedRoles,
          yourRole: req.user.role
        });
      }

      // User has required role, proceed to next middleware/controller
      next();
      
    } catch (error) {
      console.error("Role middleware error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Authorization error", 
        error: error.message 
      });
    }
  };
};