

// import Attendance from "../models/Attendance.js";
// import Registration from "../models/Registration.js";
// import Event from "../models/Event.js";
// import User from "../models/User.js";

// // Mark attendance by scanning QR code
// export const markAttendance = async (req, res) => {
//   try {
//     const { registrationId } = req.body;
//     const volunteerId = req.user.id; // from auth middleware

//     // Find the registration
//     const registration = await Registration.findById(registrationId)
//       .populate("participant", "name email phone")
//       .populate("event", "title venue startDate");

//     if (!registration) {
//       return res.status(404).json({ success: false, message: "Registration not found" });
//     }

//     // Check if registration is cancelled
//     if (registration.status === "cancelled") {
//       return res.status(400).json({ success: false, message: "Registration has been cancelled" });
//     }

//     // Check if already checked in
//     if (registration.status === "checked-in") {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Participant already checked in",
//         alreadyCheckedIn: true
//       });
//     }

//     // Check if attendance already exists (double check)
//     const existingAttendance = await Attendance.findOne({
//       event: registration.event._id,
//       participant: registration.participant._id
//     });

//     if (existingAttendance) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Attendance already marked",
//         alreadyCheckedIn: true
//       });
//     }

//     // Create attendance record
//     const attendance = new Attendance({
//       event: registration.event._id,
//       participant: registration.participant._id,
//       verifiedBy: volunteerId,
//       checkInTime: new Date()
//     });

//     await attendance.save();

//     // Update registration status to checked-in
//     registration.status = "checked-in";
//     await registration.save();

//     // Populate verifiedBy details for response
//     await attendance.populate("verifiedBy", "name email");

//     res.status(201).json({
//       success: true,
//       message: "Attendance marked successfully",
//       data: {
//         attendance,
//         participant: registration.participant,
//         event: registration.event
//       }
//     });

//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get all participants for an event (with attendance status)
// export const getEventParticipants = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id;

//     // Verify event exists and user has permission to view
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ success: false, message: "Event not found" });
//     }

//     // Check if user is organizer, coordinator, or volunteer for this event
//     const hasPermission = 
//       req.user.role === "admin" ||
//       event.createdBy.some(id => id.toString() === userId) ||
//       event.coordinators.some(id => id.toString() === userId) ||
//       event.volunteers.some(id => id.toString() === userId);

//     if (!hasPermission) {
//       return res.status(403).json({ success: false, message: "You don't have permission to view participants" });
//     }

//     // Get all registrations for this event
//     const registrations = await Registration.find({ event: eventId })
//       .populate("participant", "name email phone department")
//       .sort({ registeredAt: -1 });

//     // Get all attendance records for this event
//     const attendances = await Attendance.find({ event: eventId })
//       .populate("verifiedBy", "name email");

//     // Create a map of participant attendance
//     const attendanceMap = {};
//     attendances.forEach(att => {
//       attendanceMap[att.participant.toString()] = {
//         checkInTime: att.checkInTime,
//         verifiedBy: att.verifiedBy
//       };
//     });

//     // Combine registration and attendance data
//     const participants = registrations.map(reg => {
//       const participantId = reg.participant._id.toString();
//       const attendance = attendanceMap[participantId];

//       return {
//         _id: reg._id,
//         participant: {
//           id: reg.participant._id,
//           name: reg.participant.name,
//           email: reg.participant.email,
//           phone: reg.participant.phone,
//           department: reg.participant.department
//         },
//         college: reg.college,
//         studentId: reg.studentId,
//         registeredAt: reg.registeredAt,
//         status: reg.status,
//         qrCode: reg.qrCode,
//         checkInTime: attendance ? attendance.checkInTime : null,
//         verifiedBy: attendance ? attendance.verifiedBy : null
//       };
//     });

//     // Calculate statistics
//     const stats = {
//       totalRegistered: registrations.length,
//       checkedIn: registrations.filter(r => r.status === "checked-in").length,
//       notCheckedIn: registrations.filter(r => r.status === "registered").length,
//       cancelled: registrations.filter(r => r.status === "cancelled").length
//     };

//     res.status(200).json({
//       success: true,
//       data: participants,
//       stats,
//       event: {
//         id: event._id,
//         title: event.title,
//         venue: event.venue,
//         startDate: event.startDate,
//         endDate: event.endDate
//       }
//     });

//   } catch (error) {
//     console.error("Error fetching participants:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get attendance details for a specific participant
// export const getParticipantAttendance = async (req, res) => {
//   try {
//     const { registrationId } = req.params;

//     const registration = await Registration.findById(registrationId)
//       .populate("participant", "name email phone department")
//       .populate("event", "title venue startDate endDate");

//     if (!registration) {
//       return res.status(404).json({ success: false, message: "Registration not found" });
//     }

//     const attendance = await Attendance.findOne({
//       event: registration.event._id,
//       participant: registration.participant._id
//     }).populate("verifiedBy", "name email");

//     res.status(200).json({
//       success: true,
//       data: {
//         registration,
//         attendance,
//         isCheckedIn: registration.status === "checked-in"
//       }
//     });

//   } catch (error) {
//     console.error("Error fetching participant attendance:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get all attendance records for an event (detailed view)
// export const getEventAttendance = async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     const attendances = await Attendance.find({ event: eventId })
//       .populate("participant", "name email phone department")
//       .populate("verifiedBy", "name email role")
//       .sort({ checkInTime: -1 });

//     res.status(200).json({
//       success: true,
//       data: attendances,
//       count: attendances.length
//     });

//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Export attendance report (for download)
// export const exportAttendanceReport = async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ success: false, message: "Event not found" });
//     }

//     const registrations = await Registration.find({ event: eventId })
//       .populate("participant", "name email phone department")
//       .sort({ registeredAt: 1 });

//     const attendances = await Attendance.find({ event: eventId })
//       .populate("verifiedBy", "name");

//     const attendanceMap = {};
//     attendances.forEach(att => {
//       attendanceMap[att.participant.toString()] = {
//         checkInTime: att.checkInTime,
//         verifiedBy: att.verifiedBy.name
//       };
//     });

//     const report = registrations.map((reg, index) => {
//       const participantId = reg.participant._id.toString();
//       const attendance = attendanceMap[participantId];

//       return {
//         sNo: index + 1,
//         name: reg.participant.name,
//         email: reg.participant.email,
//         phone: reg.participant.phone || "N/A",
//         college: reg.college,
//         department: reg.department || "N/A",
//         studentId: reg.studentId,
//         registeredAt: new Date(reg.registeredAt).toLocaleString(),
//         status: reg.status,
//         checkInTime: attendance ? new Date(attendance.checkInTime).toLocaleString() : "Not Checked In",
//         verifiedBy: attendance ? attendance.verifiedBy : "N/A"
//       };
//     });

//     res.status(200).json({
//       success: true,
//       event: {
//         title: event.title,
//         venue: event.venue,
//         date: event.startDate
//       },
//       report
//     });

//   } catch (error) {
//     console.error("Error exporting report:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };







import Attendance from "../models/Attendance.js";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// Mark attendance by scanning QR code
export const markAttendance = async (req, res) => {
  try {
    const { registrationId } = req.body;
    const { eventId } = req.params;
    const volunteerId = req.user._id; // from userAuth middleware

    // Find the registration
    const registration = await Registration.findById(registrationId)
      .populate("participant", "name email phone")
      .populate("event", "title venue startDate");

    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    // Verify registration is for the correct event
    if (registration.event._id.toString() !== eventId) {
      return res.status(400).json({ 
        success: false, 
        message: "Registration does not match the event" 
      });
    }

    // Check if registration is cancelled
    if (registration.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Registration has been cancelled" });
    }

    // Check if already checked in
    if (registration.status === "checked-in") {
      return res.status(400).json({ 
        success: false, 
        message: "Participant already checked in",
        alreadyCheckedIn: true
      });
    }

    // Check if attendance already exists (double check)
    const existingAttendance = await Attendance.findOne({
      event: registration.event._id,
      participant: registration.participant._id
    });

    if (existingAttendance) {
      return res.status(400).json({ 
        success: false, 
        message: "Attendance already marked",
        alreadyCheckedIn: true
      });
    }

    // Create attendance record
    const attendance = new Attendance({
      event: registration.event._id,
      participant: registration.participant._id,
      verifiedBy: volunteerId,
      checkInTime: new Date()
    });

    await attendance.save();

    // Update registration status to checked-in
    registration.status = "checked-in";
    await registration.save();

    // Populate verifiedBy details for response
    await attendance.populate("verifiedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: {
        attendance,
        participant: registration.participant,
        event: registration.event
      }
    });

  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all participants for an event (with attendance status)
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Verify event exists and user has permission to view
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if user is organizer, coordinator, or volunteer for this event
    const hasPermission = 
      req.user.role === "admin" ||
      event.createdBy.some(id => id.toString() === userId) ||
      event.coordinators.some(id => id.toString() === userId) ||
      event.volunteers.some(id => id.toString() === userId);

    if (!hasPermission) {
      return res.status(403).json({ success: false, message: "You don't have permission to view participants" });
    }

    // Get all registrations for this event
    const registrations = await Registration.find({ event: eventId })
      .populate("participant", "name email phone department")
      .sort({ registeredAt: -1 });

    // Get all attendance records for this event
    const attendances = await Attendance.find({ event: eventId })
      .populate("verifiedBy", "name email");

    // Create a map of participant attendance
    const attendanceMap = {};
    attendances.forEach(att => {
      attendanceMap[att.participant.toString()] = {
        checkInTime: att.checkInTime,
        verifiedBy: att.verifiedBy
      };
    });

    // Combine registration and attendance data
    const participants = registrations.map(reg => {
      const participantId = reg.participant._id.toString();
      const attendance = attendanceMap[participantId];

      return {
        _id: reg._id,
        participant: {
          id: reg.participant._id,
          name: reg.participant.name,
          email: reg.participant.email,
          phone: reg.participant.phone,
          department: reg.participant.department
        },
        college: reg.college,
        studentId: reg.studentId,
        registeredAt: reg.registeredAt,
        status: reg.status,
        qrCode: reg.qrCode,
        checkInTime: attendance ? attendance.checkInTime : null,
        verifiedBy: attendance ? attendance.verifiedBy : null
      };
    });

    // Calculate statistics
    const stats = {
      totalRegistered: registrations.length,
      checkedIn: registrations.filter(r => r.status === "checked-in").length,
      notCheckedIn: registrations.filter(r => r.status === "registered").length,
      cancelled: registrations.filter(r => r.status === "cancelled").length
    };

    res.status(200).json({
      success: true,
      data: participants,
      stats,
      event: {
        id: event._id,
        title: event.title,
        venue: event.venue,
        startDate: event.startDate,
        endDate: event.endDate
      }
    });

  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get attendance details for a specific participant
export const getParticipantAttendance = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId)
      .populate("participant", "name email phone department")
      .populate("event", "title venue startDate endDate");

    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    const attendance = await Attendance.findOne({
      event: registration.event._id,
      participant: registration.participant._id
    }).populate("verifiedBy", "name email");

    res.status(200).json({
      success: true,
      data: {
        registration,
        attendance,
        isCheckedIn: registration.status === "checked-in"
      }
    });

  } catch (error) {
    console.error("Error fetching participant attendance:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all attendance records for an event (detailed view)
export const getEventAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;

    const attendances = await Attendance.find({ event: eventId })
      .populate("participant", "name email phone department")
      .populate("verifiedBy", "name email role")
      .sort({ checkInTime: -1 });

    res.status(200).json({
      success: true,
      data: attendances,
      count: attendances.length
    });

  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Export attendance report (for download)
export const exportAttendanceReport = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate("participant", "name email phone department")
      .sort({ registeredAt: 1 });

    const attendances = await Attendance.find({ event: eventId })
      .populate("verifiedBy", "name");

    const attendanceMap = {};
    attendances.forEach(att => {
      attendanceMap[att.participant.toString()] = {
        checkInTime: att.checkInTime,
        verifiedBy: att.verifiedBy.name
      };
    });

    const report = registrations.map((reg, index) => {
      const participantId = reg.participant._id.toString();
      const attendance = attendanceMap[participantId];

      return {
        sNo: index + 1,
        name: reg.participant.name,
        email: reg.participant.email,
        phone: reg.participant.phone || "N/A",
        college: reg.college,
        department: reg.department || "N/A",
        studentId: reg.studentId,
        registeredAt: new Date(reg.registeredAt).toLocaleString(),
        status: reg.status,
        checkInTime: attendance ? new Date(attendance.checkInTime).toLocaleString() : "Not Checked In",
        verifiedBy: attendance ? attendance.verifiedBy : "N/A"
      };
    });

    res.status(200).json({
      success: true,
      event: {
        title: event.title,
        venue: event.venue,
        date: event.startDate
      },
      report
    });

  } catch (error) {
    console.error("Error exporting report:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};