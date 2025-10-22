import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkInTime: { type: Date, default: Date.now },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // scanned by whom
});

attendanceSchema.index({ event: 1, participant: 1 }, { unique: true });
 

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
