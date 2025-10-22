import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({

  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  college: {type: String, required: true},
  department: {type: String, required: true},
  studentId: {type: String, required: true},


  registeredAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["registered", "checked-in", "cancelled"], default: "registered" },
  qrCode: String, // store base64 or image URL // QR code (used for check-in) at the event day
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
