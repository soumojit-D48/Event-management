// import * as z from 'zod'

import { z } from "zod";

// Registration form schema
// export const registrationSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(50, "Password too long"),
//   phone: z
//     .string()
//     .optional()
//     .regex(/^\+?\d{10,15}$/, "Invalid phone number"), // optional, but if provided must be valid
//   department: z.string().optional(),
//   requestedRole: z.enum(["organizer", "faculty", "volunteer"]).optional(),
// });


// import { z } from "zod";

// export const registrationSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .max(50, "Password too long"),
//     confirmPassword: z.string(), // added for frontend confirmation
//     phone: z
//       .string()
//       .regex(/^\+?\d{10,15}$/, "Invalid phone number")
//       .optional(),
      
//     department: z.string().optional(),
//     // requestedRole: z.enum(["organizer", "faculty", "volunteer"]).optional(),
//     requestedRole: z
//     .enum(["organizer", "faculty", "volunteer", "participant"])
//     .optional()
//     .default("participant"),
// })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });


export const registrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    
    // Fix phone - allow empty string for optional
    phone: z
      .string()
      .regex(/^\+?\d{10,15}$/, "Invalid phone number")
      .or(z.literal(""))
      .optional(),
      
    department: z.string().optional(),
    
    requestedRole: z
      .enum(["organizer", "faculty", "volunteer", "participant"])
      .optional()
      .default("participant"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],

    });

// Login form schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// export const createEventSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   date: z.string().refine((date) => !isNaN(Date.parse(date)), {
//     message: "Invalid date format",
//   }),
//   location: z.string().min(5, "Location must be at least 5 characters"),
//     capacity: z.number().min(1, "Capacity must be at least 1"),
//     registrationDeadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
//     message: "Invalid date format",
//     }),
//     isPublic: z.boolean().optional().default(true),
//     tags: z.array(z.string()).optional().default([]),
//     coordinators: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")).optional().default([]),
//     volunteers: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")).optional().default([]),

// })


export const sessionSchema = z.object({
  title: z.string().min(1, "Session title is required"),
  speaker: z.string().min(1, "Speaker name is required"),
//   startTime: z.string().datetime({ message: "Invalid start time" }),
//   endTime: z.string().datetime({ message: "Invalid end time" }),

    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  venue: z.string().min(2, "Venue is required"),

//   startDate: z.string(), // .datetime({ message: "Invalid start date" }),
//   endDate: z.string(), // .datetime().optional(),  optional for one-day events

    startDate: z.string().min(1, "Start date is required"), // comes from <input type="date" />
  endDate: z.string().optional(), // optional for single-day event

  sessions: z.array(sessionSchema).optional().default([]),

//   bannerUrl: z.string().url("Invalid banner URL").optional(),

// bannerUrl: z
//   .any()
//   .refine((file) => file instanceof File || file === undefined, {
//     message: "Please upload a valid image file",
//   })
//   .optional(),
banner: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB")
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      "Only .jpg, .jpeg, .png formats are supported"
    )
    .optional(),
  maxParticipants: z
    .number()
    .int("Must be an integer")
    .nonnegative("Cannot be negative")
    .optional()
    .default(0),
});

export const registrationEventSchema = z.object({
  college: z
    .string()
    .min(2, "College name must be at least 2 characters")
    .max(100, "College name is too long"),

  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department name is too long"),

  studentId: z
    .string()
    .min(2, "Student ID must be at least 2 characters")
    .max(50, "Student ID is too long"),

})