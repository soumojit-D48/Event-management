import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import QRCode from "qrcode";
// import { sendRegistrationEmail } from "../utils/emailService.js";
import {REGISTRATION_EMAIL_TEMPLATE} from "../config/emailTemplate.js"
import { sendRegistrationEmail } from "../utils/nodemail.js";
import { saveBase64ToFile } from "../config/cloudinaryConfig.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../config/cloudinaryConfig.js";

// Register for an event
// export const registerForEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params; // Get eventId from URL params
//     const { college, department, studentId } = req.body;
//     const participantId = req.user.id; // from auth middleware

//     // Validate required fields
//     if (!college || !department || !studentId) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "College, department, and student ID are required" 
//       });
//     }

//     // Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if registration is still open (must be at least 12 hours before event)
//     const currentTime = new Date();
//     const eventStartTime = new Date(event.startDate);
//     const twelveHoursBeforeEvent = new Date(eventStartTime.getTime() - (12 * 60 * 60 * 1000)); // 12 hours in milliseconds
    
//     if (currentTime >= twelveHoursBeforeEvent) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Registration closed. Registration must be done at least 12 hours before the event starts",
//         eventStartDate: event.startDate,
//         registrationDeadline: twelveHoursBeforeEvent
//       });
//     }

//     // Check if user already registered
//     const existingRegistration = await Registration.findOne({
//       event: eventId,
//       participant: participantId,
//       status: { $ne: "cancelled" }
//     });

//     if (existingRegistration) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "You are already registered for this event" 
//       });
//     }

//     // Check max participants limit
//     if (event.maxParticipants > 0 && event.currentParticipants >= event.maxParticipants) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Event has reached maximum capacity" 
//       });
//     }

//     // Get user details
//     const user = await User.findById(participantId);
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "User not found" 
//       });
//     }

//     // Create registration
//     const registration = new Registration({
//       event: eventId,
//       participant: participantId,
//       college,
//       department,
//       studentId,
//       status: "registered"
//     });

//     // Generate QR Code data
//     // const qrData = JSON.stringify({
//     //   registrationId: registration._id,
//     //   eventId: eventId,
//     //   participantId: participantId,
//     //   studentId: studentId,
//     //   timestamp: Date.now()
//     // });

//     // Generate QR code as base64
//     // const qrCodeBase64 = await QRCode.toDataURL(qrData, {
//     //   width: 300,
//     //   margin: 2,
//     //   color: {
//     //     dark: '#000000',
//     //     light: '#FFFFFF'
//     //   }
//     // });

//     // registration.qrCode = qrCodeBase64;
//     await registration.save();

//     // Update event participant count
//     event.currentParticipants += 1;
//     await event.save();

//     // Send registration confirmation email with QR code
//     // await sendRegistrationEmail({
//     //   to: user.email,
//     //   userName: user.name,
//     //   eventTitle: event.title,
//     //   eventVenue: event.venue,
//     //   eventStartDate: event.startDate,
//     //   eventEndDate: event.endDate,
//     //   qrCode: qrCodeBase64,
//     //   registrationId: registration._id
//     // });

//     res.status(201).json({
//       success: true,
//       message: "Registration successful! Check your email for QR code",
//       data: registration
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Registration failed", 
//       error: error.message 
//     });
//   }
// };



export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from URL params
    const { college, department, studentId } = req.body;
    const participantId = req.user._id; // Your userAuth sets req.user as the full user object

    // Validate required fields
    if (!college || !department || !studentId) {
      return res.status(400).json({ 
        success: false, 
        message: "College, department, and student ID are required" 
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    // Check if registration is still open (must be at least 12 hours before event)
    // const currentTime = new Date();
    // const eventStartTime = new Date(event.startDate);
    // const twelveHoursBeforeEvent = new Date(eventStartTime.getTime() - (4 * 60 * 60 * 1000)); // 12 hours in milliseconds
    
    // if (currentTime >= twelveHoursBeforeEvent) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     message: "Registration closed. Registration must be done at least 12 hours before the event starts",
    //     eventStartDate: event.startDate,
    //     registrationDeadline: twelveHoursBeforeEvent
    //   });
    // }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      event: eventId,
      participant: participantId,
      status: { $ne: "cancelled" }
    }) 
    

    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: "You are already registered for this event" 
      });
    }

    // Check max participants limit
    if (event.maxParticipants > 0 && event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ 
        success: false, 
        message: "Event has reached maximum capacity" 
      });
    }

    // Get user details for email (already available in req.user)
    const user = req.user; // Your userAuth already fetches the full user object

    console.log(user?.name , "syeiuyryur");
    

    // const user = await User.findById(participantId).select("name email phone");

    // Create registration
    const registration = new Registration({
      event: eventId,
      participant: participantId,
      college,
      department,
      studentId,
      status: "registered"
    })  
    

    // // Generate QR Code data
    const qrData = JSON.stringify({
      registrationId: registration._id,
      eventId: eventId,
      participantId: participantId,
      // studentId: studentId,
      timestamp: Date.now()
    });

    // // Generate QR code as base64
    const qrCodeBase64 = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    console.log(registration._id);
    console.log(eventId);
    console.log(participantId);
    
    console.log("QR Code Base64 starts with:", qrCodeBase64.slice(0, 30));

    registration.qrCode = qrCodeBase64;

    const tempFilePath = await saveBase64ToFile(qrCodeBase64);
    console.log(tempFilePath, "temp");
    

    const uploadResponse = await uploadOnCloudinary(tempFilePath);
    console.log(uploadResponse, "uploadResponse");
    

    if (!uploadResponse) {
  return res.status(500).json({ 
    success: false, 
    message: "Failed to upload QR code" 
  });
}

    registration.qrCode = uploadResponse.secure_url;
      console.log(uploadResponse.secure_url, "uploar");

    await registration.save();

    // Update event participant count
    event.currentParticipants += 1;
    await event.save();

    // Send registration confirmation email with QR code
    await sendRegistrationEmail({
      to: user.email,
      userName: user.name,
      eventTitle: event.title,
      eventVenue: event.venue,
      eventStartDate: event.startDate,
      eventEndDate: event.endDate,
      // qrCode: qrCodeBase64,
      qrCode: uploadResponse.secure_url,
      registrationId: registration._id
    });

    console.log(qrCodeBase64, "qrCodeBase64");
    

    res.status(201).json({
      success: true,
      message: "Registration successful! Check your email for QR code",
      data: registration
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Registration failed", 
      error: error.message 
    });
  }
};



// export const registerForEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { college, department, studentId } = req.body;
//     const user = req.user
//     const participantId = user._id;

//     // Logged-in user from userAuth
//     // const participantId = req.user._id;

//     // Validate required fields
//     if (!college || !department || !studentId) {
//       return res.status(400).json({
//         success: false,
//         message: "College, department, and student ID are required",
//       });
//     }

//     // Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found",
//       });
//     }

//     // Check registration time limit (12 hours before event)
//     const currentTime = new Date();
//     const eventStartTime = new Date(event.startDate);
//     const registrationDeadline = new Date(
//       eventStartTime.getTime() - 12 * 60 * 60 * 1000
//     );

//     if (currentTime >= registrationDeadline) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Registration closed. You must register at least 12 hours before the event starts.",
//       });
//     }

//     // Prevent duplicate registration
//     const existing = await Registration.findOne({
//       event: eventId,
//       participant: participantId,
//       status: { $ne: "cancelled" },
//     });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already registered for this event.",
//       });
//     }

//     // Check max participant limit
//     if (
//       event.maxParticipants > 0 &&
//       event.currentParticipants >= event.maxParticipants
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Event has reached maximum capacity.",
//       });
//     }

//     // Create registration
//     const registration = await Registration.create({
//       event: eventId,
//       participant: participantId,
//       college,
//       department,
//       studentId,
//       status: "registered",
//     });

//     // Update event count
//     event.currentParticipants += 1;
//     await event.save();

//     res.status(201).json({
//       success: true,
//       message: "Registration successful!",
//       data: registration,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Registration failed",
//       error: error.message,
//     });
//   }
// };



// Get user's registrations /// it will show all registations of logged in user from here we can cancel also


export const getMyRegistrations = async (req, res) => {
  try {
    const participantId = req.user._id;

    const registrations = await Registration.find({ 
      participant: participantId 
    })
      .populate("event", "title description venue startDate endDate")
      .populate("participant", "name email phone")
      .populate("")

      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });

  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch registrations", 
      error: error.message 
    });
  }
};

// Get single registration details
export const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params; // registration ID
    const participantId = req.user.id;

    const registration = await Registration.findById(id)
      .populate("event", "title description venue startDate endDate sessions")
      .populate("participant", "name email phone");

    if (!registration) {
      return res.status(404).json({ 
        success: false, 
        message: "Registration not found" 
      });
    }

    // Check if user owns this registration or is admin/organizer
    if (registration.participant._id.toString() !== participantId && 
        !["admin", "organizer"].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied" 
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });

  } catch (error) {
    console.error("Error fetching registration:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch registration", 
      error: error.message 
    });
  }
};

// Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params; // registration ID
    const participantId = req.user.id;

    const registration = await Registration.findById(id).populate("event");

    if (!registration) {
      return res.status(404).json({ 
        success: false, 
        message: "Registration not found" 
      });
    }

    // Check ownership
    if (registration.participant.toString() !== participantId) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied" 
      });
    }

    // Check if already cancelled
    if (registration.status === "cancelled") {
      return res.status(400).json({ 
        success: false, 
        message: "Registration is already cancelled" 
      });
    }

    // Check if event has already started
    if (new Date() > registration.event.startDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot cancel registration for an event that has already started" 
      });
    }


    // Update registration status
    registration.status = "cancelled";
    await registration.save();

    if (registration.qrCode) {
      await deleteFromCloudinary(registration.qrCode);
    }

    // Decrease event participant count
    const event = await Event.findById(registration.event._id);
    if (event.currentParticipants > 0) {
      event.currentParticipants -= 1;
      await event.save();
    }

    res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
      data: registration
    });

  } catch (error) {
    console.error("Error cancelling registration:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to cancel registration", 
      error: error.message 
    });
  }
};

// Get all registrations for an event (Admin/Organizer only)
// export const getEventRegistrations = async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     // Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     const registrations = await Registration.find({ 
//       event: eventId,
//       status: { $ne: "cancelled" }
//     })
//       .populate("participant", "name email phone department")
//       .sort({ registeredAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: registrations.length,
//       data: registrations
//     });

//   } catch (error) {
//     console.error("Error fetching event registrations:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch event registrations", 
//       error: error.message 
//     });
//   }
// };


// Get all registrations for an event (Only for Admin and Event Creator Organizer)

export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    // Check authorization: Only Admin or the organizer who created this event can view registrations
    if (userRole === "admin") {
      // Admin can view all event registrations
    } else if (userRole === "organizer") {
      // Organizer can only view registrations for events they created
      // Check if user is in createdBy array
      const isCreator = event.createdBy.some(creator => creator.toString() === userId.toString());
      if (!isCreator) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied. Only the event creator can view registrations" 
        });
      }
    } else {
      // Other roles cannot view event registrations
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only admins and event organizers can view registrations" 
      });
    }

    const registrations = await Registration.find({ 
      event: eventId,
      status: { $ne: "cancelled" }
    })
      .populate("participant", "name email phone department")
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });

  } catch (error) {
    console.error("Error fetching event registrations:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch event registrations", 
      error: error.message 
    });
  }
};








// Resend QR code email
// export const resendQRCode = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const participantId = req.user.id;

//     const registration = await Registration.findById(id)
//       .populate("event", "title venue startDate endDate")
//       .populate("participant", "name email");

//     if (!registration) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Registration not found" 
//       });
//     }

//     // Check ownership
//     if (registration.participant._id.toString() !== participantId) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Access denied" 
//       });
//     }

//     // Check if registration is active
//     if (registration.status === "cancelled") {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot resend QR code for cancelled registration" 
//       });
//     }

//     // Resend email
//     await sendRegistrationEmail({
//       to: registration.participant.email,
//       userName: registration.participant.name,
//       eventTitle: registration.event.title,
//       eventVenue: registration.event.venue,
//       eventStartDate: registration.event.startDate,
//       eventEndDate: registration.event.endDate,
//       qrCode: registration.qrCode,
//       registrationId: registration._id
//     });

//     res.status(200).json({
//       success: true,
//       message: "QR code sent to your email successfully"
//     });

//   } catch (error) {
//     console.error("Error resending QR code:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to resend QR code", 
//       error: error.message 
//     });
//   }
// };



