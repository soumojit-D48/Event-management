// import Event from '../models/Event.js';
// import User from '../models/User.js';

// // Create new event (Organizer only)
// const createEvent = async (req, res) => {
//     try {
//         const { 
//             title, 
//             description, 
//             venue, 
//             startDate, 
//             endDate,
//             sessions,
//             coordinators,
//             volunteers,
//             bannerUrl,
//             maxParticipants 
//         } = req.body;

//         // Check if user is organizer
//         if (req.user.role !== 'organizer') {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: 'Only organizers can create events' 
//             });
//         }

//         // Validate required fields
//         if (!title || !description || !venue || !startDate) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Title, description, venue, and start date are required' 
//             });
//         }

//         // Create event
//         const event = new Event({
//             title,
//             description,
//             venue,
//             startDate,
//             endDate: endDate || null,
//             sessions: sessions || [],
//             createdBy: req.user._id,
//             coordinators: coordinators || [],
//             volunteers: volunteers || [],
//             bannerUrl: bannerUrl || '',
//             maxParticipants: maxParticipants || 0,
//             currentParticipants: 0
//         });

//         await event.save();

//         // Populate creator and team info
//         await event.populate([
//             { path: 'createdBy', select: 'name email role' },
//             { path: 'coordinators', select: 'name email role' },
//             { path: 'volunteers', select: 'name email role' }
//         ]);

//         res.status(201).json({
//             success: true,
//             message: 'Event created successfully',
//             event
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get all events
// const getAllEvents = async (req, res) => {
//     try {
//         const { search, upcoming, past } = req.query;
//         let query = {};

//         // Search by title
//         if (search) {
//             query.title = { $regex: search, $options: 'i' };
//         }

//         // Filter by date
//         const now = new Date();
//         if (upcoming === 'true') {
//             query.startDate = { $gte: now.toISOString() };
//         } else if (past === 'true') {
//             query.endDate = { $lt: now.toISOString() };
//         }

//         const events = await Event.find(query)
//             .populate('createdBy', 'name email')
//             .populate('coordinators', 'name email')
//             .populate('volunteers', 'name email')
//             .sort({ startDate: -1 });

//         res.status(200).json({
//             success: true,
//             count: events.length,
//             events
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get single event by ID
// const getEventById = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.eventId)
//             .populate('createdBy', 'name email role department')
//             .populate('coordinators', 'name email role department')
//             .populate('volunteers', 'name email role department');

//         if (!event) {
//             return res.status(404).json({ success: false, message: 'Event not found' });
//         }

//         res.status(200).json({
//             success: true,
//             event
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get events created by logged-in user
// const getMyEvents = async (req, res) => {
//     try {
//         const events = await Event.find({ createdBy: req.user._id })
//             .populate('coordinators', 'name email')
//             .populate('volunteers', 'name email')
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: events.length,
//             events
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get events where user is coordinator or volunteer
// const getEventsIManage = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const events = await Event.find({
//             $or: [
//                 { coordinators: userId },
//                 { volunteers: userId }
//             ]
//         })
//         .populate('createdBy', 'name email')
//         .populate('coordinators', 'name email')
//         .populate('volunteers', 'name email')
//         .sort({ startDate: -1 });

//         res.status(200).json({
//             success: true,
//             count: events.length,
//             events
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update event (Creator only)
// const updateEvent = async (req, res) => {  // ***
//     try {
//         const { 
//             title, 
//             description, 
//             venue, 
//             startDate, 
//             endDate,
//             bannerUrl,
//             maxParticipants 
//         } = req.body;

//         const event = req.event; // From middleware

//         // Update fields
//         if (title) event.title = title;
//         if (description) event.description = description;
//         if (venue) event.venue = venue;
//         if (startDate) event.startDate = startDate;
//         if (endDate !== undefined) event.endDate = endDate;
//         if (bannerUrl !== undefined) event.bannerUrl = bannerUrl;
//         if (maxParticipants !== undefined) event.maxParticipants = maxParticipants;

//         await event.save();

//         await event.populate([
//             { path: 'createdBy', select: 'name email' },
//             { path: 'coordinators', select: 'name email' },
//             { path: 'volunteers', select: 'name email' }
//         ]);

//         res.status(200).json({
//             success: true,
//             message: 'Event updated successfully',
//             event
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Delete event (Creator only)
// const deleteEvent = async (req, res) => {
//     try {
//         const event = req.event; // From middleware

//         await event.deleteOne();

//         res.status(200).json({
//             success: true,
//             message: 'Event deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Add coordinators to event (Creator only)
// const addCoordinators = async (req, res) => {
//     try {
//         const { coordinatorIds } = req.body;

//         if (!coordinatorIds || !Array.isArray(coordinatorIds)) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'coordinatorIds array is required' 
//             });
//         }

//         const event = req.event; // From middleware

//         // Verify all users exist and are faculty
//         const users = await User.find({ 
//             _id: { $in: coordinatorIds },
//             role: 'faculty'
//         });

//         if (users.length !== coordinatorIds.length) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Some users are invalid or not faculty members' 
//             });
//         }

//         // Add coordinators (avoid duplicates)
//         coordinatorIds.forEach(id => {
//             if (!event.coordinators.includes(id)) {
//                 event.coordinators.push(id);
//             }
//         });

//         await event.save();
//         await event.populate('coordinators', 'name email role');

//         res.status(200).json({
//             success: true,
//             message: 'Coordinators added successfully',
//             coordinators: event.coordinators
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove coordinator from event (Creator only)
// const removeCoordinator = async (req, res) => {
//     try {
//         const { coordinatorId } = req.params;
//         const event = req.event; // From middleware

//         event.coordinators = event.coordinators.filter(
//             id => id.toString() !== coordinatorId
//         );

//         await event.save();

//         res.status(200).json({
//             success: true,
//             message: 'Coordinator removed successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Add volunteers to event (Creator or Coordinator)
// const addVolunteers = async (req, res) => {
//     try {
//         const { volunteerIds } = req.body;

//         if (!volunteerIds || !Array.isArray(volunteerIds)) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'volunteerIds array is required' 
//             });
//         }

//         const event = req.event; // From middleware

//         // Verify all users exist and are volunteers
//         const users = await User.find({ 
//             _id: { $in: volunteerIds },
//             role: 'volunteer'
//         });

//         if (users.length !== volunteerIds.length) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Some users are invalid or not volunteers' 
//             });
//         }

//         // Add volunteers (avoid duplicates)
//         volunteerIds.forEach(id => {
//             if (!event.volunteers.includes(id)) {
//                 event.volunteers.push(id);
//             }
//         });

//         await event.save();
//         await event.populate('volunteers', 'name email role');

//         res.status(200).json({
//             success: true,
//             message: 'Volunteers added successfully',
//             volunteers: event.volunteers
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove volunteer from event (Creator or Coordinator)
// const removeVolunteer = async (req, res) => {
//     try {
//         const { volunteerId } = req.params;
//         const event = req.event; // From middleware

//         event.volunteers = event.volunteers.filter(
//             id => id.toString() !== volunteerId
//         );

//         await event.save();

//         res.status(200).json({
//             success: true,
//             message: 'Volunteer removed successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Add/Update sessions (Creator or has event role)
// const manageSessions = async (req, res) => {  // ****
//     try {
//         const { sessions } = req.body;

//         if (!sessions || !Array.isArray(sessions)) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'sessions array is required' 
//             });
//         }

//         const event = req.event; // From middleware
//         event.sessions = sessions;

//         await event.save();

//         res.status(200).json({
//             success: true,
//             message: 'Sessions updated successfully',
//             sessions: event.sessions
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get event team (coordinators + volunteers)
// const getEventTeam = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.eventId)
//             .populate('createdBy', 'name email role department phone')
//             .populate('coordinators', 'name email role department phone')
//             .populate('volunteers', 'name email role department phone');

//         if (!event) {
//             return res.status(404).json({ success: false, message: 'Event not found' });
//         }

//         res.status(200).json({
//             success: true,
//             team: {
//                 creator: event.createdBy,
//                 coordinators: event.coordinators,
//                 volunteers: event.volunteers
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export {
//     createEvent,
//     getAllEvents,
//     getEventById,
//     getMyEvents,
//     getEventsIManage,
//     updateEvent,
//     deleteEvent,
//     addCoordinators,
//     removeCoordinator,
//     addVolunteers,
//     removeVolunteer,
//     manageSessions,
//     getEventTeam
// };









import Event from '../models/Event.js';
import User from '../models/User.js';

import { uploadOnCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js';

// Create new event (Organizer only)
const createEvent = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            venue, 
            startDate, 
            endDate,
            sessions,
            organizers, // Additional organizers
            coordinators,
            volunteers,
            // bannerUrl,
            maxParticipants 
        } = req.body;

        let parsedSessions = [];
    if (sessions) {
      parsedSessions = typeof sessions === 'string' 
        ? JSON.parse(sessions) 
        : sessions;
    }

        // Validate required fields
        if (!title || !description || !venue || !startDate) {
            return res.status(400).json({ 
                success: false, 
                message: 'Title, description, venue, and start date are required' 
            });
        }

         // Handle banner upload
        let bannerUrl = '';
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (cloudinaryResponse) {
                bannerUrl = cloudinaryResponse.secure_url;
            }
        }

        // Start with current user as creator/organizer
        let createdByArray = [req.user._id];

        // Add additional organizers if provided
        if (organizers && Array.isArray(organizers) && organizers.length > 0) {
            // Verify all additional organizers exist and have organizer role
            const orgUsers = await User.find({ 
                _id: { $in: organizers },
                role: 'organizer',
                isApproved: true,
                isAccountVerified: true
            });

            if (orgUsers.length !== organizers.length) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Some organizers are invalid, not organizers, or not approved' 
                });
            }

            // Add them (avoid duplicates)
            organizers.forEach(id => {
                if (!createdByArray.some(cId => cId.toString() === id.toString())) {
                    createdByArray.push(id);
                }
            });
        }

        // Create event
        const event = new Event({
            title,
            description,
            venue,
            startDate,
            endDate: endDate || null,
            // sessions: sessions || [],
            sessions: parsedSessions,  // Use parsed sessions
            createdBy: createdByArray,
            coordinators: coordinators || [],
            volunteers: volunteers || [],
            // bannerUrl: finalBannerUrl,
            bannerUrl,
            maxParticipants: maxParticipants || 0,
            currentParticipants: 0
        });

        await event.save();

        // Populate creator and team info
        await event.populate([
            { path: 'createdBy', select: 'name email role' },
            { path: 'coordinators', select: 'name email role' },
            { path: 'volunteers', select: 'name email role' }
        ]);

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const { search, upcoming, past } = req.query;
        let query = {};

        // Search by title
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filter by date
        const now = new Date();
        if (upcoming === 'true') {
            query.startDate = { $gte: now.toISOString() };
        } else if (past === 'true') {
            // Check endDate if exists, otherwise check startDate
            query.$or = [
                { endDate: { $exists: true, $lt: now.toISOString() } },
                { endDate: { $exists: false }, startDate: { $lt: now.toISOString() } }
            ];
        }

        const events = await Event.find(query)
            .populate('createdBy', 'name email')
            .populate('coordinators', 'name email')
            .populate('volunteers', 'name email')
            .sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)
            .populate('createdBy', 'name email role department')
            .populate('coordinators', 'name email role department')
            .populate('volunteers', 'name email role department');

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get events created by logged-in user
const getMyEvents = async (req, res) => {
    try { // midlleware (only organizer )
        const events = await Event.find({ 
          createdBy: req.user._id 
        })
          .populate('createdBy', 'name email')
          .populate('coordinators', 'name email')
          .populate('volunteers', 'name email')
          .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get events where user is coordinator or volunteer
const getEventsIManage = async (req, res) => {
    try {
        const userId = req.user._id;

        const events = await Event.find({
            $or: [
                { coordinators: userId },
                { volunteers: userId }
            ]
        })
        .populate('createdBy', 'name email')
        .populate('coordinators', 'name email')
        .populate('volunteers', 'name email')
        .sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// // Update event (Any organizer in createdBy array)
// const updateEvent = async (req, res) => {
//     try {
//         const { 
//             title, 
//             description, 
//             venue, 
//             startDate, 
//             endDate,
//             bannerUrl,
//             maxParticipants 
//         } = req.body;

//         const event = req.event; // From middleware

//         // Update fields
//         if (title) event.title = title;
//         if (description) event.description = description;
//         if (venue) event.venue = venue;
//         if (startDate) event.startDate = startDate;
//         if (endDate !== undefined) event.endDate = endDate;
//         if (bannerUrl !== undefined) event.bannerUrl = bannerUrl;
//         if (maxParticipants !== undefined) event.maxParticipants = maxParticipants;

//         await event.save();

//         await event.populate([
//             { path: 'createdBy', select: 'name email' },
//             { path: 'coordinators', select: 'name email' },
//             { path: 'volunteers', select: 'name email' }
//         ]);

//         res.status(200).json({
//             success: true,
//             message: 'Event updated successfully',
//             event
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Delete event (Any organizer in createdBy array)
// const deleteEvent = async (req, res) => {
//     try {
//         const event = req.event; // From middleware

//         await event.deleteOne();

//         res.status(200).json({
//             success: true,
//             message: 'Event deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };



// for now anyone can update means organizer 


const updateEvent = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            venue, 
            startDate, 
            endDate,
            sessions,
            organizers,
            coordinators,
            volunteers,
            maxParticipants 
        } = req.body;

        const event = req.event; // From middleware

        // Parse sessions if it's a string (from FormData)
        let parsedSessions = null;
        if (sessions) {
            parsedSessions = typeof sessions === 'string' 
                ? JSON.parse(sessions) 
                : sessions;
        }

        // Handle banner update
        if (req.file) {
            // Delete old banner from Cloudinary if exists
            if (event.bannerUrl) {
                await deleteFromCloudinary(event.bannerUrl);
            }

            // Upload new banner
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (cloudinaryResponse) {
                event.bannerUrl = cloudinaryResponse.secure_url;
            }
        }

        // Update fields
        if (title) event.title = title;
        if (description) event.description = description;
        if (venue) event.venue = venue;
        if (startDate) event.startDate = startDate;
        if (endDate !== undefined) event.endDate = endDate;
        if (parsedSessions) event.sessions = parsedSessions;
        if (coordinators) event.coordinators = coordinators;
        if (volunteers) event.volunteers = volunteers;
        if (maxParticipants !== undefined) event.maxParticipants = maxParticipants;

        // Handle organizers update
        if (organizers && Array.isArray(organizers) && organizers.length > 0) {
            // Verify all additional organizers exist and have organizer role
            const orgUsers = await User.find({ 
                _id: { $in: organizers },
                role: 'organizer',
                isApproved: true,
                isAccountVerified: true
            });

            if (orgUsers.length !== organizers.length) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Some organizers are invalid, not organizers, or not approved' 
                });
            }

            let createdByArray = [event.createdBy[0]]; // Keep original creator

            // Add them (avoid duplicates)
            organizers.forEach(id => {
                if (!createdByArray.some(cId => cId.toString() === id.toString())) {
                    createdByArray.push(id);
                }
            });

            event.createdBy = createdByArray;
        }

        await event.save();

        await event.populate([
            { path: 'createdBy', select: 'name email role' },
            { path: 'coordinators', select: 'name email role' },
            { path: 'volunteers', select: 'name email role' }
        ]);

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = req.event; // From middleware

        // Delete banner from Cloudinary if exists
        if (event.bannerUrl) {
            await deleteFromCloudinary(event.bannerUrl);
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const event = req.event; // attached from checkEventOwnership

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== "organizer" || !user.isApproved || !user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User is not an approved or verified organizer",
      });
    }

    if (event.createdBy.some(id => id.toString() === user._id.toString())) {
      return res.status(400).json({ success: false, message: "Organizer already added" });
    }

    event.createdBy.push(user._id);
    await event.save();
    await event.populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: `Organizer ${user.name} added successfully`,
      organizers: event.createdBy,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const event = req.event;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent removing last organizer
    if (event.createdBy.length <= 1) {
      return res.status(400).json({
        success: false,
        message: "Cannot remove the last organizer",
      });
    }

    // Prevent self-removal
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot remove yourself",
      });
    }

    if (!event.createdBy.some(id => id.toString() === user._id.toString())) {
      return res.status(400).json({
        success: false,
        message: "This user is not an organizer of this event",
      });
    }

    event.createdBy = event.createdBy.filter(
      id => id.toString() !== user._id.toString()
    );
    await event.save();

    res.status(200).json({
      success: true,
      message: `Organizer ${user.name} removed successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add organizers to event (Existing organizers only)
const addOrganizers = async (req, res) => {
    try {
        const { organizerIds } = req.body;

        if (!organizerIds || !Array.isArray(organizerIds)) {
            return res.status(400).json({ 
                success: false, 
                message: 'organizerIds array is required' 
            });
        }

        const event = req.event; // From middleware

        // Verify all users exist and are organizers
        const users = await User.find({ 
            _id: { $in: organizerIds },
            role: 'organizer',
            isApproved: true,
            isAccountVerified: true
        });

        if (users.length !== organizerIds.length) {
            return res.status(400).json({ 
                success: false, 
                message: 'Some users are invalid, not organizers, or not approved' 
            });
        }

        // Add organizers (avoid duplicates)
        organizerIds.forEach(id => {
            if (!event.createdBy.some(oId => oId.toString() === id)) {
                event.createdBy.push(id);
            }
        });

        await event.save();
        await event.populate('createdBy', 'name email role');

        res.status(200).json({
            success: true,
            message: 'Organizers added successfully',
            organizers: event.createdBy
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// // Remove organizer from event (Existing organizers only)

export const removeOrganizer = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const event = req.event; // From middleware

        // Ensure at least one organizer remains
        if (event.createdBy.length <= 1) {
            return res.status(400).json({
                success: false,
                message: 'Cannot remove the last organizer. Event must have at least one organizer.'
            });
        }

        // Check if trying to remove themselves
        if (organizerId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot remove yourself. Ask another organizer to remove you.'
            });
        }

        event.createdBy = event.createdBy.filter(
            id => id.toString() !== organizerId
        );

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Organizer removed successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add coordinators to event (Organizers only)

const addCoordinators = async (req, res) => {
    try {
        const { coordinatorIds } = req.body;

        if (!coordinatorIds || !Array.isArray(coordinatorIds)) {
            return res.status(400).json({ 
                success: false, 
                message: 'coordinatorIds array is required' 
            });
        }

        const event = req.event; // From middleware

        // Verify all users exist and are faculty
        const users = await User.find({ 
            _id: { $in: coordinatorIds },
            role: 'faculty',
            isApproved: true,
            isAccountVerified: true
        });

        if (users.length !== coordinatorIds.length) {
            return res.status(400).json({ 
                success: false, 
                message: 'Some users are invalid, not faculty members, or not approved' 
            });
        }

        // Add coordinators (avoid duplicates)
        coordinatorIds.forEach(id => {
            if (!event.coordinators.some(cId => cId.toString() === id)) {
                event.coordinators.push(id);
            }
        });

        await event.save();
        await event.populate('coordinators', 'name email role');

        res.status(200).json({
            success: true,
            message: 'Coordinators added successfully',
            coordinators: event.coordinators
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const addCoordinatorByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const event = req.event; // attached from checkEventOwnership middleware

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (user.role !== "faculty" || !user.isApproved || !user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User is not an approved or verified faculty member",
      });
    }

    if (event.coordinators.some(id => id.toString() === user._id.toString())) {
      return res.status(400).json({ 
        success: false, 
        message: "Coordinator already added" 
      });
    }

    event.coordinators.push(user._id);
    await event.save();
    await event.populate("coordinators", "name email role");

    res.status(200).json({
      success: true,
      message: `Coordinator ${user.name} added successfully`,
      coordinators: event.coordinators,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Remove coordinator from event (Organizers only)

const removeCoordinator = async (req, res) => {
    try {
        const { coordinatorId } = req.params;
        const event = req.event; // From middleware

        event.coordinators = event.coordinators.filter(
            id => id.toString() !== coordinatorId
        );

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Coordinator removed successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const removeCoordinatorById = async (req, res) => {
  try {
    const { coordinatorId } = req.params;
    const event = req.event; // attached from checkEventOwnership middleware

    if (!coordinatorId) {
      return res.status(400).json({ 
        success: false, 
        message: "Coordinator ID is required" 
      });
    }

    const coordinatorExists = event.coordinators.some(
      id => id.toString() === coordinatorId
    );

    if (!coordinatorExists) {
      return res.status(404).json({ 
        success: false, 
        message: "Coordinator not found in this event" 
      });
    }

    event.coordinators = event.coordinators.filter(
      id => id.toString() !== coordinatorId
    );

    await event.save();
    await event.populate("coordinators", "name email role");

    res.status(200).json({
      success: true,
      message: "Coordinator removed successfully",
      coordinators: event.coordinators,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Add volunteers to event (Organizers or Coordinators)

const addVolunteers = async (req, res) => {
    try {
        const { volunteerIds } = req.body;

        if (!volunteerIds || !Array.isArray(volunteerIds)) {
            return res.status(400).json({ 
                success: false, 
                message: 'volunteerIds array is required' 
            });
        }

        const event = req.event; // From middleware

        // Verify all users exist and are volunteers
        const users = await User.find({ 
            _id: { $in: volunteerIds },
            role: 'volunteer',
            isApproved: true,
            isAccountVerified: true
        });

        if (users.length !== volunteerIds.length) {
            return res.status(400).json({ 
                success: false, 
                message: 'Some users are invalid, not volunteers, or not approved' 
            });
        }

        // Add volunteers (avoid duplicates)
        volunteerIds.forEach(id => {
            if (!event.volunteers.some(vId => vId.toString() === id)) {
                event.volunteers.push(id);
            }
        });

        await event.save();
        await event.populate('volunteers', 'name email role');

        res.status(200).json({
            success: true,
            message: 'Volunteers added successfully',
            volunteers: event.volunteers
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove volunteer from event (Organizers or Coordinators)

const removeVolunteer = async (req, res) => {
    try {
        const { volunteerId } = req.params;
        const event = req.event; // From middleware

        event.volunteers = event.volunteers.filter(
            id => id.toString() !== volunteerId
        );

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Volunteer removed successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addVolunteerByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const event = req.event; // attached from checkEventOwnership middleware

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (user.role !== "volunteer" || !user.isApproved || !user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User is not an approved or verified volunteer",
      });
    }

    if (event.volunteers.some(id => id.toString() === user._id.toString())) {
      return res.status(400).json({ 
        success: false, 
        message: "Volunteer already added" 
      });
    }

    event.volunteers.push(user._id);
    await event.save();
    await event.populate("volunteers", "name email role");

    res.status(200).json({
      success: true,
      message: `Volunteer ${user.name} added successfully`,
      volunteers: event.volunteers,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const removeVolunteerById = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const event = req.event; // attached from checkEventOwnership middleware

    if (!volunteerId) {
      return res.status(400).json({ 
        success: false, 
        message: "Volunteer ID is required" 
      });
    }

    const volunteerExists = event.volunteers.some(
      id => id.toString() === volunteerId
    );

    if (!volunteerExists) {
      return res.status(404).json({ 
        success: false, 
        message: "Volunteer not found in this event" 
      });
    }

    event.volunteers = event.volunteers.filter(
      id => id.toString() !== volunteerId
    );

    await event.save();
    await event.populate("volunteers", "name email role");

    res.status(200).json({
      success: true,
      message: "Volunteer removed successfully",
      volunteers: event.volunteers,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Add/Update sessions (Organizers or has event role)
const manageSessions = async (req, res) => {
    try {
        const { sessions } = req.body;

        if (!sessions || !Array.isArray(sessions)) {
            return res.status(400).json({ 
                success: false, 
                message: 'sessions array is required' 
            });
        }

        const event = req.event; // From middleware
        event.sessions = sessions;

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Sessions updated successfully',
            sessions: event.sessions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get event team (organizers + coordinators + volunteers)
const getEventTeam = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)
            .populate('createdBy', 'name email role department phone')
            .populate('coordinators', 'name email role department phone')
            .populate('volunteers', 'name email role department phone');

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({
            success: true,
            team: {
                organizers: event.createdBy,
                coordinators: event.coordinators,
                volunteers: event.volunteers
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    createEvent,
    getAllEvents,
    getEventById,
    getMyEvents,
    getEventsIManage,
    updateEvent,
    deleteEvent,

    // addOrganizers,
    // removeOrganizer,

    addCoordinators,
    removeCoordinator,

    addVolunteers,
    removeVolunteer,

    manageSessions,
    getEventTeam
};