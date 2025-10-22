import express from "express";
import {
  checkCertificateEligibility,
  uploadCertificateTemplate,
  generateCertificate,
  getMyCertificate,
  getCertificateTemplate,
} from "../controllers/certificateController.js";

import  userAuth  from "../middlewares/userAuth.js"; // your auth + role middleware
import { authorize } from "../middlewares/authorize.js";    
import { upload } from "../middlewares/multerMiddware.js"; // your multer config
import { attachEvent } from "../middlewares/eventMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/events/:eventId/certificates/check-eligibility
 * @desc    Check if logged-in user can generate a certificate
 * @access  Authenticated users (participants)
 */
router.get(
  "/events/:eventId/certificates/check-eligibility",
  userAuth,
  checkCertificateEligibility
);

/**
 * @route   POST /api/events/:eventId/certificate-template
 * @desc    Upload or update certificate template for event
 * @access  Organizer only
 */
// router.post(
//   "/events/:eventId/certificate-template",
//   userAuth,
//   authorize("organizer"),
//   upload.single("template"),
//   uploadCertificateTemplate
// );

// Add this route BEFORE the POST route
router.get(
  "/events/:eventId/certificate-template",
  userAuth,
  attachEvent, // Your middleware that attaches event to req
  getCertificateTemplate
);

router.post(
  "/events/:eventId/certificate-template",
  userAuth,
  authorize("organizer"),
  attachEvent, // Make sure to add this too
  upload.single("template"),
  uploadCertificateTemplate
);

/**
 * @route   POST /api/events/:eventId/certificates/generate
 * @desc    Generate a certificate for logged-in participant
 * @access  Participant only
 */
router.post(
  "/events/:eventId/certificates/generate",
  userAuth,
  authorize("participant"),
  generateCertificate
);

/**
 * @route   GET /api/events/:eventId/certificates/me
 * @desc    Get logged-in user’s certificate for event
 * @access  Authenticated users
 */
router.get(
  "/events/:eventId/certificates/me",
  userAuth,
  getMyCertificate
);

export default router;
