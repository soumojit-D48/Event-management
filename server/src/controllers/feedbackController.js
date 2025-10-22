

import Feedback from "../models/Feedback.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import PDFDocument from "pdfkit";

// Check if user can submit feedback
export const canSubmitFeedback = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;

        // Fetch event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check if event has ended  // *** if event.endDate is avalebe then this check else we have to check with start date + 3 hr etc
        const currentTime = new Date();
        // if (currentTime < event.endDate) {
        //     return res.status(400).json({ 
        //         success: false, 
        //         message: "Feedback can only be submitted after the event ends" 
        //     });
        // }

        // Check if feedback window is still open (1 day from event end)
        const feedbackDeadline = new Date(event.endDate.getTime() + 24 * 60 * 60 * 1000);
        if (currentTime > feedbackDeadline) {
            return res.status(400).json({ 
                success: false, 
                message: "Feedback submission window has closed (1 day after event)" 
            });
        }

        // Check if user attended (has check-in record)
        const attendance = await Attendance.findOne({
            event: eventId,
            participant: userId
        });

        // if (!attendance) {
        //     return res.status(403).json({ 
        //         success: false, 
        //         message: "Only participants who attended the event can submit feedback" 
        //     });
        // }

        // Check if already submitted feedback
        const existingFeedback = await Feedback.findOne({
            event: eventId,
            participant: userId
        });

        if (existingFeedback) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already submitted feedback for this event" 
            });
        }

        req.eventData = { event, attendance };
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error checking feedback eligibility: " + error.message 
        });
    }
};

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { rating, comments } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                success: false, 
                message: "Rating must be between 1 and 5" 
            });
        }

        const feedback = new Feedback({
            event: eventId,
            participant: userId,
            rating: Number(rating),
            comments: comments || "",
            submittedAt: new Date()
        });

        await feedback.save();

        return res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            data: feedback
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error submitting feedback: " + error.message 
        });
    }
};

// Get all feedback for an event (for organizers/coordinators)
export const getEventFeedback = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check if user is authorized (organizer or coordinator)
        const isAuthorized = event.createdBy.includes(req.user._id) || 
                            event.coordinators.includes(req.user._id);

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to view feedback for this event" 
            });
        }

        const feedbacks = await Feedback.find({ event: eventId })
            .populate("participant", "name email department")
            .sort({ submittedAt: -1 });

        // Calculate statistics
        const stats = {
            totalFeedback: feedbacks.length,
            averageRating: feedbacks.length > 0 
                ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(2)
                : 0,
            ratingDistribution: {
                5: feedbacks.filter(f => f.rating === 5).length,
                4: feedbacks.filter(f => f.rating === 4).length,
                3: feedbacks.filter(f => f.rating === 3).length,
                2: feedbacks.filter(f => f.rating === 2).length,
                1: feedbacks.filter(f => f.rating === 1).length
            }
        };

        return res.status(200).json({
            success: true,
            data: {
                event: {
                    id: event._id,
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate
                },
                stats,
                feedbacks
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error fetching feedback: " + error.message 
        });
    }
};

// Check feedback eligibility (for frontend to show/hide button)
export const checkFeedbackEligibility = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        const currentTime = new Date();

        // Check if event has ended
        // if (currentTime < event.endDate) {
        //     return res.status(200).json({
        //         success: true,
        //         canSubmit: false,
        //         reason: "Event has not ended yet"
        //     });
        // }

        // Check feedback window
        const feedbackDeadline = new Date(event.endDate.getTime() + 24 * 60 * 60 * 1000);
        if (currentTime > feedbackDeadline) {
            return res.status(200).json({
                success: true,
                canSubmit: false,
                reason: "Feedback submission window has closed"
            });
        }

        // Check if user attended
        const attendance = await Attendance.findOne({
            event: eventId,
            participant: userId
        });

        // if (!attendance) {
        //     return res.status(200).json({
        //         success: true,
        //         canSubmit: false,
        //         reason: "You did not attend this event"
        //     });
        // }

        // Check if already submitted
        const existingFeedback = await Feedback.findOne({
            event: eventId,
            participant: userId
        });

        if (existingFeedback) {
            return res.status(200).json({
                success: true,
                canSubmit: false,
                reason: "You have already submitted feedback",
                feedbackSubmittedAt: existingFeedback.submittedAt
            });
        }

        // Calculate remaining time
        const remainingTime = Math.ceil((feedbackDeadline - currentTime) / (60 * 1000)); // in minutes

        return res.status(200).json({
            success: true,
            canSubmit: true,
            remainingMinutes: remainingTime,
            message: `Feedback window closes in ${Math.floor(remainingTime / 60)} hours and ${remainingTime % 60} minutes`
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error checking eligibility: " + error.message 
        });
    }
};

// Download feedback as PDF (for organizers/coordinators)
export const downloadFeedbackPDF = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check if user is authorized
        const isAuthorized = event.createdBy.includes(req.user._id) || 
                            event.coordinators.includes(req.user._id) ||
                            event.volunteers.includes(req.user._id);

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to download feedback for this event" 
            });
        }

        const feedbacks = await Feedback.find({ event: eventId })
            .populate("participant", "name email department role")
            .sort({ submittedAt: -1 });

        // Calculate statistics
        const stats = {
            totalFeedback: feedbacks.length,
            averageRating: feedbacks.length > 0 
                ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(2)
                : 0,
            ratingDistribution: {
                5: feedbacks.filter(f => f.rating === 5).length,
                4: feedbacks.filter(f => f.rating === 4).length,
                3: feedbacks.filter(f => f.rating === 3).length,
                2: feedbacks.filter(f => f.rating === 2).length,
                1: feedbacks.filter(f => f.rating === 1).length
            }
        };

        // Create PDF
        const doc = new PDFDocument();
        const filename = `feedback-${event.title.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        
        doc.pipe(res);

        // Title
        doc.fontSize(24).font('Helvetica-Bold').text('Event Feedback Report', { align: 'center' });
        doc.moveDown(0.5);

        // Event Details
        doc.fontSize(14).font('Helvetica-Bold').text('Event Details', { underline: true });
        doc.fontSize(11).font('Helvetica');
        doc.text(`Title: ${event.title}`);
        doc.text(`Description: ${event.description}`);
        doc.text(`Venue: ${event.venue}`);
        doc.text(`Start Date: ${new Date(event.startDate).toLocaleString()}`);
        doc.text(`End Date: ${new Date(event.endDate).toLocaleString()}`);
        doc.moveDown(1);

        // Statistics
        doc.fontSize(14).font('Helvetica-Bold').text('Feedback Statistics', { underline: true });
        doc.fontSize(11).font('Helvetica');
        doc.text(`Total Responses: ${stats.totalFeedback}`);
        doc.text(`Average Rating: ${stats.averageRating}/5.0`);
        doc.moveDown(0.5);

        doc.fontSize(12).font('Helvetica-Bold').text('Rating Distribution:');
        doc.fontSize(11).font('Helvetica');
        doc.text(`5 Stars: ${stats.ratingDistribution[5]} (${stats.totalFeedback > 0 ? ((stats.ratingDistribution[5] / stats.totalFeedback) * 100).toFixed(1) : 0}%)`);
        doc.text(`4 Stars: ${stats.ratingDistribution[4]} (${stats.totalFeedback > 0 ? ((stats.ratingDistribution[4] / stats.totalFeedback) * 100).toFixed(1) : 0}%)`);
        doc.text(`3 Stars: ${stats.ratingDistribution[3]} (${stats.totalFeedback > 0 ? ((stats.ratingDistribution[3] / stats.totalFeedback) * 100).toFixed(1) : 0}%)`);
        doc.text(`2 Stars: ${stats.ratingDistribution[2]} (${stats.totalFeedback > 0 ? ((stats.ratingDistribution[2] / stats.totalFeedback) * 100).toFixed(1) : 0}%)`);
        doc.text(`1 Star: ${stats.ratingDistribution[1]} (${stats.totalFeedback > 0 ? ((stats.ratingDistribution[1] / stats.totalFeedback) * 100).toFixed(1) : 0}%)`);
        doc.moveDown(1);

        // Individual Feedbacks
        doc.fontSize(14).font('Helvetica-Bold').text('Individual Feedback', { underline: true });
        doc.moveDown(0.5);

        feedbacks.forEach((feedback, index) => {
            doc.fontSize(11).font('Helvetica-Bold').text(`${index + 1}. ${feedback.participant.name}`, { lineGap: 5 });
            doc.fontSize(10).font('Helvetica');
            doc.text(`Rating: ${'⭐'.repeat(feedback.rating)} (${feedback.rating}/5)`, { lineGap: 3 });
            doc.text(`Email: ${feedback.participant.email}`);
            doc.text(`Department: ${feedback.participant.department || 'N/A'}`);
            doc.text(`Submitted: ${new Date(feedback.submittedAt).toLocaleString()}`);
            
            if (feedback.comments) {
                doc.text(`Comments: ${feedback.comments}`, { width: 500, align: 'left' });
            }
            
            doc.moveDown(0.8);
            
            // Add page break if needed
            if (index < feedbacks.length - 1) {
                doc.addPage();
            }
        });

        doc.end();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error generating PDF: " + error.message 
        });
    }
}