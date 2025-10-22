

import express from "express";
import {
    submitFeedback,
    getEventFeedback,
    checkFeedbackEligibility,
    downloadFeedbackPDF,
    canSubmitFeedback
} from "../controllers/feedbackController.js";
import userAuth  from "../middlewares/userAuth.js";
import { authorize } from "../middlewares/authorize.js";

const feedbackRouter = express.Router();

// Check if user can submit feedback (public, just needs auth)
feedbackRouter.get(
    "/check-eligibility/:eventId",
    userAuth,
    checkFeedbackEligibility
);

// Submit feedback
feedbackRouter.post(
    "/submit/:eventId",
    userAuth,
    canSubmitFeedback,
    submitFeedback
);

// Get all feedback for an event (organizers/coordinators only)
feedbackRouter.get(
    "/event/:eventId",
    userAuth,
    authorize("organizer", "faculty", "admin"),
    getEventFeedback
);

// Download feedback as PDF (organizers/coordinators/volunteers)
feedbackRouter.get(
    "/download-pdf/:eventId",
    userAuth,
    authorize("organizer", "faculty", "volunteer", "admin"),
    downloadFeedbackPDF
);

export default feedbackRouter;