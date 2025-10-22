import nodemailer from "nodemailer";
import { REGISTRATION_EMAIL_TEMPLATE } from "../config/emailTemplate.js";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});



export const sendRegistrationEmail = async ({
  to,
  userName,
  eventTitle,
  eventVenue,
  eventStartDate,
  eventEndDate,
  qrCode,
  registrationId,
}) => {
  try {
    const html = REGISTRATION_EMAIL_TEMPLATE
      .replace(/{{userName}}/g, userName)
      .replace(/{{eventTitle}}/g, eventTitle)
      .replace(/{{eventVenue}}/g, eventVenue)
      .replace(/{{eventStartDate}}/g, new Date(eventStartDate).toLocaleString())
      .replace(/{{eventEndDate}}/g, new Date(eventEndDate).toLocaleString())
      .replace(/{{registrationId}}/g, registrationId)
      // ✅ Important: directly insert base64 with prefix
      .replace(/{{qrCode}}/g, qrCode);

    const mailOptions = {
      from: {
        name: "Campus Sync",
        address: process.env.GMAIL_USER,
      },
      to,
      subject: `Registration Confirmed for ${eventTitle} 🎉`,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Registration email sent to", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};


// export const sendRegistrationEmail = async ({

//   to,
//   userName,
//   eventTitle,
//   eventVenue,
//   eventStartDate,
//   eventEndDate,
//   qrCode,
//   registrationId,
// }) => {
//   // Import email template
  

//   // Replace placeholders in template
//   const html = REGISTRATION_EMAIL_TEMPLATE.replace(
//     /{{userName}}/g,
//     userName || "Participant"
//   )
//     .replace(/{{eventTitle}}/g, eventTitle || "Untitled Event")
//     .replace(/{{eventVenue}}/g, eventVenue || "Not Specified")
//     .replace(/{{eventStartDate}}/g, new Date(eventStartDate).toLocaleString())
//     .replace(/{{eventEndDate}}/g, new Date(eventEndDate).toLocaleString())
//     .replace(/{{registrationId}}/g, registrationId)
//     .replace(/{{qrCode}}/g, qrCode);

//   const mailOptions = {
//     from: {
//       name: "Campus Sync",
//       address: process.env.GMAIL_USER,
//     },
//     to,
//     subject: `Registration Confirmed: ${eventTitle}`,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };