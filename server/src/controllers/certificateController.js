


// /**
//  * Upload Certificate Template
//  * POST /api/events/:eventId/certificate-template
//  * Only organizers/creators can upload
//  */
// export const uploadCertificateTemplate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id; // From auth middleware

//     // Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if user is organizer/creator of this event
//     const isOrganizer = event.createdBy.some(
//       (id) => id.toString() === userId.toString()
//     );
//     if (!isOrganizer) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Only event organizers can upload certificate templates" 
//       });
//     }

//     // Check if file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Please upload a certificate template file" 
//       });
//     }

//     // Upload to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "event-certificates/templates",
//           resource_type: "auto",
//           format: "png", // Convert to PNG for consistency
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       uploadStream.end(req.file.buffer);
//     });

//     // Parse coordinates config from request body
//     const coordinatesConfig = JSON.parse(req.body.coordinatesConfig || "{}");

//     // Update event with template details
//     event.certificateTemplate = {
//       templateUrl: result.secure_url,
//       uploadedAt: new Date(),
//       coordinatesConfig: {
//         name: {
//           x: coordinatesConfig.name?.x || 400,
//           y: coordinatesConfig.name?.y || 300,
//           fontSize: coordinatesConfig.name?.fontSize || 40,
//           fontFamily: coordinatesConfig.name?.fontFamily || "Helvetica-Bold",
//           color: coordinatesConfig.name?.color || "#000000",
//         },
//         department: {
//           x: coordinatesConfig.department?.x || 400,
//           y: coordinatesConfig.department?.y || 250,
//           fontSize: coordinatesConfig.department?.fontSize || 30,
//           fontFamily: coordinatesConfig.department?.fontFamily || "Helvetica",
//           color: coordinatesConfig.department?.color || "#000000",
//         },
//       },
//     };

//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: "Certificate template uploaded successfully",
//       data: {
//         templateUrl: event.certificateTemplate.templateUrl,
//         coordinatesConfig: event.certificateTemplate.coordinatesConfig,
//       },
//     });
//   } catch (error) {
//     console.error("Error uploading certificate template:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload certificate template",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Update Certificate Template Coordinates
//  * PUT /api/events/:eventId/certificate-template/coordinates
//  */
// export const updateTemplateCoordinates = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id;
//     const { coordinatesConfig } = req.body;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     const isOrganizer = event.createdBy.some(
//       (id) => id.toString() === userId.toString()
//     );
//     if (!isOrganizer) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Unauthorized" 
//       });
//     }

//     if (!event.certificateTemplate) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No template uploaded yet" 
//       });
//     }

//     event.certificateTemplate.coordinatesConfig = coordinatesConfig;
//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: "Coordinates updated successfully",
//       data: event.certificateTemplate.coordinatesConfig,
//     });
//   } catch (error) {
//     console.error("Error updating coordinates:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update coordinates",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Generate Certificate for Participant
//  * POST /api/events/:eventId/certificates/generate
//  * Participant must have attended the event
//  */
// export const generateCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id;

//     // Get event details
//     const event = await Event.findById(eventId).populate("createdBy", "name");
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if template is uploaded
//     if (!event.certificateTemplate || !event.certificateTemplate.templateUrl) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificate template not available for this event" 
//       });
//     }

//     // Check if certificates are enabled
//     if (!event.certificatesEnabled) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificates are not enabled for this event yet" 
//       });
//     }

//     // Check if participant attended the event
//     const attendance = await Attendance.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (!attendance) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "You must attend the event to receive a certificate" 
//       });
//     }

//     // Check if certificate already generated
//     const existingCertificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (existingCertificate) {
//       return res.status(200).json({
//         success: true,
//         message: "Certificate already generated",
//         data: {
//           certificateUrl: existingCertificate.certificateUrl,
//           generatedAt: existingCertificate.generatedAt,
//         },
//       });
//     }

//     // Get participant details
//     const participant = req.user; // From auth middleware (should have name, department)
    
//     // Generate PDF certificate
//     const certificateUrl = await generateCertificatePDF(
//       event.certificateTemplate.templateUrl,
//       participant.name,
//       participant.department || "N/A",
//       event.certificateTemplate.coordinatesConfig
//     );

//     // Save certificate record
//     const certificate = await Certificate.create({
//       event: eventId,
//       participant: userId,
//       certificateUrl,
//       generatedAt: new Date(),
//       templateUsed: event.certificateTemplate.templateUrl,
//       participantName: participant.name,
//       department: participant.department || "N/A",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Certificate generated successfully",
//       data: {
//         certificateUrl: certificate.certificateUrl,
//         generatedAt: certificate.generatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate certificate",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Get Participant's Certificate for an Event
//  * GET /api/events/:eventId/certificates/me
//  */
// export const getMyCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id;

//     const certificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     }).populate("event", "title startDate");

//     if (!certificate) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Certificate not found" 
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: certificate,
//     });
//   } catch (error) {
//     console.error("Error fetching certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch certificate",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Toggle Certificates Enable/Disable
//  * PATCH /api/events/:eventId/certificates/toggle
//  * Only organizers can toggle
//  */
// export const toggleCertificates = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user.id;
//     const { certificatesEnabled } = req.body;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     const isOrganizer = event.createdBy.some(
//       (id) => id.toString() === userId.toString()
//     );
//     if (!isOrganizer) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Unauthorized" 
//       });
//     }

//     event.certificatesEnabled = certificatesEnabled;
//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: `Certificates ${certificatesEnabled ? "enabled" : "disabled"} successfully`,
//       data: { certificatesEnabled: event.certificatesEnabled },
//     });
//   } catch (error) {
//     console.error("Error toggling certificates:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to toggle certificates",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Helper function to generate PDF certificate
//  */
// async function generateCertificatePDF(templateUrl, name, department, config) {
//   try {
//     // Fetch the template image
//     const templateResponse = await fetch(templateUrl);
//     const templateBuffer = await templateResponse.arrayBuffer();

//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([842, 595]); // A4 landscape

//     // Embed the template image
//     let templateImage;
//     if (templateUrl.endsWith('.png')) {
//       templateImage = await pdfDoc.embedPng(templateBuffer);
//     } else {
//       templateImage = await pdfDoc.embedJpg(templateBuffer);
//     }

//     // Draw the template as background
//     const { width, height } = page.getSize();
//     page.drawImage(templateImage, {
//       x: 0,
//       y: 0,
//       width: width,
//       height: height,
//     });

//     // Embed font
//     const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Convert hex color to RGB
//     const hexToRgb = (hex) => {
//       const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//       return result ? {
//         r: parseInt(result[1], 16) / 255,
//         g: parseInt(result[2], 16) / 255,
//         b: parseInt(result[3], 16) / 255,
//       } : { r: 0, g: 0, b: 0 };
//     };

//     // Draw participant name
//     const nameColor = hexToRgb(config.name.color);
//     page.drawText(name, {
//       x: config.name.x,
//       y: height - config.name.y,
//       size: config.name.fontSize,
//       font: font,
//       color: rgb(nameColor.r, nameColor.g, nameColor.b),
//     });

//     // Draw department
//     const deptColor = hexToRgb(config.department.color);
//     page.drawText(department, {
//       x: config.department.x,
//       y: height - config.department.y,
//       size: config.department.fontSize,
//       font: regularFont,
//       color: rgb(deptColor.r, deptColor.g, deptColor.b),
//     });

//     // Serialize the PDF to bytes
//     const pdfBytes = await pdfDoc.save();

//     // Upload PDF to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "event-certificates/generated",
//           resource_type: "raw",
//           format: "pdf",
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       uploadStream.end(Buffer.from(pdfBytes));
//     });

//     return uploadResult.secure_url;
//   } catch (error) {
//     console.error("Error in generateCertificatePDF:", error);
//     throw error;
//   }
// }






























// import Event from "../models/Event.js";
// import Certificate from "../models/Certificate.js";
// import Attendance from "../models/Attendance.js";
// import { v2 as cloudinary } from "cloudinary";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import fetch from "node-fetch";
// import fs from "fs";

// /**
//  * Upload Certificate Template
//  * POST /api/events/:eventId/certificate-template
//  * Only organizers can upload
//  */
// export const uploadCertificateTemplate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     // Event already attached by middleware
//     const event = req.event;

//     // Check if file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Please upload a certificate template file" 
//       });
//     }

//     // Upload to Cloudinary using your existing utility
//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "event-certificates/templates",
//       resource_type: "auto",
//     });

//     // Delete local file after upload
//     await fs.promises.unlink(req.file.path);

//     // Parse coordinates config from request body
//     const coordinatesConfig = JSON.parse(req.body.coordinatesConfig || "{}");

//     // If old template exists, delete it from Cloudinary
//     if (event.certificateTemplate?.templateUrl) {
//       const oldUrl = event.certificateTemplate.templateUrl;
//       const afterUpload = oldUrl.split("/upload/")[1];
//       if (afterUpload) {
//         const [publicIdWithVersion] = afterUpload.split(".");
//         const publicId = publicIdWithVersion.replace(/^v\d+\//, "");
//         await cloudinary.uploader.destroy(publicId).catch(err => 
//           console.error("Failed to delete old template:", err)
//         );
//       }
//     }

//     // Update event with template details
//     event.certificateTemplate = {
//       templateUrl: uploadResult.secure_url,
//       uploadedAt: new Date(),
//       coordinatesConfig: {
//         name: {
//           x: coordinatesConfig.name?.x || 400,
//           y: coordinatesConfig.name?.y || 300,
//           fontSize: coordinatesConfig.name?.fontSize || 40,
//           fontFamily: coordinatesConfig.name?.fontFamily || "Helvetica-Bold",
//           color: coordinatesConfig.name?.color || "#000000",
//         },
//         department: {
//           x: coordinatesConfig.department?.x || 400,
//           y: coordinatesConfig.department?.y || 250,
//           fontSize: coordinatesConfig.department?.fontSize || 30,
//           fontFamily: coordinatesConfig.department?.fontFamily || "Helvetica",
//           color: coordinatesConfig.department?.color || "#000000",
//         },
//       },
//     };

//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: "Certificate template uploaded successfully",
//       data: {
//         templateUrl: event.certificateTemplate.templateUrl,
//         coordinatesConfig: event.certificateTemplate.coordinatesConfig,
//       },
//     });
//   } catch (error) {
//     console.error("Error uploading certificate template:", error);
    
//     // Clean up file if it exists
//     if (req.file?.path) {
//       await fs.promises.unlink(req.file.path).catch(() => {});
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to upload certificate template",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Update Certificate Template Coordinates
//  * PUT /api/events/:eventId/certificate-template/coordinates
//  */
// export const updateTemplateCoordinates = async (req, res) => {
//   try {
//     const event = req.event; // From middleware
//     const { coordinatesConfig } = req.body;

//     if (!event.certificateTemplate) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No template uploaded yet" 
//       });
//     }

//     event.certificateTemplate.coordinatesConfig = coordinatesConfig;
//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: "Coordinates updated successfully",
//       data: event.certificateTemplate.coordinatesConfig,
//     });
//   } catch (error) {
//     console.error("Error updating coordinates:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update coordinates",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Generate Certificate for Participant
//  * POST /api/events/:eventId/certificates/generate
//  * Participant must have attended the event
//  */
// export const generateCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     // Get event details
//     const event = await Event.findById(eventId).populate("createdBy", "name");
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if template is uploaded
//     if (!event.certificateTemplate || !event.certificateTemplate.templateUrl) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificate template not available for this event" 
//       });
//     }

//     // Check if certificates are enabled
//     if (!event.certificatesEnabled) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificates are not enabled for this event yet" 
//       });
//     }

//     // Check if participant attended the event
//     const attendance = await Attendance.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (!attendance) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "You must attend the event to receive a certificate" 
//       });
//     }

//     // Check if certificate already generated
//     const existingCertificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (existingCertificate) {
//       return res.status(200).json({
//         success: true,
//         message: "Certificate already generated",
//         data: {
//           certificateUrl: existingCertificate.certificateUrl,
//           generatedAt: existingCertificate.generatedAt,
//         },
//       });
//     }

//     // Get participant details
//     const participant = req.user;
    
//     // Generate PDF certificate
//     const certificateUrl = await generateCertificatePDF(
//       event.certificateTemplate.templateUrl,
//       participant.name,
//       participant.department || "N/A",
//       event.certificateTemplate.coordinatesConfig,
//       event.title
//     );

//     // Save certificate record
//     const certificate = await Certificate.create({
//       event: eventId,
//       participant: userId,
//       certificateUrl,
//       generatedAt: new Date(),
//       templateUsed: event.certificateTemplate.templateUrl,
//       participantName: participant.name,
//       department: participant.department || "N/A",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Certificate generated successfully",
//       data: {
//         certificateUrl: certificate.certificateUrl,
//         generatedAt: certificate.generatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate certificate",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Get Participant's Certificate for an Event
//  * GET /api/events/:eventId/certificates/me
//  */
// export const getMyCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     const certificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     }).populate("event", "title startDate");

//     if (!certificate) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Certificate not found" 
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: certificate,
//     });
//   } catch (error) {
//     console.error("Error fetching certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch certificate",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Check Certificate Eligibility
//  * GET /api/events/:eventId/certificates/check-eligibility
//  */
// export const checkCertificateEligibility = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check attendance
//     const attendance = await Attendance.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });

//     // Check if certificate already exists
//     const existingCertificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });

//     const hasTemplate = event.certificateTemplate?.templateUrl ? true : false;
//     const isEnabled = event.certificatesEnabled;

//     res.status(200).json({
//       success: true,
//       data: {
//         hasAttended: !!attendance,
//         hasTemplate,
//         certificatesEnabled: isEnabled,
//         alreadyGenerated: !!existingCertificate,
//         canGenerate: !!attendance && hasTemplate && isEnabled && !existingCertificate,
//         certificateUrl: existingCertificate?.certificateUrl || null
//       },
//     });
//   } catch (error) {
//     console.error("Error checking eligibility:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to check eligibility",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Toggle Certificates Enable/Disable
//  * PATCH /api/events/:eventId/certificates/toggle
//  * Only organizers can toggle
//  */
// export const toggleCertificates = async (req, res) => {
//   try {
//     const event = req.event; // From middleware
//     const { certificatesEnabled } = req.body;

//     if (!event.certificateTemplate?.templateUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot enable certificates without uploading a template first"
//       });
//     }

//     event.certificatesEnabled = certificatesEnabled;
//     await event.save();

//     res.status(200).json({
//       success: true,
//       message: `Certificates ${certificatesEnabled ? "enabled" : "disabled"} successfully`,
//       data: { certificatesEnabled: event.certificatesEnabled },
//     });
//   } catch (error) {
//     console.error("Error toggling certificates:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to toggle certificates",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Get Certificate Template Info
//  * GET /api/events/:eventId/certificate-template
//  */
// export const getCertificateTemplate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
    
//     const event = await Event.findById(eventId).select('certificateTemplate certificatesEnabled');
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         hasTemplate: event.certificateTemplate?.templateUrl ? true : false,
//         templateUrl: event.certificateTemplate?.templateUrl || null,
//         coordinatesConfig: event.certificateTemplate?.coordinatesConfig || null,
//         uploadedAt: event.certificateTemplate?.uploadedAt || null,
//         certificatesEnabled: event.certificatesEnabled
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching template:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch template",
//       error: error.message,
//     });
//   }
// };

// /**
//  * Helper function to generate PDF certificate
//  */
// async function generateCertificatePDF(templateUrl, name, department, config, eventTitle) {
//   try {
//     // Fetch the template image
//     const templateResponse = await fetch(templateUrl);
//     const templateBuffer = await templateResponse.arrayBuffer();

//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([842, 595]); // A4 landscape

//     // Embed the template image
//     let templateImage;
//     if (templateUrl.toLowerCase().endsWith('.png')) {
//       templateImage = await pdfDoc.embedPng(templateBuffer);
//     } else {
//       templateImage = await pdfDoc.embedJpg(templateBuffer);
//     }

//     // Draw the template as background
//     const { width, height } = page.getSize();
//     page.drawImage(templateImage, {
//       x: 0,
//       y: 0,
//       width: width,
//       height: height,
//     });

//     // Embed font
//     const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Convert hex color to RGB
//     const hexToRgb = (hex) => {
//       const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//       return result ? {
//         r: parseInt(result[1], 16) / 255,
//         g: parseInt(result[2], 16) / 255,
//         b: parseInt(result[3], 16) / 255,
//       } : { r: 0, g: 0, b: 0 };
//     };

//     // Draw participant name
//     const nameColor = hexToRgb(config.name.color);
//     page.drawText(name, {
//       x: config.name.x,
//       y: height - config.name.y,
//       size: config.name.fontSize,
//       font: font,
//       color: rgb(nameColor.r, nameColor.g, nameColor.b),
//     });

//     // Draw department
//     const deptColor = hexToRgb(config.department.color);
//     page.drawText(department, {
//       x: config.department.x,
//       y: height - config.department.y,
//       size: config.department.fontSize,
//       font: regularFont,
//       color: rgb(deptColor.r, deptColor.g, deptColor.b),
//     });

//     // Serialize the PDF to bytes
//     const pdfBytes = await pdfDoc.save();

//     // Upload PDF to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "event-certificates/generated",
//           resource_type: "raw",
//           format: "pdf",
//           public_id: `cert_${Date.now()}_${name.replace(/\s+/g, '_')}`,
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       uploadStream.end(Buffer.from(pdfBytes));
//     });

//     return uploadResult.secure_url;
//   } catch (error) {
//     console.error("Error in generateCertificatePDF:", error);
//     throw error;
//   }
// }

























import Event from "../models/Event.js";
import Certificate from "../models/Certificate.js";
import Attendance from "../models/Attendance.js";
import { v2 as cloudinary } from "cloudinary";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fetch from "node-fetch";
import fs from "fs";
import { uploadOnCloudinary, deleteFromCloudinary } from "../config/cloudinaryConfig.js";

import streamifier from "streamifier";

/**
 * Upload Certificate Template
 * POST /api/events/:eventId/certificate-template
 * Only organizers can upload
 */
export const uploadCertificateTemplate = async (req, res) => {
console.log("Request params:", req.params);
  console.log("Event from middleware:", req.event);
  console.log("File:", req.file);

  try {

    
    const { eventId } = req.params;

    // Event already attached by middleware
    const event = req.event;

     if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Please upload a certificate template file" 
      });
    }

    // Upload to Cloudinary using your utility
    const uploadResult = await uploadOnCloudinary(req.file.path);
    
    if (!uploadResult) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload template to cloud storage"
      });
    }

    // Parse coordinates config from request body
    const coordinatesConfig = req.body.coordinatesConfig 
      ? JSON.parse(req.body.coordinatesConfig) 
      : {};

    // If old template exists, delete it from Cloudinary
    // if (event.certificateTemplate?.templateUrl) {
    //   await deleteFromCloudinary(event.certificateTemplate.templateUrl);
    // }

    // Update event with template details
    event.certificateTemplate = {
      templateUrl: uploadResult.secure_url,
      uploadedAt: new Date(),
      coordinatesConfig: {
        name: {
          x: coordinatesConfig.name?.x || 400,
          y: coordinatesConfig.name?.y || 300,
          fontSize: coordinatesConfig.name?.fontSize || 40,
          fontFamily: coordinatesConfig.name?.fontFamily || "Helvetica-Bold",
          color: coordinatesConfig.name?.color || "#000000",
        },
        department: {
          x: coordinatesConfig.department?.x || 400,
          y: coordinatesConfig.department?.y || 250,
          fontSize: coordinatesConfig.department?.fontSize || 30,
          fontFamily: coordinatesConfig.department?.fontFamily || "Helvetica",
          color: coordinatesConfig.department?.color || "#000000",
        },
      },
    };

    await event.save();

    res.status(200).json({
      success: true,
      message: "Certificate template uploaded successfully",
      data: {
        templateUrl: event.certificateTemplate.templateUrl,
        coordinatesConfig: event.certificateTemplate.coordinatesConfig,
      },
    });
  } catch (error) {
    console.error("Error uploading certificate template:", error);
    
    // Clean up file if it exists
    if (req.file?.path) {
      await fs.promises.unlink(req.file.path).catch(() => {});
    }

    res.status(500).json({
      success: false,
      message: "Failed to upload certificate template",
      error: error.message,
    });
  }
};

/**
 * Update Certificate Template Coordinates
 * PUT /api/events/:eventId/certificate-template/coordinates
 */
export const updateTemplateCoordinates = async (req, res) => {
  try {
    const event = req.event; // From middleware
    const { coordinatesConfig } = req.body;

    if (!event.certificateTemplate) {
      return res.status(400).json({ 
        success: false, 
        message: "No template uploaded yet" 
      });
    }

    event.certificateTemplate.coordinatesConfig = coordinatesConfig;
    await event.save();

    res.status(200).json({
      success: true,
      message: "Coordinates updated successfully",
      data: event.certificateTemplate.coordinatesConfig,
    });
  } catch (error) {
    console.error("Error updating coordinates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update coordinates",
      error: error.message,
    });
  }
};

/**
 * Generate Certificate for Participant
 * POST /api/events/:eventId/certificates/generate
 * Participant must have attended the event
 */

// export const generateCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     // Get event details
//     const event = await Event.findById(eventId).populate("createdBy", "name");
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if template is uploaded
//     if (!event.certificateTemplate || !event.certificateTemplate.templateUrl) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificate template not available for this event" 
//       });
//     }

//     // Check if certificates are enabled
//     // if (!event.certificatesEnabled) {
//     //   return res.status(400).json({ 
//     //     success: false, 
//     //     message: "Certificates are not enabled for this event yet" 
//     //   });
//     // }

//     // Check if participant attended the event
//     const attendance = await Attendance.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (!attendance) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "You must attend the event to receive a certificate" 
//       });
//     }

//     // Check if certificate already generated
//     const existingCertificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
//     if (existingCertificate) {
//       return res.status(200).json({
//         success: true,
//         message: "Certificate already generated",
//         data: {
//           certificateUrl: existingCertificate.certificateUrl,
//           generatedAt: existingCertificate.generatedAt,
//         },
//       });
//     }

//     // Get participant details
//     const participant = req.user;
    
//     // Generate PDF certificate
//     const certificateUrl = await generateCertificatePDF(
//       event.certificateTemplate.templateUrl,
//       participant.name,
//       participant.department || "N/A",
//       event.certificateTemplate.coordinatesConfig,
//       event.title
//     );

//     // Save certificate record
//     const certificate = await Certificate.create({
//       event: eventId,
//       participant: userId,
//       certificateUrl,
//       generatedAt: new Date(),
//       templateUsed: event.certificateTemplate.templateUrl,
//       participantName: participant.name,
//       department: participant.department || "N/A",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Certificate generated successfully",
//       data: {
//         certificateUrl: certificate.certificateUrl,
//         generatedAt: certificate.generatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate certificate",
//       error: error.message,
//     });
//   }
// };


// export const generateCertificate = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const userId = req.user._id;

//     console.log('Generate certificate request:', { eventId, userId });

//     // Get event details
//     const event = await Event.findById(eventId).populate("createdBy", "name");
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found" 
//       });
//     }

//     // Check if template is uploaded
//     if (!event.certificateTemplate || !event.certificateTemplate.templateUrl) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Certificate template not available for this event" 
//       });
//     }

//     // Check if certificates are enabled (uncomment if needed)
//     // if (!event.certificatesEnabled) {
//     //   return res.status(400).json({ 
//     //     success: false, 
//     //     message: "Certificates are not enabled for this event yet" 
//     //   });
//     // }

//     // Check if participant attended the event
//     const attendance = await Attendance.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
    
//     if (!attendance) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "You must attend the event to receive a certificate" 
//       });
//     }

//     // Check if certificate already generated
//     const existingCertificate = await Certificate.findOne({ 
//       event: eventId, 
//       participant: userId 
//     });
    
//     if (existingCertificate) {
//       console.log('Certificate already exists:', existingCertificate.certificateUrl);
//       return res.status(200).json({
//         success: true,
//         message: "Certificate already generated",
//         data: {
//           certificateUrl: existingCertificate.certificateUrl,
//           generatedAt: existingCertificate.generatedAt,
//         },
//       });
//     }

//     // Get participant details
//     const participant = req.user;
    
//     console.log('Generating new certificate for:', participant.name);

//     // Generate PDF certificate
//     const certificateUrl = await generateCertificatePDF(
//       event.certificateTemplate.templateUrl,
//       participant.name,
//       participant.department || "N/A",
//       event.certificateTemplate.coordinatesConfig,
//       event.title
//     );

//     console.log('Certificate generated:', certificateUrl);

//     // Save certificate record
//     const certificate = await Certificate.create({
//       event: eventId,
//       participant: userId,
//       certificateUrl,
//       generatedAt: new Date(),
//       templateUsed: event.certificateTemplate.templateUrl,
//       participantName: participant.name,
//       department: participant.department || "N/A",
//     });

//     console.log('Certificate record saved:', certificate._id);

//     res.status(201).json({
//       success: true,
//       message: "Certificate generated successfully",
//       data: {
//         certificateUrl: certificate.certificateUrl,
//         generatedAt: certificate.generatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate certificate",
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };


export const generateCertificate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    console.log('Generate certificate request:', { eventId, userId });

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    // Check if template is uploaded
    if (!event.certificateTemplate || !event.certificateTemplate.templateUrl) {
      return res.status(400).json({ 
        success: false, 
        message: "Certificate template not available for this event" 
      });
    }

    // Check if participant attended the event
    const attendance = await Attendance.findOne({ 
      event: eventId, 
      participant: userId 
    });
    
    if (!attendance) {
      return res.status(403).json({ 
        success: false, 
        message: "You must attend the event to receive a certificate" 
      });
    }

    // Check if certificate already generated
    const existingCertificate = await Certificate.findOne({ 
      event: eventId, 
      participant: userId 
    });
    
    if (existingCertificate) {
      console.log('Certificate already exists:', existingCertificate.certificateUrl);
      return res.status(200).json({
        success: true,
        message: "Certificate already generated",
        data: {
          certificateUrl: existingCertificate.certificateUrl,
          generatedAt: existingCertificate.generatedAt,
        },
      });
    }

    // Get participant details
    const participant = req.user;
    
    console.log('Generating new certificate for:', participant.name);

    // Generate PDF certificate and upload to Cloudinary
    const certificateUrl = await generateCertificatePDF(
      event.certificateTemplate.templateUrl,
      participant.name,
      participant.department || "N/A",
      event.certificateTemplate.coordinatesConfig,
      event.title
    );

    console.log('Certificate generated:', certificateUrl);

    // Save certificate record
    const certificate = await Certificate.create({
      event: eventId,
      participant: userId,
      certificateUrl,
      generatedAt: new Date(),
      templateUsed: event.certificateTemplate.templateUrl,
      participantName: participant.name,
      department: participant.department || "N/A",
    });

    console.log('Certificate record saved:', certificate._id);

    res.status(201).json({
      success: true,
      message: "Certificate generated successfully",
      data: {
        certificateUrl: certificate.certificateUrl,
        generatedAt: certificate.generatedAt,
      },
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate certificate",
      error: error.message,
    });
  }
};

// Just get certificate status/URL
export const getCertificateStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    const attendance = await Attendance.findOne({ 
      event: eventId, 
      participant: userId 
    });
    const certificate = await Certificate.findOne({ 
      event: eventId, 
      participant: userId 
    });

    res.status(200).json({
      success: true,
      data: {
        hasAttended: !!attendance,
        hasTemplate: !!event?.certificateTemplate?.templateUrl,
        certificateGenerated: !!certificate,
        certificateUrl: certificate?.certificateUrl || null,
        generatedAt: certificate?.generatedAt || null,
        canGenerate: !!attendance && !!event?.certificateTemplate?.templateUrl && !certificate,
      },
    });
  } catch (error) {
    console.error("Error checking certificate status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check certificate status",
      error: error.message,
    });
  }
};


// Add download endpoint
export const downloadCertificate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    console.log('Download certificate request:', { eventId, userId });

    // Find the certificate
    const certificate = await Certificate.findOne({ 
      event: eventId, 
      participant: userId 
    }).populate('event', 'title');

    if (!certificate) {
      return res.status(404).json({ 
        success: false, 
        message: "Certificate not found. Please generate it first." 
      });
    }

    console.log('Certificate found, URL:', certificate.certificateUrl);

    // Fetch the PDF from Cloudinary
    const response = await fetch(certificate.certificateUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch certificate: ${response.status}`);
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());
    console.log('Certificate fetched, size:', pdfBuffer.length);

    // Set proper headers for PDF download
    const filename = `certificate-${certificate.event.title.replace(/[^a-z0-9]/gi, '-')}-${certificate.participantName.replace(/[^a-z0-9]/gi, '-')}.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the PDF buffer
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Error downloading certificate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to download certificate",
      error: error.message,
    });
  }
};

/**
 * Get Participant's Certificate for an Event
 * GET /api/events/:eventId/certificates/me
 */
export const getMyCertificate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const certificate = await Certificate.findOne({ 
      event: eventId, 
      participant: userId 
    }).populate("event", "title startDate");

    if (!certificate) {
      return res.status(404).json({ 
        success: false, 
        message: "Certificate not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
      error: error.message,
    });
  }
};

/**
 * Check Certificate Eligibility
 * GET /api/events/:eventId/certificates/check-eligibility
 */
export const checkCertificateEligibility = async (req, res) => {
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

    // Check attendance
    const attendance = await Attendance.findOne({ 
      event: eventId, 
      participant: userId 
    });

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ 
      event: eventId, 
      participant: userId 
    });

    const hasTemplate = event.certificateTemplate?.templateUrl ? true : false;
    const isEnabled = event.certificatesEnabled;

    res.status(200).json({
      success: true,
      data: {
        hasAttended: !!attendance,
        hasTemplate,
        certificatesEnabled: isEnabled,
        alreadyGenerated: !!existingCertificate,
        canGenerate: !!attendance && hasTemplate && isEnabled && !existingCertificate,
        certificateUrl: existingCertificate?.certificateUrl || null
      },
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check eligibility",
      error: error.message,
    });
  }
};

/**
 * Toggle Certificates Enable/Disable
 * PATCH /api/events/:eventId/certificates/toggle
 * Only organizers can toggle
 */
export const toggleCertificates = async (req, res) => {
  try {
    const event = req.event; // From middleware
    const { certificatesEnabled } = req.body;

    if (!event.certificateTemplate?.templateUrl) {
      return res.status(400).json({
        success: false,
        message: "Cannot enable certificates without uploading a template first"
      });
    }

    event.certificatesEnabled = certificatesEnabled;
    await event.save();

    res.status(200).json({
      success: true,
      message: `Certificates ${certificatesEnabled ? "enabled" : "disabled"} successfully`,
      data: { certificatesEnabled: event.certificatesEnabled },
    });
  } catch (error) {
    console.error("Error toggling certificates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle certificates",
      error: error.message,
    });
  }
};

/**
 * Get Certificate Template Info
 * GET /api/events/:eventId/certificate-template
 */
export const getCertificateTemplate = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId).select('certificateTemplate certificatesEnabled');
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: {
        hasTemplate: event.certificateTemplate?.templateUrl ? true : false,
        templateUrl: event.certificateTemplate?.templateUrl || null,
        coordinatesConfig: event.certificateTemplate?.coordinatesConfig || null,
        uploadedAt: event.certificateTemplate?.uploadedAt || null,
        certificatesEnabled: event.certificatesEnabled
      },
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
      error: error.message,
    });
  }
};

/**
 * Get All Certificates for an Event (Organizer only)
 * GET /api/events/:eventId/certificates/all
 */
export const getAllEventCertificates = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const certificates = await Certificate.find({ event: eventId })
      .populate("participant", "name email department")
      .sort({ generatedAt: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
      error: error.message,
    });
  }
};

/**
 * Helper function to generate PDF certificate
 */
// async function generateCertificatePDF(templateUrl, name, department, config, eventTitle) {
//   try {
//     // Fetch the template image
//     const templateResponse = await fetch(templateUrl);
//     const templateBuffer = await templateResponse.arrayBuffer();

//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([842, 595]); // A4 landscape

//     // Embed the template image
//     let templateImage;
//     if (templateUrl.toLowerCase().endsWith('.png')) {
//       templateImage = await pdfDoc.embedPng(templateBuffer);
//     } else {
//       templateImage = await pdfDoc.embedJpg(templateBuffer);
//     }

//     // Draw the template as background
//     const { width, height } = page.getSize();
//     page.drawImage(templateImage, {
//       x: 0,
//       y: 0,
//       width: width,
//       height: height,
//     });

//     // Embed font
//     const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Convert hex color to RGB
//     const hexToRgb = (hex) => {
//       const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//       return result ? {
//         r: parseInt(result[1], 16) / 255,
//         g: parseInt(result[2], 16) / 255,
//         b: parseInt(result[3], 16) / 255,
//       } : { r: 0, g: 0, b: 0 };
//     };

//     // Draw participant name
//     const nameColor = hexToRgb(config.name.color);
//     page.drawText(name, {
//       x: config.name.x,
//       y: height - config.name.y,
//       size: config.name.fontSize,
//       font: font,
//       color: rgb(nameColor.r, nameColor.g, nameColor.b),
//     });

//     // Draw department
//     const deptColor = hexToRgb(config.department.color);
//     page.drawText(department, {
//       x: config.department.x,
//       y: height - config.department.y,
//       size: config.department.fontSize,
//       font: regularFont,
//       color: rgb(deptColor.r, deptColor.g, deptColor.b),
//     });

//     // Serialize the PDF to bytes
//     const pdfBytes = await pdfDoc.save();

//     // Upload PDF to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "event-certificates/generated",
//           resource_type: "raw",
//           format: "pdf",
//           public_id: `cert_${Date.now()}_${name.replace(/\s+/g, '_')}`,
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       uploadStream.end(Buffer.from(pdfBytes));
//     });

//     return uploadResult.secure_url;
//   } catch (error) {
//     console.error("Error in generateCertificatePDF:", error);
//     throw error;
//   }
// }

async function generateCertificatePDF(templateUrl, name, department, config, eventTitle) {
  try {
    console.log('Starting PDF generation...');
    console.log('Template URL:', templateUrl);
    
    // Fetch the template image
    const templateResponse = await fetch(templateUrl);
    if (!templateResponse.ok) {
      throw new Error(`Failed to fetch template: ${templateResponse.status}`);
    }
    
    const templateBuffer = Buffer.from(await templateResponse.arrayBuffer());
    console.log('Template downloaded, size:', templateBuffer.length);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape

    // Embed the template image based on file type
    let templateImage;
    const lowerUrl = templateUrl.toLowerCase();
    
    try {
      if (lowerUrl.includes('.png') || lowerUrl.includes('image/png')) {
        templateImage = await pdfDoc.embedPng(templateBuffer);
      } else if (lowerUrl.includes('.jpg') || lowerUrl.includes('.jpeg') || lowerUrl.includes('image/jpeg')) {
        templateImage = await pdfDoc.embedJpg(templateBuffer);
      } else {
        // Try PNG first, then JPG
        try {
          templateImage = await pdfDoc.embedPng(templateBuffer);
        } catch (pngError) {
          console.log('Not PNG, trying JPG...');
          templateImage = await pdfDoc.embedJpg(templateBuffer);
        }
      }
    } catch (embedError) {
      console.error('Error embedding image:', embedError);
      throw new Error('Failed to embed template image. Please ensure it is a valid PNG or JPG file.');
    }

    console.log('Template image embedded successfully');

    // Draw the template as background
    const { width, height } = page.getSize();
    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Convert hex color to RGB
    const hexToRgb = (hex) => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Handle 3-digit hex codes
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      
      const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      
      if (!result) {
        console.warn('Invalid hex color:', hex, 'using black');
        return { r: 0, g: 0, b: 0 };
      }
      
      return {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      };
    };

    // Draw participant name
    const nameColor = hexToRgb(config.name.color || '#000000');
    const nameFont = boldFont;
    const nameSize = config.name.fontSize || 40;
    const nameX = config.name.x || 421; // Center of 842
    const nameY = height - (config.name.y || 300); // Flip Y coordinate

    console.log('Drawing name:', name, 'at', nameX, nameY);
    
    page.drawText(name, {
      x: nameX - (nameFont.widthOfTextAtSize(name, nameSize) / 2), // Center text
      y: nameY,
      size: nameSize,
      font: nameFont,
      color: rgb(nameColor.r, nameColor.g, nameColor.b),
    });

    // Draw department if provided
    if (department && department !== 'N/A') {
      const deptColor = hexToRgb(config.department.color || '#000000');
      const deptFont = regularFont;
      const deptSize = config.department.fontSize || 30;
      const deptX = config.department.x || 421;
      const deptY = height - (config.department.y || 250);

      console.log('Drawing department:', department, 'at', deptX, deptY);
      
      page.drawText(department, {
        x: deptX - (deptFont.widthOfTextAtSize(department, deptSize) / 2),
        y: deptY,
        size: deptSize,
        font: deptFont,
        color: rgb(deptColor.r, deptColor.g, deptColor.b),
      });
    }

    // Serialize the PDF to bytes
    console.log('Saving PDF...');
    const pdfBytes = await pdfDoc.save();
    console.log('PDF generated, size:', pdfBytes.length);

    // Upload PDF to Cloudinary
    console.log('Uploading to Cloudinary...');
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "event-certificates/generated",
          resource_type: "raw",
          format: "pdf",
          public_id: `cert_${Date.now()}_${name.replace(/\s+/g, '_')}`,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Upload successful:', result.secure_url);
            resolve(result);
          }
        }
      );
      
      // Create a readable stream from the buffer
      streamifier.createReadStream(Buffer.from(pdfBytes)).pipe(uploadStream);
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error in generateCertificatePDF:", error);
    throw error;
  }
}