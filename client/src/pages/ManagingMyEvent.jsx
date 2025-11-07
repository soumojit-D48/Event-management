// // import { useGetMyEventsQuery, useIsAuthQuery } from '@/state/api'
// // import React from 'react'

// // const ManagingMyEvent = () => {
// //     const {data: eventData} = useGetMyEventsQuery()
// //     const {data: userData} = useIsAuthQuery()

// //     console.log(eventData, "my events");
// //     console.log(userData, "user");

// //   return (
// //     <div>ManagingMyEvent</div>
// //   )
// // }

// // export default ManagingMyEvent



// import { useState } from "react";
// import { Calendar, MapPin, Users, Edit, Trash2, Plus, ArrowLeft, Users2 } from "lucide-react";
// import { useDeleteEventMutation, useGetMyEventsQuery, useIsAuthQuery } from "@/state/api";
// import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
// import { Link } from "react-router-dom";

// const MyEvents = () => {
//   const [deleteConfirm, setDeleteConfirm] = useState(null);

//   // Replace with: const { data: authData } = useIsAuthQuery();
// //   const authData = {
// //     success: true,
// //     user: {
// //       email: "user77@gmail.com",
// //       id: "68ea59019df53bc6eeda9ae9",
// //       isAccountVerified: true,
// //       isApproved: true,
// //       name: "user77",
// //       requestedRole: null,
// //       role: "organizer"
// //     }
// //   };

//     const { data: authData } = useIsAuthQuery();
//     const { data: eventData } = useGetMyEventsQuery();
//     const [ deleteEventMutation, {isLoading, isError}]  = useDeleteEventMutation();
// //   const eventData = {
// //     success: true,
// //     count: 2,
// //     events: [
// //       {
// //         _id: "68ec9e1f01c680cdde34f08b",
// //         title: "Tech Symposium 2025",
// //         description: "test with sessiontest with sessiontest with session",
// //         venue: "test with session",
// //         startDate: "2025-10-13T06:36:00.000Z",
// //         endDate: null,
// //         bannerUrl: "https://res.cloudinary.com/dokuty06j/image/upload/v1760337438/xnx5plv6mc2idjpnp1u5.jpg",
// //         currentParticipants: 45,
// //         maxParticipants: 100,
// //         sessions: [
// //           {
// //             _id: "68ec9e1f01c680cdde34f08c",
// //             title: "test with sessiontest with session",
// //             speaker: "test with session",
// //             startTime: "2025-10-13T08:37:00.000Z",
// //             endTime: "2025-10-13T10:37:00.000Z"
// //           }
// //         ],
// //         createdBy: [
// //           {
// //             _id: "68ea59019df53bc6eeda9ae9",
// //             name: "user77",
// //             email: "user77@gmail.com"
// //           }
// //         ],
// //         coordinators: [],
// //         volunteers: [],
// //         createdAt: "2025-10-13T06:37:19.386Z",
// //         updatedAt: "2025-10-13T06:37:19.386Z"
// //       },
// //       {
// //         _id: "68ec9e1f01c680cdde34f09b",
// //         title: "Campus Hackathon 2025",
// //         description: "24-hour coding competition with prizes",
// //         venue: "Innovation Hub",
// //         startDate: "2025-11-20T08:00:00.000Z",
// //         endDate: "2025-11-21T08:00:00.000Z",
// //         bannerUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
// //         currentParticipants: 150,
// //         maxParticipants: 200,
// //         sessions: [
// //           {
// //             _id: "68ec9e1f01c680cdde34f09c",
// //             title: "Opening Ceremony",
// //             speaker: "Event Team",
// //             startTime: "2025-11-20T08:00:00.000Z",
// //             endTime: "2025-11-20T09:00:00.000Z"
// //           }
// //         ],
// //         createdBy: [
// //           {
// //             _id: "68ea59019df53bc6eeda9ae9",
// //             name: "user77",
// //             email: "user77@gmail.com"
// //           }
// //         ],
// //         coordinators: [],
// //         volunteers: [],
// //         createdAt: "2025-10-13T06:37:19.386Z",
// //         updatedAt: "2025-10-13T06:37:19.386Z"
// //       }
// //     ]
// //   };

//   const currentUser = authData?.user;
//   console.log(currentUser);
  
//   const events = eventData?.events || [];

//   // Check if user is one of the organizers of the event
//   const isEventOrganizer = (event) => {
//     return event.createdBy?.some(organizer => organizer._id === currentUser?.id);
//   };

//   // Filter only events where current user is an organizer
//   const myEvents = events.filter(isEventOrganizer);

//   const handleDelete = (eventId) => {
//     deleteEventMutation(eventId);
//     // console.log("Deleting event:", eventId);
//     setDeleteConfirm(null);
//   };

//   const handleEdit = (eventId) => {
//     // Redirect to edit page
//     window.location.href = `/events/update/${eventId}`;
//   };

//   const handleManageTeam = (eventId) => {
//     // TODO: Navigate to manage team page
//     // console.log("Managing team for event:", eventId);

//     window.location.href = `/events/${eventId}/team`;
//   };

//   if(currentUser?.role !== "organizer") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
//           <p className="text-gray-600 mb-6">You need to be an organizer to view this page.</p>  
            
//             </div>
//             </div>
//         )
//     }

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//       {/* Header */}
//       {/* <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => window.history.back()}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-700" />
//               </button>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 My Created Events
//               </h1>
//             </div>
//             <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-200 flex items-center gap-2 transition">
//               <Plus className="h-4 w-4" />
//               Create Event
//             </button>
//           </div>
//         </div>
//       </header> */}

//       <section className="container mx-auto px-4 py-12">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Events You Organize
//           </h2>
//           <p className="text-gray-600">
//             Manage and track all events you've created
//           </p>
//         </div>

//         {myEvents.length === 0 ? (
//           <div className="border-2 border-dashed border-gray-300 shadow-none rounded-lg">
//             <div className="flex flex-col items-center justify-center py-16 px-4">
//               <Calendar className="h-16 w-16 text-gray-300 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No events yet
//               </h3>
//               <p className="text-gray-500 mb-6 text-center">
//                 Create your first event to get started
//               </p>
//               <Link to={'/create-event'}>
//               <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition">
//                 <Plus className="h-4 w-4" />
//                 Create Event
//               </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {myEvents.map((event) => (
//               <div
//                 key={event._id}
//                 className="overflow-hidden border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all rounded-lg bg-white"
//               >
//                 <div className="relative h-40 overflow-hidden bg-gray-200">
//                   {event.bannerUrl ? (
//                     <img
//                       src={event.bannerUrl}
//                       alt={event.title}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center">
//                       <Calendar className="h-12 w-12 text-white/50" />
//                     </div>
//                   )}
//                   <div className="absolute top-3 right-3">
//                     <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
//                       Organizer
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {event.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {event.description}
//                   </p>

//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Calendar className="h-4 w-4 text-purple-600" />
//                       <span>{new Date(event.startDate).toLocaleDateString()}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                       <span>{event.venue}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Users className="h-4 w-4 text-purple-600" />
//                       <span>
//                         {event.currentParticipants}
//                         {event.maxParticipants > 0 && ` / ${event.maxParticipants}`} participants
//                       </span>
//                     </div>
//                     <div className="flex gap-2 flex-wrap">
//                       <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
//                         {event.sessions?.length || 0} Sessions
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-100 p-4 flex gap-2">
//                   <button className="flex-1 px-3 py-2 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700 font-medium rounded-lg transition">
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => handleManageTeam(event._id)}
//                     className="px-3 py-2 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-600 rounded-lg transition"
//                     title="Manage Team"
//                   >
//                     <Users2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleEdit(event._id)}
//                     className="px-3 py-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 rounded-lg transition"
//                     title="Edit Event"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => setDeleteConfirm(event._id)}
//                     className="px-3 py-2 border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition"
//                     title="Delete Event"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>

//                 {/* Delete Confirmation Modal */}
//                 {deleteConfirm === event._id && (
//                   <div className="border-t border-gray-100 bg-red-50 p-4">
//                     <p className="text-sm text-gray-700 mb-3">
//                       Are you sure you want to delete this event?
//                     </p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleDelete(event._id)}
//                         className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => setDeleteConfirm(null)}
//                         className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//     </DashboardLayout>
//   );
// };

// export default MyEvents;






























import { useState } from "react";
import { Calendar, MapPin, Users, Edit, Trash2, Plus, ArrowLeft, Users2, DollarSign } from "lucide-react";
import { useDeleteEventMutation, useGetMyEventsQuery, useIsAuthQuery } from "@/state/api";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const { data: authData } = useIsAuthQuery();
  const { data: eventData } = useGetMyEventsQuery();
  const [deleteEventMutation, {isLoading, isError}] = useDeleteEventMutation();

  const currentUser = authData?.user;
  const events = eventData?.events || [];

  // Check if user is one of the organizers of the event
  const isEventOrganizer = (event) => {
    return event.createdBy?.some(organizer => organizer._id === currentUser?.id);
  };

  // Filter only events where current user is an organizer
  const myEvents = events.filter(isEventOrganizer);

  const handleDelete = (eventId) => {
    deleteEventMutation(eventId);
    setDeleteConfirm(null);
  };

  const handleEdit = (eventId) => {
    navigate(`/events/update/${eventId}`);
  };

  const handleManageTeam = (eventId) => {
    navigate(`/events/${eventId}/team`);
  };

  const handleBudget = (eventId) => {
    navigate(`/events/${eventId}/budget`);
  };

  if(currentUser?.role !== "organizer") {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to be an organizer to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Events You Organize
            </h2>
            <p className="text-gray-600">
              Manage and track all events you've created
            </p>
          </div>

          {myEvents.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 shadow-none rounded-lg">
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No events yet
                </h3>
                <p className="text-gray-500 mb-6 text-center">
                  Create your first event to get started
                </p>
                <Link to={'/create-event'}>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition">
                    <Plus className="h-4 w-4" />
                    Create Event
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myEvents.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all rounded-lg bg-white"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    {event.bannerUrl ? (
                      <img
                        src={event.bannerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Organizer
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span>
                          {event.currentParticipants}
                          {event.maxParticipants > 0 && ` / ${event.maxParticipants}`} participants
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {event.sessions?.length || 0} Sessions
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 p-4 flex gap-2">
                    <Link to={`/events/${event._id}`} className="flex-1">
                      <button className="w-full px-3 py-2 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700 font-medium rounded-lg transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleBudget(event._id)}
                      className="px-3 py-2 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-600 rounded-lg transition"
                      title="Manage Budget"
                    >
                      <DollarSign className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleManageTeam(event._id)}
                      className="px-3 py-2 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-orange-600 rounded-lg transition"
                      title="Manage Team"
                    >
                      <Users2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(event._id)}
                      className="px-3 py-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                      title="Edit Event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event._id)}
                      className="px-3 py-2 border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition"
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Delete Confirmation Modal */}
                  {deleteConfirm === event._id && (
                    <div className="border-t border-gray-100 bg-red-50 p-4">
                      <p className="text-sm text-gray-700 mb-3">
                        Are you sure you want to delete this event?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MyEvents;