import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  title: String,
  speaker: String,

  startTime: { type: Date, required: true }, // full datetime: 2025-10-13T10:00:00
  endTime: { type: Date, required: true },   // full datetime: 2025-10-13T12:00:00

});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  venue: { type: String, required: true },

  // Full datetime, not just date string
    startDate: { type: Date, required: true },
    endDate: { type: Date },

  sessions: [sessionSchema], // multiple objs

  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // organizers
  coordinators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // fecultys
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // volunteers

  bannerUrl: String,
  //Stores the URL of the event banner image (from Cloudinary).

  maxParticipants: { type: Number, default: 0 }, // 0 = no limit anyone can join if organizer choose any number than that event max have that number of participant
  currentParticipants: { type: Number, default: 0 }, // it just tract current numb of particiapnt 

   certificateTemplate: {
    templateUrl: String, // Cloudinary URL
    uploadedAt: Date,
    coordinatesConfig: {
      name: {
        x: Number,
        y: Number,
        fontSize: { type: Number, default: 40 },
        fontFamily: { type: String, default: 'Arial' },
        color: { type: String, default: '#000000' }
      },
      department: {
        x: Number,
        y: Number,
        fontSize: { type: Number, default: 30 },
        fontFamily: { type: String, default: 'Arial' },
        color: { type: String, default: '#000000' }
      }
    }
  },
  
  certificatesEnabled: { type: Boolean, default: false }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;



//   isRecurring: { type: Boolean, default: false }, // If the event happens regularly (weekly/monthly etc.), default is false


/*
Analogy -> feculty and coord

Think of it like this:

A faculty user globally has role = "faculty".

For a particular event, that faculty user is added to coordinators → meaning this faculty is coordinating this event.

So:

Globally (in User DB): faculty

In event context: coordinator
*/