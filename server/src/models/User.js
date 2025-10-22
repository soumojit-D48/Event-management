import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "organizer", "faculty", "volunteer", "participant"],
    default: "participant",
  },
  requestedRole: {
    type: String,
    enum: ["organizer", "faculty", "volunteer", null],
    default: null // leter it will be any 3 of them if accept else if any random try to access then he cant he have to join as a participent
  },
  isApproved: { type: Boolean, default: true }, // false for pending requests

    isAccountVerified: {
        type: Boolean,
        default: false // after register it will be true
    },
    resetOtp: { // used to reset the password
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    },

  phone: String, // optional
  department: String, // optional
}, { timestamps: true });

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("User", userSchema);
export default User;









// User (Admin/Organizer/feculty/volentiers/Participant)
// │
// ├── creates → Event (Admin/Organizer can create many events)
// │      ├── hasMany → Session
// │      ├── hasMany → Registration
// │      ├── hasOne → Budget
// │      ├── hasMany → Feedback
// │      ├── hasMany → Attendance
// │      ├── generates → Report, Certificate
// │
// └── participates → Event via Registration
