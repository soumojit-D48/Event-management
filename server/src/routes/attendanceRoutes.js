import express from "express";
import {
  markAttendance,
  getEventParticipants,
  getParticipantAttendance,
  getEventAttendance,
  exportAttendanceReport
} from "../controllers/attendanceController.js";
import userAuth from "../middlewares/userAuth.js";
// import { authorize, checkEventRole, checkOrganizerOrCoordinator } from "../middlewares/eventMiddleware.js";
import { checkEventRole, checkOrganizerOrCoordinator } from "../middlewares/eventMiddleware.js";

const router = express.Router();

// Mark attendance (scan QR code)
// Accessible by: volunteers, coordinators, organizers for their event
router.post(
  "/mark/:eventId",
  userAuth,
  checkEventRole, // ensures user is organizer/coordinator/volunteer for this event
  markAttendance
);

// Get all participants for an event with attendance status
// Accessible by: volunteers, coordinators, organizers for their event + admin
router.get(
  "/event/:eventId/participants",
  userAuth,
  async (req, res, next) => {
    // Allow admin to bypass event role check
    if (req.user.role === 'admin') {
      return next();
    }
    return checkEventRole(req, res, next);
  },
  getEventParticipants
);

// Get attendance details for a specific participant
// Accessible by: volunteers, coordinators, organizers for their event + admin
router.get(
  "/participant/:registrationId",
  userAuth,
  getParticipantAttendance
);

// Get all attendance records for an event
// Accessible by: coordinators, organizers for their event + admin
router.get(
  "/event/:eventId/attendance",
  userAuth,
  async (req, res, next) => {
    // Allow admin to bypass event role check
    if (req.user.role === 'admin') {
      return next();
    }
    return checkOrganizerOrCoordinator(req, res, next);
  },
  getEventAttendance
);

// Export attendance report
// Accessible by: coordinators, organizers for their event + admin
router.get(
  "/event/:eventId/export",
  userAuth,
  async (req, res, next) => {
    // Allow admin to bypass event role check
    if (req.user.role === 'admin') {
      return next();
    }
    return checkOrganizerOrCoordinator(req, res, next);
  },
  exportAttendanceReport
);

export default router;