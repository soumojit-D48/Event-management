// import express from "express";
// import {
//   registerForEvent,
//   getMyRegistrations,
//   getRegistrationById,
//   cancelRegistration,
//   getEventRegistrations,
// //   resendQRCode
// } from "../controllers/registrationController.js";
// import  userAuth  from "../middlewares/userAuth.js";
// import { roleMiddleware } from "../middlewares/roleMiddleware.js";
// import { authorize } from "../middlewares/authorize.js";

// const router = express.Router();

// // ============================================
// // PARTICIPANT ROUTES (Authenticated Users)
// // ============================================

// /**
//  * @route   POST /api/registrations/register/:eventId
//  * @desc    Register for an event
//  * @access  Private (Authenticated users)
//  * @body    { college, department, studentId }
//  */
// router.post("/register/:eventId", userAuth, registerForEvent);

// /**
//  * @route   GET /api/registrations/my-registrations
//  * @desc    Get all registrations of logged-in user
//  * @access  Private (Authenticated users)
//  */
// router.get("/my-registrations", userAuth, getMyRegistrations);

// /**
//  * @route   GET /api/registrations/:id
//  * @desc    Get single registration details by ID
//  * @access  Private (Owner or Admin/Organizer)
//  */
// router.get("/:id", userAuth, getRegistrationById);

// /**
//  * @route   PATCH /api/registrations/:id/cancel
//  * @desc    Cancel a registration
//  * @access  Private (Owner only)
//  */
// router.patch("/:id/cancel", userAuth, cancelRegistration);

// /**
//  * @route   POST /api/registrations/:id/resend-qr
//  * @desc    Resend QR code to email
//  * @access  Private (Owner only)
//  */
// // router.post("/:id/resend-qr", userAuth, resendQRCode);

// // ============================================
// // ADMIN/ORGANIZER/FACULTY ROUTES
// // ============================================

// /**
//  * @route   GET /api/registrations/event/:eventId
//  * @desc    Get all registrations for a specific event
//  * @access  Private (Admin, Organizer, Faculty only)
//  */
// router.get(
//   "/event/:eventId", 
//   userAuth, 
// //   roleMiddleware(["admin", "organizer", "faculty"]), 
//     authorize('admin', 'organizer', 'faculty'),
//   getEventRegistrations
// );

// export default router;


import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  getRegistrationById,
  cancelRegistration,
  getEventRegistrations,
//   resendQRCode
} from "../controllers/registrationController.js";
import  userAuth  from "../middlewares/userAuth.js";
// import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();



 
router.post("/register/:eventId", userAuth,  registerForEvent);

router.get("/my-registrations", userAuth, authorize('participant'),getMyRegistrations);

router.get("/:id", userAuth, getRegistrationById);


router.patch("/:id/cancel", userAuth, cancelRegistration);

// router.get(
//   "/event/:eventId", 
//   userAuth, 
// //   roleMiddleware(["admin", "organizer", "faculty"]), 
//     authorize('admin', 'organizer', 'faculty'),
//   getEventRegistrations
// );


// Get registrations for a specific event (only creator organizer or admin can see)
router.get('/event/:eventId/registrations', userAuth, getEventRegistrations);

export default router;