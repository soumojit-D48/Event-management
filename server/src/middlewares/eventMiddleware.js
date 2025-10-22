import Event from '../models/Event.js';

// org
// Check if user is one of the event organizers
export const checkEventOwnership = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is one of the organizers (createdBy is an array)
        const isOrganizer = event.createdBy.some(
            id => id.toString() === req.user._id.toString()
        );

        if (!isOrganizer) {
            return res.status(403).json({
                success: false,
                message: 'Only event organizers can perform this action'
            });
        }

        // Attach event to request for use in controller
        req.event = event;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// org, coor, Vol
// Check if user has event role (organizer, coordinator, or volunteer)
export const checkEventRole = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        const userId = req.user._id.toString();

        // Check if user is one of the organizers
        const isOrganizer = event.createdBy.some(id => id.toString() === userId);

        // Check if user is coordinator
        const isCoordinator = event.coordinators.some(id => id.toString() === userId);

        // Check if user is volunteer
        const isVolunteer = event.volunteers.some(id => id.toString() === userId);

        if (!isOrganizer && !isCoordinator && !isVolunteer) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to manage this event'
            });
        }

        // Attach event and role info to request
        req.event = event;
        req.eventRole = {
            isOrganizer,
            isCoordinator,
            isVolunteer
        };

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// org , coor
// Check if user is organizer or coordinator (for volunteer management)
export const checkOrganizerOrCoordinator = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        const userId = req.user._id.toString();

        // Check if user is organizer
        const isOrganizer = event.createdBy.some(id => id.toString() === userId);

        // Check if user is coordinator
        const isCoordinator = event.coordinators.some(id => id.toString() === userId);

        if (!isOrganizer && !isCoordinator) {
            return res.status(403).json({
                success: false,
                message: 'Only organizers or coordinators can perform this action'
            });
        }

        req.event = event;
        req.eventRole = {
            isOrganizer,
            isCoordinator
        };

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Example middleware that should exist
export const attachEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    req.event = event;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message
    });
  }
};