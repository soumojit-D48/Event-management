




// import { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, UserPlus, Trash2, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner"; // For notifications
// import Navbar from "@/components/layoutComponents/Navbar";
// import { useGetEventByIdQuery, useAddOrganizerEmailMutation, useRemoveOrganizerMutation, useIsAuthQuery } from "@/state/api"; // Update path

// const ManageTeam = () => {
//   const { id: eventId } = useParams();
//   const navigate = useNavigate();
  
//   // Get current user info
//   const { data: currentUser } = useIsAuthQuery();
//   console.log(currentUser, "current user");
  
  
  
  
//   const [email, setEmail] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState("organizer");

//   // RTK Query hooks
//   const { data: eventData, isLoading, error } = useGetEventByIdQuery(eventId);
//   console.log(eventData, "event data");
//   const [addOrganizerEmail, { isLoading: isAddingOrganizer }] = useAddOrganizerEmailMutation();
//   const [removeOrganizer, { isLoading: isRemovingOrganizer }] = useRemoveOrganizerMutation();

//   // Check access control
//   useEffect(() => {
//     if (eventData && currentUser) {
//       const userRole = getUserRoleInEvent(eventData, currentUser.user.id);
//       console.log("🔍 Access Control Debug:", {
//         currentUserId: currentUser.user.id,
//         eventCreatedBy: eventData.event.createdBy,
//         userRole: userRole,
//         hasAccess: userRole && ["organizer", "coordinator", "volunteer"].includes(userRole),
//       });
      
//       if (!userRole || !["organizer", "coordinator", "volunteer"].includes(userRole)) {
//         navigate(`/events/${eventId}`);
//         toast.error("You don't have permission to manage this team.");
//       }
//     }
//   }, [eventData, currentUser, eventId, navigate]);

//   // Determine user role in event
//   const getUserRoleInEvent = (event, userId) => {
//     if (event.createdBy?.some(o => o._id === userId || o === userId)) return "organizer";
//     if (event.coordinators?.some(c => c._id === userId || c === userId)) return "coordinator";
//     if (event.volunteers?.some(v => v._id === userId || v === userId)) return "volunteer";
//     return null;
//   };

//   const currentUserRole = eventData && currentUser ? getUserRoleInEvent(eventData, currentUser._id) : null;

//   // Check if user can manage a specific role
//   const canManageRole = (targetRole) => {
//     const roleHierarchy = {
//       organizer: ["organizer"],
//       coordinator: ["organizer", "coordinator"],
//       volunteer: ["organizer", "coordinator", "volunteer"],
//     };
//     return roleHierarchy[targetRole]?.includes(currentUserRole);
//   };

//   const handleAddMember = (role) => {
//     if (!canManageRole(role)) {
//       toast.error(`You cannot add ${role}s.`);
//       return;
//     }
//     setCurrentRole(role);
//     setEmail("");
//     setIsDialogOpen(true);
//   };

//   const handleSubmitMember = async () => {
//     if (!email.trim()) {
//       toast.error("Please enter an email address.");
//       return;
//     }

//     try {
//       if (currentRole === "organizer") {
//         await addOrganizerEmail({ eventId, email }).unwrap();
//         toast.success(`${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} added successfully.`);
//       }
//       // Add similar handlers for coordinator and volunteer when mutations are available
      
//       setEmail("");
//       setIsDialogOpen(false);
//     } catch (err) {
//       toast.error(err.data?.message || "Failed to add member.");
//     }
//   };

//   const handleRemoveMember = async (memberId, role) => {
//     if (!canManageRole(role)) {
//       toast.error(`You cannot remove ${role}s.`);
//       return;
//     }

//     try {
//       if (role === "organizer") {
//         await removeOrganizer({ eventId, organizerId: memberId }).unwrap();
//         toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} removed successfully.`);
//       }
//       // Add similar handlers for coordinator and volunteer when mutations are available
//     } catch (err) {
//       toast.error(err.data?.message || "Failed to remove member.");
//     }
//   };

//   const getRoleBadge = (role) => {
//     const styles = {
//       organizer: "bg-purple-600 hover:bg-purple-700 text-white",
//       coordinator: "bg-blue-600 hover:bg-blue-700 text-white",
//       volunteer: "bg-green-600 hover:bg-green-700 text-white",
//     };
//     return styles[role];
//   };

//   const TeamMembersList = ({ members, role, canRemove }) => (
//     <div className="space-y-3">
//       {members?.map((member) => (
//         <div
//           key={member.id}
//           className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-100 hover:border-purple-200 transition-colors"
//         >
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
//               {member.name?.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900">{member.name}</p>
//               <p className="text-sm text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           {canRemove && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => handleRemoveMember(member.id, role)}
//               disabled={isRemovingOrganizer}
//               className="text-red-600 hover:text-red-700 hover:bg-red-50"
//             >
//               {isRemovingOrganizer ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Trash2 className="h-4 w-4" />
//               )}
//             </Button>
//           )}
//         </div>
//       ))}
//       {(!members || members.length === 0) && (
//         <div className="text-center py-8 text-gray-400">
//           No {role}s added yet
//         </div>
//       )}
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100 flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-white" />
//       </div>
//     );
//   }

//   if (error || !eventData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100">
//         <Navbar />
//         <section className="container mx-auto px-4 py-12 max-w-5xl">
//           <Card className="border-2 border-red-200 shadow-xl">
//             <CardContent className="pt-6">
//               <p className="text-red-600">Error loading event data. Please try again.</p>
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100">
//       <Navbar />

//       <section className="container mx-auto px-4 py-12 max-w-5xl">
//         <div className="mb-6 flex items-center gap-3">
//           <Link to={`/events/${eventId}`}>
//             <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//           </Link>
//           <h1 className="text-3xl font-bold text-white">Manage Event Team</h1>
//         </div>

//         <Card className="border-2 border-gray-100 shadow-xl">
//           <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50">
//             <CardTitle className="text-2xl text-gray-900">Team Members</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <Tabs defaultValue="organizers" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 mb-6">
//                 <TabsTrigger
//                   value="organizers"
//                   className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
//                 >
//                   Organizers ({eventData.createdBy?.length || 0})
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="coordinators"
//                   className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
//                 >
//                   Coordinators ({eventData.coordinators?.length || 0})
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="volunteers"
//                   className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
//                 >
//                   Volunteers ({eventData.volunteers?.length || 0})
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="organizers" className="space-y-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-gray-600">Organizers have full control over the event</p>
//                   {canManageRole("organizer") && (
//                     <Button
//                       onClick={() => handleAddMember("organizer")}
//                       className="bg-purple-600 hover:bg-purple-700 text-white"
//                     >
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Add Organizer
//                     </Button>
//                   )}
//                 </div>
//                 <TeamMembersList
//                   members={eventData.createdBy}
//                   role="organizer"
//                   canRemove={canManageRole("organizer")}
//                 />
//               </TabsContent>

//               <TabsContent value="coordinators" className="space-y-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-gray-600">Coordinators help manage volunteers and sessions</p>
//                   {canManageRole("coordinator") && (
//                     <Button
//                       onClick={() => handleAddMember("coordinator")}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Add Coordinator
//                     </Button>
//                   )}
//                 </div>
//                 <TeamMembersList
//                   members={eventData.coordinators}
//                   role="coordinator"
//                   canRemove={canManageRole("coordinator")}
//                 />
//               </TabsContent>

//               <TabsContent value="volunteers" className="space-y-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-gray-600">Volunteers assist with event execution</p>
//                   {canManageRole("volunteer") && (
//                     <Button
//                       onClick={() => handleAddMember("volunteer")}
//                       className="bg-green-600 hover:bg-green-700 text-white"
//                     >
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Add Volunteer
//                     </Button>
//                   )}
//                 </div>
//                 <TeamMembersList
//                   members={eventData.volunteers}
//                   role="volunteer"
//                   canRemove={canManageRole("volunteer")}
//                 />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </section>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-xl">
//               Add {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
//             </DialogTitle>
//             <DialogDescription>
//               Enter the email address of the person you want to add
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="user@college.edu"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="border-2 border-gray-200 focus:border-purple-400"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmitMember}
//               disabled={isAddingOrganizer}
//               className={getRoleBadge(currentRole)}
//             >
//               {isAddingOrganizer ? (
//                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//               ) : (
//                 <UserPlus className="h-4 w-4 mr-2" />
//               )}
//               Add Member
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

    
//     </div>
//   );
// };

// export default ManageTeam;















// import { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, UserPlus, Trash2, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner"; // For notifications
// import Navbar from "@/components/layoutComponents/Navbar";
// import { useGetEventByIdQuery, useAddOrganizerEmailMutation, useRemoveOrganizerMutation, useIsAuthQuery } from "@/state/api"; // Update path


// const ManageTeam = () => {
//   const { id } = useParams();
// //   const id = "68ec9e1f01c680cdde34f08b";
//   const [email, setEmail] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState("coordinator");
//   const [errorMessage, setErrorMessage] = useState("");

//    const { data: authData } = useIsAuthQuery();

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

//    const { data: eventData } = useGetEventByIdQuery(id);

// //   const eventData = {
// //     success: true,
// //     event: {
// //       _id: "68ec9e1f01c680cdde34f08b",
// //       title: "Tech Symposium 2025",
// //       bannerUrl: "https://res.cloudinary.com/dokuty06j/image/upload/v1760337438/xnx5plv6mc2idjpnp1u5.jpg",
// //       createdBy: [
// //         {
// //           _id: "68ea59019df53bc6eeda9ae9",
// //           name: "user77",
// //           email: "user77@gmail.com",
// //           role: "organizer"
// //         },
// //         {
// //           _id: "68ebae70e716cf0f9084b88a",
// //           name: "user99",
// //           email: "user99@gmail.com",
// //           role: "organizer"
// //         }
// //       ],
// //       coordinators: [],
// //       volunteers: [],
// //       description: "test with sessiontest with sessiontest with session",
// //       startDate: "2025-10-13T06:36:00.000Z",
// //       venue: "test with session"
// //     }
// //   };

//   // Replace with mutations:
//   const [addOrganizerEmail] = useAddOrganizerEmailMutation();
//   const [removeOrganizer] = useRemoveOrganizerMutation();

//   const currentUser = authData?.user;
//   const event = eventData?.event;

//   // Check access permissions
//   const canAccessPage = () => {
//     if (!event || !currentUser) return false;

//     const isOrganizer = event.createdBy?.some(org => org._id === currentUser.id);
//     const isCoordinator = event.coordinators?.some(coord => coord._id === currentUser.id);
//     const isVolunteer = event.volunteers?.some(vol => vol._id === currentUser.id);

//     return isOrganizer || isCoordinator || isVolunteer;
//   };

//   // Check permissions for managing roles
//   const canManageOrganizers = () => {
//     return event?.createdBy?.some(org => org._id === currentUser?.id);
//   };

//   const canManageCoordinators = () => {
//     const isOrganizer = event?.createdBy?.some(org => org._id === currentUser?.id);
//     const isCoordinator = event?.coordinators?.some(coord => coord._id === currentUser?.id);
//     return isOrganizer || isCoordinator;
//   };

//   const canManageVolunteers = () => {
//     const isOrganizer = event?.createdBy?.some(org => org._id === currentUser?.id);
//     const isCoordinator = event?.coordinators?.some(coord => coord._id === currentUser?.id);
//     const isVolunteer = event?.volunteers?.some(vol => vol._id === currentUser?.id);
//     return isOrganizer || isCoordinator || isVolunteer;
//   };

//   const handleAddMember = (role) => {
//     setCurrentRole(role);
//     setIsDialogOpen(true);
//     setErrorMessage("");
//   };

//   const handleSubmitMember = async () => {
//     if (!email.trim()) {
//       setErrorMessage("Please enter an email address");
//       return;
//     }

//     // Replace with mutation call:
//     if (currentRole === "organizer") {
//       await addOrganizerEmail({ eventId: id, email });
//     }

//     console.log(`Adding ${currentRole}:`, email);
//     setEmail("");
//     setIsDialogOpen(false);
//     setErrorMessage("");
//   };

//   const handleRemoveMember = async (memberId, role) => {
//     // Replace with mutation call:
//     if (role === "organizer") {
//       await removeOrganizer({ eventId: id, organizerId: memberId });
//     }

//     console.log(`Removing ${role}:`, memberId);
//   };

//   const getRoleBadgeColor = (role) => {
//     const colors = {
//       organizer: "bg-purple-600 text-white",
//       coordinator: "bg-blue-600 text-white",
//       volunteer: "bg-green-600 text-white"
//     };
//     return colors[role] || "bg-gray-600 text-white";
//   };

//   const getRoleButtonColor = (role) => {
//     const colors = {
//       organizer: "bg-purple-600 hover:bg-purple-700",
//       coordinator: "bg-blue-600 hover:bg-blue-700",
//       volunteer: "bg-green-600 hover:bg-green-700"
//     };
//     return colors[role] || "bg-gray-600 hover:bg-gray-700";
//   };

//   const TeamMembersList = ({ members, role, canRemove }) => (
//     <div className="space-y-3">
//       {members && members.length > 0 ? (
//         members.map((member) => (
//           <div
//             key={member._id}
//             className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-100 hover:border-purple-200 transition-colors bg-white"
//           >
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
//                 {member.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900">{member.name}</p>
//                 <p className="text-sm text-gray-500">{member.email}</p>
//               </div>
//             </div>
//             {canRemove && (
//               <button
//                 onClick={() => handleRemoveMember(member._id, role)}
//                 className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
//                 title="Remove member"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-8 text-gray-400">
//           No {role}s added yet
//         </div>
//       )}
//     </div>
//   );

//   if (!canAccessPage()) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
//           <p className="text-gray-600">You don't have permission to manage this event's team</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => window.history.back()}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <ArrowLeft className="h-5 w-5 text-gray-700" />
//             </button>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               Manage Event Team
//             </h1>
//           </div>
//         </div>
//       </header>

//       <section className="container mx-auto px-4 py-12 max-w-5xl">
//         <div className="border-2 border-gray-100 shadow-xl rounded-lg bg-white overflow-hidden">
//           <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 border-b border-gray-100">
//             <h2 className="text-2xl font-bold text-gray-900">{event?.title}</h2>
//             <p className="text-gray-600 mt-1">{event?.description}</p>
//           </div>

//           <div className="p-6">
//             {/* Organizers Tab */}
//             <div className="mb-10 pb-10 border-b border-gray-200">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">Organizers</h3>
//                   <p className="text-gray-600 text-sm">Organizers have full control over the event</p>
//                 </div>
//                 {canManageOrganizers() && (
//                   <button
//                     onClick={() => handleAddMember("organizer")}
//                     className={`${getRoleButtonColor("organizer")} text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition`}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     Add Organizer
//                   </button>
//                 )}
//               </div>
//               <TeamMembersList
//                 members={event?.createdBy || []}
//                 role="organizer"
//                 canRemove={canManageOrganizers()}
//               />
//             </div>

//             {/* Coordinators Tab */}
//             <div className="mb-10 pb-10 border-b border-gray-200">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">Coordinators</h3>
//                   <p className="text-gray-600 text-sm">Coordinators help manage volunteers and sessions</p>
//                 </div>
//                 {canManageCoordinators() && (
//                   <button
//                     onClick={() => handleAddMember("coordinator")}
//                     className={`${getRoleButtonColor("coordinator")} text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition`}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     Add Coordinator
//                   </button>
//                 )}
//               </div>
//               <TeamMembersList
//                 members={event?.coordinators || []}
//                 role="coordinator"
//                 canRemove={canManageCoordinators()}
//               />
//             </div>

//             {/* Volunteers Tab */}
//             <div>
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">Volunteers</h3>
//                   <p className="text-gray-600 text-sm">Volunteers assist with event execution</p>
//                 </div>
//                 {canManageVolunteers() && (
//                   <button
//                     onClick={() => handleAddMember("volunteer")}
//                     className={`${getRoleButtonColor("volunteer")} text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition`}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     Add Volunteer
//                   </button>
//                 )}
//               </div>
//               <TeamMembersList
//                 members={event?.volunteers || []}
//                 role="volunteer"
//                 canRemove={canManageVolunteers()}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Add Member Dialog */}
//       {isDialogOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-2">
//               Add {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
//             </h2>
//             <p className="text-gray-600 text-sm mb-6">
//               Enter the email address of the person you want to add
//             </p>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="user@college.edu"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border-2 border-gray-200 focus:border-purple-400 rounded-lg focus:outline-none transition"
//               />
//               {errorMessage && (
//                 <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="flex-1 px-4 py-2 border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitMember}
//                 className={`flex-1 ${getRoleButtonColor(currentRole)} text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition`}
//               >
//                 <UserPlus className="h-4 w-4" />
//                 Add Member
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageTeam;




import { useState } from "react";
import { ArrowLeft, UserPlus, Trash2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetEventByIdQuery, useAddOrganizerEmailMutation, useRemoveOrganizerMutation, useIsAuthQuery, useAddCoordinatorByEmailMutation, useRemoveCoordinatorMutation, useAddVolunteerByEmailMutation, useRemoveVolunteerMutation } from "@/state/api"; // Update path

const ManageTeam = () => {
   const { id } = useParams();
//   const id = "68ec9e1f01c680cdde34f08b";
  
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState("coordinator");
  const [errorMessage, setErrorMessage] = useState("");

 const { data: authData } = useIsAuthQuery();



    const { data: eventData } = useGetEventByIdQuery(id);


  // Replace with mutations:
  
  // const [addOrganizerEmail] = useAddOrganizerEmailMutation();
  // const [removeOrganizer] = useRemoveOrganizerMutation();


  const [addOrganizerEmail] = useAddOrganizerEmailMutation();
  const [removeOrganizer] = useRemoveOrganizerMutation();
  const [addCoordinatorByEmail] = useAddCoordinatorByEmailMutation();
  const [removeCoordinator] = useRemoveCoordinatorMutation();
  const [addVolunteerByEmail] = useAddVolunteerByEmailMutation();
  const [removeVolunteer] = useRemoveVolunteerMutation();

  const currentUser = authData?.user;
  const event = eventData?.event;

  // Check access permissions
  const canAccessPage = () => {
    if (!event || !currentUser) return false;

    const isOrganizer = event.createdBy?.some(org => org._id === currentUser.id);
    const isCoordinator = event.coordinators?.some(coord => coord._id === currentUser.id);
    const isVolunteer = event.volunteers?.some(vol => vol._id === currentUser.id);

    return isOrganizer || isCoordinator || isVolunteer;
  };

  // Check permissions for managing roles
  const canManageOrganizers = () => {
    return event?.createdBy?.some(org => org._id === currentUser?.id);
  };

  const canManageCoordinators = () => {
    const isOrganizer = event?.createdBy?.some(org => org._id === currentUser?.id);
    const isCoordinator = event?.coordinators?.some(coord => coord._id === currentUser?.id);
    return isOrganizer || isCoordinator;
  };

  const canManageVolunteers = () => {
    const isOrganizer = event?.createdBy?.some(org => org._id === currentUser?.id);
    const isCoordinator = event?.coordinators?.some(coord => coord._id === currentUser?.id);
    const isVolunteer = event?.volunteers?.some(vol => vol._id === currentUser?.id);
    return isOrganizer || isCoordinator || isVolunteer;
  };

  const handleAddMember = (role) => {
    setCurrentRole(role);
    setIsDialogOpen(true);
    setErrorMessage("");
  };

  const handleSubmitMember = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter an email address");
      return;
    }

    // Replace with mutation call:
    // if (currentRole === "organizer") {
    //   await addOrganizerEmail({ eventId: id, email });
    // }

    if (currentRole === "organizer") {
    await addOrganizerEmail({ eventId: id, email });
  } else if (currentRole === "coordinator") {
    await addCoordinatorByEmail({ eventId: id, email });
  } else if (currentRole === "volunteer") {
    await addVolunteerByEmail({ eventId: id, email });
  }


    console.log(`Adding ${currentRole}:`, email);
    setEmail("");
    setIsDialogOpen(false);
    setErrorMessage("");
  };

  const handleRemoveMember = async (memberId, role) => {
    // Replace with mutation call:
    // if (role === "organizer") {
    //   await removeOrganizer({ eventId: id, organizerId: memberId });
    // }

    if (role === "organizer") {
    await removeOrganizer({ eventId: id, organizerId: memberId });
  } else if (role === "coordinator") {
    await removeCoordinator({ eventId: id, coordinatorId: memberId });
  } else if (role === "volunteer") {
    await removeVolunteer({ eventId: id, volunteerId: memberId });
  }

    console.log(`Removing ${role}:`, memberId);
  };

  const getRoleBadgeStyle = (role) => {
    const styles = {
      organizer: "bg-purple-600 text-white",
      coordinator: "bg-blue-600 text-white",
      volunteer: "bg-green-600 text-white"
    };
    return styles[role] || "bg-gray-600 text-white";
  };

  const TeamMembersList = ({ members, role, canRemove }) => (
    <div className="space-y-3">
      {members && members.length > 0 ? (
        members.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-100 hover:border-purple-200 transition-colors bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            {canRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMember(member._id, role)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-400">
          No {role}s added yet
        </div>
      )}
    </div>
  );

  if (!canAccessPage()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <Card className="border-2 border-red-200 max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to manage this event's team</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="text-gray-700 hover:text-purple-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Manage Event Team
            </h1>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <Card className="border-2 border-gray-100 shadow-xl">
          <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardTitle className="text-2xl text-gray-900">{event?.title}</CardTitle>
            <p className="text-gray-600 text-sm mt-2">{event?.description}</p>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="organizers" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="organizers" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Organizers ({event?.createdBy?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="coordinators" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Coordinators ({event?.coordinators?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="volunteers" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Volunteers ({event?.volunteers?.length || 0})
                </TabsTrigger>
              </TabsList>

              {/* Organizers Tab */}
              <TabsContent value="organizers" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Organizers have full control over the event</p>
                  {canManageOrganizers() && (
                    <Button
                      onClick={() => handleAddMember("organizer")}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Organizer
                    </Button>
                  )}
                </div>
                <TeamMembersList
                  members={event?.createdBy || []}
                  role="organizer"
                  canRemove={canManageOrganizers()}
                />
              </TabsContent>

              {/* Coordinators Tab */}
              <TabsContent value="coordinators" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Coordinators help manage volunteers and sessions</p>
                  {canManageCoordinators() && (
                    <Button
                      onClick={() => handleAddMember("coordinator")}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Coordinator
                    </Button>
                  )}
                </div>
                <TeamMembersList
                  members={event?.coordinators || []}
                  role="coordinator"
                  canRemove={canManageCoordinators()}
                />
              </TabsContent>

              {/* Volunteers Tab */}
              <TabsContent value="volunteers" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Volunteers assist with event execution</p>
                  {canManageVolunteers() && (
                    <Button
                      onClick={() => handleAddMember("volunteer")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Volunteer
                    </Button>
                  )}
                </div>
                <TeamMembersList
                  members={event?.volunteers || []}
                  role="volunteer"
                  canRemove={canManageVolunteers()}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Add Member Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Add {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to add as a {currentRole}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-200 focus:border-purple-400"
              />
              {errorMessage && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitMember}
              className={`${getRoleBadgeStyle(currentRole)}`}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeam;