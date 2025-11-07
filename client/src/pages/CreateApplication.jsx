// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registrationEventSchema } from "@/lib/schemas";
// import { useRegisterForEventMutation } from "@/state/api";
// import { toast } from "sonner";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useParams } from "react-router-dom";

// export default function RegisterForEventForm() {
// const { eventId } = useParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [registerForEvent] = useRegisterForEventMutation();

//   const form = useForm({
//     resolver: zodResolver(registrationEventSchema),
//     defaultValues: {
//       college: "",
//       department: "",
//       studentId: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);

//       const res = await registerForEvent({
//         eventId,
//         data,
//       }).unwrap();

//       toast.success("🎉 Registered successfully for the event!");
//       form.reset();
//     } catch (err) {
//       console.error("Registration error:", err);
//       toast.error(err?.data?.message || "Failed to register");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-40">
//       <div className="text-center space-y-1">
//         <h1 className="text-2xl font-bold">Event Registration</h1>
//         <p className="text-gray-600">Fill out your details below</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* College */}
//           <FormField
//             control={form.control}
//             name="college"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>College</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. ABC Engineering College" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Department */}
//           <FormField
//             control={form.control}
//             name="department"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Department</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. Computer Science" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Student ID */}
//           <FormField
//             control={form.control}
//             name="studentId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Student ID</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. CSE1024" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }









// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registrationEventSchema } from "@/lib/schemas";
// import { useRegisterForEventMutation } from "@/state/api";
// import { toast } from "sonner";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useParams } from "react-router-dom";

// export default function RegisterForEventForm() {
//   const { eventId } = useParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [registerForEvent] = useRegisterForEventMutation();

//   const form = useForm({
//     resolver: zodResolver(registrationEventSchema),
//     defaultValues: {
//       role: "participant",
//       college: "",
//       department: "",
//       studentId: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     // Only allow participant registrations
//     if (data.role !== "participant") {
//       toast.error("Only participants can register through this form");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const res = await registerForEvent({
//         eventId,
//         data,
//       }).unwrap();

//       toast.success("🎉 Registered successfully for the event!");
//       form.reset();
//     } catch (err) {
//       console.error("Registration error:", err);
//       toast.error(err?.data?.message || "Failed to register");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-40">
//       <div className="text-center space-y-1">
//         <h1 className="text-2xl font-bold">Event Registration</h1>
//         <p className="text-gray-600">Fill out your details below</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Role */}
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Registration Type</FormLabel>
//                 <Select 
//                   onValueChange={field.onChange} 
//                   defaultValue={field.value}
//                   disabled
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="participant">Participant</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* College */}
//           <FormField
//             control={form.control}
//             name="college"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>College</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. ABC Engineering College" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Department */}
//           <FormField
//             control={form.control}
//             name="department"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Department</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. Computer Science" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Student ID */}
//           <FormField
//             control={form.control}
//             name="studentId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Student ID</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. CSE1024" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Registering..." : "Register as Participant"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

















import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationEventSchema } from "@/lib/schemas";
import { useIsAuthQuery, useRegisterForEventMutation } from "@/state/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";

export default function RegisterForEventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerForEvent] = useRegisterForEventMutation();
  
  // Get current user from Redux store
  const {data: dataUser} = useIsAuthQuery()
  // console.log(dataUser, "sjdhjsd");

  const currentUser = dataUser?.user
  // console.log(currentUser, "adgsjagdhgdhgjsdggdah");
  
  

  const form = useForm({
    resolver: zodResolver(registrationEventSchema),
    defaultValues: {
      college: "",
      department: "",
      studentId: "",
    },
  });

  // Check if user is a participant
  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to register for events");
      navigate("/login");
      return;
    }

    if (currentUser.role !== "participant") {
      toast.error("Only participants can register for events");
      navigate(-1); // Go back to previous page
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data) => {
    // Double-check user role before submission
    if (!currentUser || currentUser.role !== "participant") {
      toast.error("Only participants can register for events");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await registerForEvent({
        eventId,
        data,
      }).unwrap();

      toast.success("🎉 Registered successfully for the event!");
      form.reset();
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.data?.message || "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show nothing or loading state while checking user role
  if (!currentUser || currentUser.role !== "participant") {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-40">
        <Alert variant="destructive">
          <AlertDescription>
            Only participants can register for events. Redirecting...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <DashboardLayout>
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-40">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Event Registration</h1>
        <p className="text-gray-600">Fill out your details below</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* College */}
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. ABC Engineering College" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Student ID */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CSE1024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
    </DashboardLayout>
  );
}














// import { useState, useMemo } from 'react';
// import { Download, Loader2, AlertCircle, Search } from 'lucide-react';

// // Mock hook - replace with your actual RTK Query hook
// // import { useGetEventRegistrationsQuery } from '@/services/api';
// const useGetEventRegistrationsQuery = (eventId) => {
//   return {
//     data: {
//       success: true,
//       count: 1,
//       data: [
//         {
//           _id: "68eb6e7b4aea2ebd90459ea3",
//           event: "68eaa8c8abdf8d5af85e2209",
//           participant: {
//             _id: "68ea240a1a6e45847ad3ba28",
//             name: "admin1",
//             email: "admin1@gamil.com",
//             phone: "",
//             department: ""
//           },
//           college: "test 11",
//           department: "test 11",
//           studentId: "test 11",
//           status: "registered",
//           registeredAt: "2025-10-12T09:01:47.283Z",
//           __v: 0
//         }
//       ]
//     },
//     isLoading: false,
//     error: null,
//   };
// };

// // Mock useParams
// const useParams = () => ({
//   eventId: "68eaa8c8abdf8d5af85e2209"
// });

// export default function EventRegistrations() {
//   const { eventId } = useParams();
//   const { data: responseData, isLoading, error } = useGetEventRegistrationsQuery(eventId);
  
//   const registrations = responseData?.data || [];
//   const [sortBy, setSortBy] = useState('registeredAt');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter registrations by search term
//   const filteredRegistrations = useMemo(() => {
//     return registrations.filter((reg) =>
//       reg.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.college.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [registrations, searchTerm]);

//   // Sort registrations
//   const sortedRegistrations = useMemo(() => {
//     return [...filteredRegistrations].sort((a, b) => {
//       if (sortBy === 'registeredAt') {
//         return new Date(b.registeredAt) - new Date(a.registeredAt);
//       }
//       if (sortBy === 'name') {
//         return a.participant.name.localeCompare(b.participant.name);
//       }
//       if (sortBy === 'status') {
//         return a.status.localeCompare(b.status);
//       }
//       return 0;
//     });
//   }, [filteredRegistrations, sortBy]);

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       registered: 'bg-blue-100 text-blue-800',
//       'checked-in': 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800',
//     };
//     const labels = {
//       registered: 'Registered',
//       'checked-in': 'Checked In',
//       cancelled: 'Cancelled',
//     };

//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[status] || statusConfig.registered}`}>
//         {labels[status]}
//       </span>
//     );
//   };

//   const exportToCSV = () => {
//     const headers = ['Name', 'Email', 'Phone', 'College', 'Department', 'Student ID', 'Status', 'Registered At'];
//     const rows = sortedRegistrations.map(reg => [
//       reg.participant.name,
//       reg.participant.email,
//       reg.participant.phone || 'N/A',
//       reg.college,
//       reg.department,
//       reg.studentId,
//       reg.status,
//       new Date(reg.registeredAt).toLocaleDateString(),
//     ]);

//     const csvContent = [
//       headers.join(','),
//       ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `event-registrations-${eventId}.csv`;
//     link.click();
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="flex flex-col items-center gap-2">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//           <p className="text-gray-600">Loading registrations...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="flex flex-col items-center gap-3 bg-red-50 p-6 rounded-lg max-w-md">
//           <AlertCircle className="w-8 h-8 text-red-600" />
//           <h2 className="text-lg font-semibold text-red-900">Error Loading Registrations</h2>
//           <p className="text-red-700 text-center">{error?.message || 'Failed to fetch registrations'}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registrations</h1>
//           <p className="text-gray-600">Total Participants: <span className="font-semibold">{registrations.length}</span></p>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, student ID, or college..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             >
//               <option value="registeredAt">Sort by Date (Newest)</option>
//               <option value="name">Sort by Name</option>
//               <option value="status">Sort by Status</option>
//             </select>

//             {/* Export */}
//             <button
//               onClick={exportToCSV}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 font-medium transition"
//             >
//               <Download className="w-4 h-4" />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {sortedRegistrations.length === 0 ? (
//             <div className="flex items-center justify-center h-64">
//               <p className="text-gray-500 text-lg">No registrations found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-100 border-b border-gray-200">
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">College</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Department</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Student ID</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
//                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Registered At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedRegistrations.map((registration, index) => (
//                     <tr
//                       key={registration._id}
//                       className={`border-b border-gray-200 hover:bg-gray-50 transition ${
//                         index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                       }`}
//                     >
//                       <td className="px-6 py-4 font-medium text-gray-900">{registration.participant.name}</td>
//                       <td className="px-6 py-4 text-gray-600">{registration.participant.email}</td>
//                       <td className="px-6 py-4 text-gray-600">{registration.participant.phone || 'N/A'}</td>
//                       <td className="px-6 py-4 text-gray-600">{registration.college}</td>
//                       <td className="px-6 py-4 text-gray-600">{registration.department}</td>
//                       <td className="px-6 py-4 text-gray-600 font-mono text-sm">{registration.studentId}</td>
//                       <td className="px-6 py-4">
//                         {getStatusBadge(registration.status)}
//                       </td>
//                       <td className="px-6 py-4 text-gray-600 text-sm">
//                         {new Date(registration.registeredAt).toLocaleDateString('en-IN', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Footer Stats */}
//         <div className="mt-6 grid grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <p className="text-gray-600 text-sm">Total Registered</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {registrations.filter(r => r.status === 'registered').length}
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <p className="text-gray-600 text-sm">Checked In</p>
//             <p className="text-2xl font-bold text-green-600">
//               {registrations.filter(r => r.status === 'checked-in').length}
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <p className="text-gray-600 text-sm">Cancelled</p>
//             <p className="text-2xl font-bold text-red-600">
//               {registrations.filter(r => r.status === 'cancelled').length}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














