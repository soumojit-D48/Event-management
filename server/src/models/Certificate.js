import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  certificateUrl: String, // PDF or image link
  generatedAt: { type: Date, default: Date.now },
  templateUsed: String, // optional: name/id of template
  participantName: { type: String, required: true },
  department: String
});

certificateSchema.index({ event: 1, participant: 1 }, { unique: true });

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
