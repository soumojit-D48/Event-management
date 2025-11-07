// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // // Example fetchAuthSession replacement for cookie-based auth
// // // If using token in cookie, you can remove Authorization header
// // const fetchAuthSession = async () => {
// //   return { tokens: { idToken: null } }; // dummy function
// // };

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL,
//     // prepareHeaders: async (headers) => {
//     //   const session = await fetchAuthSession();
//     //   const { idToken } = session.tokens ?? {};
//     //   if (idToken) {
//     //     headers.set("Authorization", `Bearer ${idToken}`);
//     //   }
//     //   return headers;
//     // },

//     credentials: "include", // sends cookies automatically
//   }),
//   tagTypes: ["Managers", "Tenants", "Properties", "Leases", "Payments", "Applications"],
//   endpoints: (build) => ({

//     getEvents: build.query({
//       query: () => "/events",
//       providesTags: ["Events"],
//     }),
//     registerEvent: build.mutation({
//       query: (data) => ({
//         url: "/registrations",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Events", "Registrations"],
//     }),

//   }),
// });

// export const { 
//     useGetEventsQuery, 
//     useRegisterEventMutation,

// } = api;




// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL, // your backend URL
//     credentials: "include", // important! sends cookies automatically
//   }),
//   tagTypes: ["Auth", "Users", "Events", "Registrations"],
//   endpoints: (builder) => ({
//     // Login (sends email/password, backend sets cookie)
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     // Logout (backend clears cookie)
//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     // Check if user is authenticated
//     isAuth: builder.query({
//       query: () => "/auth/is-auth",
//       providesTags: ["Auth"],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useIsAuthQuery,
// } = api;








import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ // http://localhost:3000
    // baseUrl: import.meta.env.VITE_API_BASE_URL,
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth", "Users", "Profile", "PendingRequests", "Events", "Registrations", "Attendance", "Budget", "Certificates", "Feedback"],
  endpoints: (builder) => ({
    // ========== AUTH ENDPOINTS ==========

    // Register new user
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // This clears ALL cached data
          dispatch(api.util.resetApiState());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),

    // Check authentication status
    isAuth: builder.query({
      query: () => "/auth/is-auth",
      providesTags: ["Auth"],
    }),

    // Send OTP for password reset
    sendResetOtp: builder.mutation({ // pending
      query: (email) => ({
        url: "/auth/send-reset-otp",
        method: "POST",
        body: email, // { email: "user@example.com" }
      }),
    }),

    // Reset password with OTP
    resetPassword: builder.mutation({ // pending
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData, // { email, otp, newPassword }
      }),
    }),

    // ========== USER ENDPOINTS ==========

    // Get user profile
    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),

    // Update user profile
    updateProfile: builder.mutation({ //pending
      query: (profileData) => ({
        url: "/user/profile",
        method: "PUT",
        body: profileData, // { name, phone, department, etc }
      }),
      invalidatesTags: ["Profile"],
    }),

    // Request role upgrade (organizer, faculty, volunteer)
    requestRole: builder.mutation({ // pending
      query: (roleData) => ({
        url: "/user/request-role",
        method: "POST",
        body: roleData, // { requestedRole: "organizer" }
      }),
      invalidatesTags: ["Profile"],
    }),

    // admin endpoints

    // ========== ADMIN ENDPOINTS ==========

    getPendingRequests: builder.query({
      query: () => ({
        url: "/admin/pending-requests",
        method: "GET",
      }),
      providesTags: ["PendingRequests"],
    }),

    // Approve user role request
    approveRole: builder.mutation({
      query: (userId) => ({
        url: `/admin/approve-role/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["PendingRequests", "Users"],
    }),

    // Reject user role request
    rejectRole: builder.mutation({
      query: (userId) => ({
        url: `/admin/reject-role/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["PendingRequests", "Users"],
    }),


    // ========== USER MANAGEMENT ==========

    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // Update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),




    // ======== EVENT ENDPOINTS ========

    // ✅ Get all events (public)
    getAllEvents: builder.query({
      query: () => "/events/all",
      providesTags: ["Events"],
    }),

    // ✅ Get event by ID
    getEventById: builder.query({
      query: (eventId) => `/events/${eventId}`,
      providesTags: (result, error, id) => [{ type: "Events", id }],
    }),

    // ✅ Get event team by ID
    getEventTeam: builder.query({
      query: (eventId) => `/events/${eventId}/team`,
      providesTags: (result, error, id) => [{ type: "Events", id }],
    }), // not needed cause in event details we are fetching team details

    // ✅ Get events created by the current organizer
    getMyEvents: builder.query({
      query: () => "/events/my/created",
      providesTags: ["Events"],
    }),

    // ✅ Get events the current user manages
    getEventsIManage: builder.query({
      query: () => "/events/my/managing",
      providesTags: ["Events"],
    }), // later // coor, vol

    // ✅ Create new event (admin or organizer only)
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: "/events/create",
        method: "POST",
        body: eventData,
        formData: true,
      }),
      invalidatesTags: ["Events"],
    }),

    // ✅ Update existing event
    updateEvent: builder.mutation({
      query: ({ eventId, eventData }) => ({
        url: `/events/update/${eventId}`,
        method: "PUT",
        body: eventData,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Events", id: eventId },
      ],
    }),

    // ✅ Delete event
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/events/delete/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),

    // ✅ Organizer management
    // addOrganizer: builder.mutation({
    //   query: ({ eventId, organizers }) => ({
    //     url: `/events/${eventId}/organizers`,
    //     method: "POST",
    //     body: { organizers },
    //   }),
    //   invalidatesTags: ["Events"],
    // }),

    addOrganizerEmail: builder.mutation({
      query: ({ eventId, email }) => ({
        url: `/events/${eventId}/organizers`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Events"],
    }),

    removeOrganizer: builder.mutation({
      query: ({ eventId, organizerId }) => ({
        url: `/events/${eventId}/organizers/${organizerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),

    // // ✅ Coordinator management
    // addCoordinator: builder.mutation({
    //   query: ({ eventId, coordinators }) => ({
    //     url: `/events/${eventId}/coordinators`,
    //     method: "POST",
    //     body: { coordinators },
    //   }),
    //   invalidatesTags: ["Events"],
    // }),
    // removeCoordinator: builder.mutation({
    //   query: ({ eventId, coordinatorId }) => ({
    //     url: `/events/${eventId}/coordinators/${coordinatorId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Events"],
    // }),

    // // ✅ Volunteer management
    // addVolunteer: builder.mutation({
    //   query: ({ eventId, volunteers }) => ({
    //     url: `/events/${eventId}/volunteers`,
    //     method: "POST",
    //     body: { volunteers },
    //   }),
    //   invalidatesTags: ["Events"],
    // }),
    // removeVolunteer: builder.mutation({
    //   query: ({ eventId, volunteerId }) => ({
    //     url: `/events/${eventId}/volunteers/${volunteerId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Events"],
    // }),


    // Add these mutations to your RTK Query API slice

    // For adding coordinator by email (matching organizer pattern)
    addCoordinatorByEmail: builder.mutation({
      query: ({ eventId, email }) => ({
        url: `/events/${eventId}/coordinators`,
        method: "POST",
        body: { email },
      }),
      // invalidatesTags: (result, error, { eventId }) => [
      //   { type: "Events", id: eventId },
      // ],
      invalidatesTags: ["Events"],
    }),

    // For removing coordinator
    removeCoordinator: builder.mutation({
      query: ({ eventId, coordinatorId }) => ({
        url: `/events/${eventId}/coordinators/${coordinatorId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Events", id: eventId },
      ],
    }),

    // For adding volunteer by email (matching organizer pattern)
    addVolunteerByEmail: builder.mutation({
      query: ({ eventId, email }) => ({
        url: `/events/${eventId}/volunteers`,
        method: "POST",
        body: { email },
      }),
      // invalidatesTags: (result, error, { eventId }) => [
      //   { type: "Events", id: eventId },
      // ],
      invalidatesTags: ["Events"],
    }),

    // For removing volunteer
    removeVolunteer: builder.mutation({
      query: ({ eventId, volunteerId }) => ({
        url: `/events/${eventId}/volunteers/${volunteerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Events", id: eventId },
      ],
    }),

    // ✅ Session management
    manageSessions: builder.mutation({
      query: ({ eventId, sessions }) => ({
        url: `/events/${eventId}/sessions`,
        method: "PUT",
        body: { sessions },
      }),
      invalidatesTags: ["Events"],
    }),


    // ================= REGISTRATION ENDPOINTS =================

    // ✅ Register for an event
    registerForEvent: builder.mutation({
      query: ({ eventId, data }) => ({
        url: `/registrations/register/${eventId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registrations"],
    }),

    // ✅ Get all registrations of logged-in user
    getMyRegistrations: builder.query({
      query: () => "/registrations/my-registrations",
      providesTags: ["Registrations"],
    }),

    // ✅ Get single registration by ID
    getRegistrationById: builder.query({
      query: (id) => `/registrations/${id}`,
      providesTags: ["Registrations"],
    }), // dont need for now

    // ✅ Cancel registration
    cancelRegistration: builder.mutation({
      query: (id) => ({
        url: `/registrations/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Registrations"],
    }),


    // query: (eventId) => `/registrations/event/${eventId}`,
    // ✅ Get all registrations for an event (admin, organizer, faculty)
    getEventRegistrations: builder.query({ // /event/:eventId/registrations
      query: (eventId) => `/registrations/event/${eventId}/registrations`,
      providesTags: ["Registrations"],
    }), // admin, organizer, faculty




    // budget

    getBudget: builder.query({
      query: (eventId) => `/budget/${eventId}`,
      providesTags: (result, error, eventId) => [
        { type: "Budget", id: eventId }
      ],
    }),

    // Get budget analytics
    getBudgetAnalytics: builder.query({
      query: (eventId) => `/budget/${eventId}/analytics`,
      providesTags: (result, error, eventId) => [
        { type: "Budget", id: `${eventId}-analytics` }
      ],
    }),

    // Update allocated budget
    updateAllocatedBudget: builder.mutation({
      query: ({ eventId, allocated }) => ({
        url: `/budget/${eventId}/allocated`,
        method: "PUT",
        body: { allocated },
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Budget", id: eventId },
        { type: "Budget", id: `${eventId}-analytics` },
      ],
    }),

    // Add expense
    addExpense: builder.mutation({
      query: ({ eventId, expenseData }) => ({
        url: `/budget/${eventId}/expense`,
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Budget", id: eventId },
        { type: "Budget", id: `${eventId}-analytics` },
      ],
    }),

    // Update expense
    updateExpense: builder.mutation({
      query: ({ eventId, expenseId, expenseData }) => ({
        url: `/budget/${eventId}/expense/${expenseId}`,
        method: "PUT",
        body: expenseData,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Budget", id: eventId },
        { type: "Budget", id: `${eventId}-analytics` },
      ],
    }),

    // Delete expense
    deleteExpense: builder.mutation({
      query: ({ eventId, expenseId }) => ({
        url: `/budget/${eventId}/expense/${expenseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Budget", id: eventId },
        { type: "Budget", id: `${eventId}-analytics` },
      ],
    }),


    // ========== ATTENDANCE ENDPOINTS ==========

    // Mark attendance (scan QR code)
    markAttendance: builder.mutation({
      query: ({ eventId, registrationId }) => ({
        url: `/attendance/mark/${eventId}`,
        method: "POST",
        body: { registrationId },
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Get all participants with attendance status for an event
    getEventParticipants: builder.query({
      query: (eventId) => `/attendance/event/${eventId}/participants`,
      providesTags: ["Attendance"],
    }),

    // Get attendance details for a specific participant
    getParticipantAttendance: builder.query({
      query: (registrationId) => `/attendance/participant/${registrationId}`,
      providesTags: ["Attendance"],
    }),

    // Get all attendance records for an event
    getEventAttendance: builder.query({
      query: (eventId) => `/attendance/event/${eventId}/attendance`,
      providesTags: ["Attendance"],
    }),

    // Export attendance report for an event
    exportAttendanceReport: builder.query({
      query: (eventId) => `/attendance/event/${eventId}/export`,
      providesTags: ["Attendance"],
    }),



    // ========== FEEDBACK ENDPOINTS ==========

    checkFeedbackEligibility: builder.query({
      query: (eventId) => `/feedback/check-eligibility/${eventId}`,
      providesTags: ["Feedback"],
    }),

    // Submit feedback
    submitFeedback: builder.mutation({
      query: ({ eventId, data }) => ({
        url: `/feedback/submit/${eventId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    // Get all feedback for an event
    getEventFeedback: builder.query({
      query: (eventId) => `/feedback/event/${eventId}`,
      providesTags: ["Feedback"],
    }),

    // Download feedback as PDF
    downloadFeedbackPDF: builder.query({
      query: (eventId) => ({
        url: `/feedback/download-pdf/${eventId}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `feedback-${eventId}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
          return { success: true };
        },
      }),


      // certificate

      

    }),

    // uploadCertificateTemplate: builder.mutation({
    //     query: ({ eventId, formData }) => ({
    //       url: `/events/${eventId}/certificate-template`,
    //       method: "POST",
    //       body: formData,
    //     }),
    //     invalidatesTags: ["Certificates", "Events"],
    //   }),


    getCertificateTemplate: builder.query({
      query: (eventId) => `/events/${eventId}/certificate-template`,
    }),
    
    // POST template (upload)
    uploadCertificateTemplate: builder.mutation({
      query: ({ eventId, formData }) => ({
        url: `/events/${eventId}/certificate-template`,
        method: 'POST',
        body: formData,
      }),
      // Invalidate the GET query after upload
      invalidatesTags: (result, error, { eventId }) => [
        { type: 'CertificateTemplate', id: eventId }
      ],
    }),

      // Get certificate template info
      getCertificateTemplate: builder.query({
        query: (eventId) => `/events/${eventId}/certificate-template`,
        providesTags: ["Certificates"],
      }),

      // Check certificate eligibility
      checkCertificateEligibility: builder.query({
        query: (eventId) => `/events/${eventId}/certificates/check-eligibility`,
        providesTags: ["Certificates"],
      }),

      // Generate certificate (Participant)
      generateCertificate: builder.mutation({
        query: (eventId) => ({
          url: `/events/${eventId}/certificates/generate`,
          method: "POST",
        }),
        invalidatesTags: ["Certificates"],
      }),

      // Get my certificate
      getMyCertificate: builder.query({
        query: (eventId) => `/events/${eventId}/certificates/me`,
        providesTags: ["Certificates"],
      }),

      // Toggle certificates enabled/disabled (Organizer only)
      toggleCertificates: builder.mutation({
        query: ({ eventId, certificatesEnabled }) => ({
          url: `/events/${eventId}/certificates/toggle`,
          method: "PATCH",
          body: { certificatesEnabled },
        }),
        invalidatesTags: ["Certificates", "Events"],
      }),

      // Get all certificates for event (Organizer only)
      getAllEventCertificates: builder.query({
        query: (eventId) => `/events/${eventId}/certificates/all`,
        providesTags: ["Certificates"],
      }),
  }),
});

  // Export hooks
  export const {
    // Auth hooks
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useIsAuthQuery,
    useSendResetOtpMutation,
    useResetPasswordMutation,

    // User hooks
    useGetProfileQuery,
    useUpdateProfileMutation,
    useRequestRoleMutation,

    // Admin hooks
    useGetPendingRequestsQuery,
    useApproveRoleMutation,
    useRejectRoleMutation,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,

    // event hooks

    useGetAllEventsQuery,
    useGetEventByIdQuery,
    useGetEventTeamQuery,
    useGetMyEventsQuery,
    useGetEventsIManageQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useAddOrganizerMutation,
    useRemoveOrganizerMutation,
    useAddCoordinatorMutation,
    useRemoveCoordinatorMutation,
    useAddVolunteerMutation,
    useRemoveVolunteerMutation,
    useManageSessionsMutation,

    // registration hooks

    useRegisterForEventMutation, // done
    useGetMyRegistrationsQuery,
    useGetRegistrationByIdQuery,
    useCancelRegistrationMutation,
    useGetEventRegistrationsQuery,  // by only organizer, admin

    // budget hooks

    useGetBudgetQuery,
    useGetBudgetAnalyticsQuery,
    useUpdateAllocatedBudgetMutation,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,


    useAddOrganizerEmailMutation,
    useAddCoordinatorByEmailMutation,
    useAddVolunteerByEmailMutation,
    //  useRemoveCoordinatorByIdMutation


    useMarkAttendanceMutation,
    useGetEventParticipantsQuery,
    useGetParticipantAttendanceQuery,
    useGetEventAttendanceQuery,
    useExportAttendanceReportQuery,

    useCheckFeedbackEligibilityQuery,
    useSubmitFeedbackMutation,
    useGetEventFeedbackQuery,
    useDownloadFeedbackPDFQuery,


    useUploadCertificateTemplateMutation,
    useGetCertificateTemplateQuery,
    useCheckCertificateEligibilityQuery,
    useGenerateCertificateMutation,
    useGetMyCertificateQuery,
    useToggleCertificatesMutation,
    useGetAllEventCertificatesQuery,


  } = api;

//  useIsAuthQuery,


















/*

How they work together

Query fetches data → cached with providesTags

Mutation changes data → triggers invalidatesTags

Any queries with matching tags automatically refetch

Diagram (simplified):

[GET /events] --providesTags--> ["Events"]
[GET /registrations] --providesTags--> ["Registrations"]

[POST /register] --invalidatesTags--> ["Events", "Registrations"]
    |
    V
RTK Query automatically refetches GET /events & GET /registrations

*/