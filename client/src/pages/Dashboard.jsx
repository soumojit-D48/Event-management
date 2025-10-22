// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard



















// import { useState } from 'react';
// import { 
//   Calendar, 
//   Users, 
//   TrendingUp, 
//   DollarSign, 
//   Menu, 
//   X, 
//   Bell, 
//   Search,
//   LayoutDashboard,
//   CalendarPlus,
//   ClipboardList,
//   QrCode,
//   MessageSquare,
//   FileText,
//   Settings,
//   LogOut,
//   ChevronRight,
//   BarChart3,
//   Clock
// } from 'lucide-react';
// import Navbar from '@/components/layoutComponents/Navbar';

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   const menuItems = [
//     { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
//     { id: 'events', icon: CalendarPlus, label: 'Events' },
//     { id: 'registrations', icon: ClipboardList, label: 'Registrations' },
//     { id: 'attendance', icon: QrCode, label: 'Attendance' },
//     { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
//     { id: 'reports', icon: FileText, label: 'Reports' },
//     { id: 'analytics', icon: BarChart3, label: 'Analytics' },
//   ];

//   const stats = [
//     { label: 'Total Events', value: '24', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
//     { label: 'Active Participants', value: '1,248', change: '+23%', icon: Users, color: 'bg-green-500' },
//     { label: 'Budget Utilized', value: '₹2.4L', change: '68%', icon: DollarSign, color: 'bg-purple-500' },
//     { label: 'Avg. Satisfaction', value: '4.6/5', change: '+0.3', icon: TrendingUp, color: 'bg-orange-500' },
//   ];

//   const upcomingEvents = [
//     { id: 1, title: 'Tech Fest 2025', date: 'Oct 15, 2025', status: 'Upcoming', attendees: 450 },
//     { id: 2, title: 'AI Workshop', date: 'Oct 18, 2025', status: 'Registration Open', attendees: 120 },
//     { id: 3, title: 'Cultural Night', date: 'Oct 22, 2025', status: 'Planning', attendees: 0 },
//   ];

//   const recentActivity = [
//     { action: 'New registration for Tech Fest 2025', time: '2 mins ago', type: 'registration' },
//     { action: 'Budget updated for AI Workshop', time: '1 hour ago', type: 'budget' },
//     { action: 'Feedback received for Seminar', time: '3 hours ago', type: 'feedback' },
//     { action: 'Certificate generated (125 students)', time: '5 hours ago', type: 'certificate' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       {/* <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
//               >
//                 {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//               <div className="flex items-center ml-2 lg:ml-0">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">EventHub</span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="relative hidden md:block">
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//               </div>
//               <button className="p-2 rounded-full hover:bg-gray-100 relative">
//                 <Bell className="w-6 h-6 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
//                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
//                   JD
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-gray-900">John Doe</p>
//                   <p className="text-xs text-gray-500">Organizer</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav> */}

//       <Navbar/>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0`}
//       >
//         <div className="h-full px-3 py-4 overflow-y-auto">
//           <ul className="space-y-1">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setSidebarOpen(false);
//                   }}
//                   className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
//                     activeTab === item.id
//                       ? 'bg-blue-50 text-blue-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-8 pt-4 border-t border-gray-200">
//             <ul className="space-y-1">
//               <li>
//                 <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
//                   <Settings className="w-5 h-5 mr-3" />
//                   <span className="font-medium">Settings</span>
//                 </button>
//               </li>
//               <li>
//                 <button className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50">
//                   <LogOut className="w-5 h-5 mr-3" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="pt-16 lg:pl-64">
//         <div className="p-4 sm:p-6 lg:p-8">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
//             <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`${stat.color} p-3 rounded-lg`}>
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-sm font-medium text-green-600">{stat.change}</span>
//                 </div>
//                 <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//               </div>
//             ))}
//           </div>

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Upcoming Events */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
//                   View All <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {upcomingEvents.map((event) => (
//                   <div
//                     key={event.id}
//                     className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
//                         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
//                           <span className="flex items-center">
//                             <Clock className="w-4 h-4 mr-1" />
//                             {event.date}
//                           </span>
//                           <span className="flex items-center">
//                             <Users className="w-4 h-4 mr-1" />
//                             {event.attendees} registered
//                           </span>
//                         </div>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                           event.status === 'Upcoming'
//                             ? 'bg-green-100 text-green-700'
//                             : event.status === 'Registration Open'
//                             ? 'bg-blue-100 text-blue-700'
//                             : 'bg-gray-100 text-gray-700'
//                         }`}
//                       >
//                         {event.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div
//                       className={`mt-1 p-2 rounded-lg ${
//                         activity.type === 'registration'
//                           ? 'bg-blue-100'
//                           : activity.type === 'budget'
//                           ? 'bg-purple-100'
//                           : activity.type === 'feedback'
//                           ? 'bg-orange-100'
//                           : 'bg-green-100'
//                       }`}
//                     >
//                       {activity.type === 'registration' && <Users className="w-4 h-4 text-blue-600" />}
//                       {activity.type === 'budget' && <DollarSign className="w-4 h-4 text-purple-600" />}
//                       {activity.type === 'feedback' && <MessageSquare className="w-4 h-4 text-orange-600" />}
//                       {activity.type === 'certificate' && <FileText className="w-4 h-4 text-green-600" />}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
//                       <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
//             <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <button className="bg-gray-700 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
//                 <CalendarPlus className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">Create Event</span>
//               </button>
//               <button className="bg-gray-700 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
//                 <QrCode className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">Generate QR</span>
//               </button>
//               <button className="bg-gray-700 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
//                 <FileText className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">Export Report</span>
//               </button>
//               <button className="bg-gray-700 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
//                 <MessageSquare className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">View Feedback</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }









// import { useState } from "react";
import Navbar from "@/components/layoutComponents/Navbar";
import Sidebar from "@/components/layoutComponents/Sidebar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { Calendar, Users, TrendingUp, DollarSign, LayoutDashboard, CalendarPlus, ClipboardList, QrCode, MessageSquare, FileText, BarChart3 } from "lucide-react";
// import { useIsAuthQuery, useLogoutMutation } from "@/state/api";

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   const menuItems = [
//     { id: "overview", icon: LayoutDashboard, label: "Overview" },
//     { id: "events", icon: CalendarPlus, label: "Events" },
//     { id: "registrations", icon: ClipboardList, label: "Registrations" },
//     { id: "attendance", icon: QrCode, label: "Attendance" },
//     { id: "feedback", icon: MessageSquare, label: "Feedback" },
//     { id: "reports", icon: FileText, label: "Reports" },
//     { id: "analytics", icon: BarChart3, label: "Analytics" },
//   ];

//   const stats = [
//     { label: "Total Events", value: "24", change: "+12%", icon: Calendar, color: "bg-blue-500" },
//     { label: "Active Participants", value: "1,248", change: "+23%", icon: Users, color: "bg-green-500" },
//     { label: "Budget Utilized", value: "₹2.4L", change: "68%", icon: DollarSign, color: "bg-purple-500" },
//     { label: "Avg. Satisfaction", value: "4.6/5", change: "+0.3", icon: TrendingUp, color: "bg-orange-500" },
//   ];

//   const upcomingEvents = [
//     { id: 1, title: "Tech Fest 2025", date: "Oct 15, 2025", status: "Upcoming", attendees: 450 },
//     { id: 2, title: "AI Workshop", date: "Oct 18, 2025", status: "Registration Open", attendees: 120 },
//     { id: 3, title: "Cultural Night", date: "Oct 22, 2025", status: "Planning", attendees: 0 },
//   ];

//   const recentActivity = [
//     { action: "New registration for Tech Fest 2025", time: "2 mins ago", type: "registration" },
//     { action: "Budget updated for AI Workshop", time: "1 hour ago", type: "budget" },
//     { action: "Feedback received for Seminar", time: "3 hours ago", type: "feedback" },
//     { action: "Certificate generated (125 students)", time: "5 hours ago", type: "certificate" },
//   ];


//   const {data: authData} = useIsAuthQuery()
//   const [logout] = useLogoutMutation()

//   console.log(authData?.user?.name, "user anme");


  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar 
//       sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         authData={authData?.user}
//         logout={logout}
//       />

//       <Sidebar
//         menuItems={menuItems}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         authData={authData?.user}
//         logout={logout}
//       />

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <main className="pt-16 lg:pl-64">
//         <div className="p-4 sm:p-6 lg:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
//           <p className="text-gray-600 mb-8">Welcome back! Here's what's happening today.</p>

//           <StatsGrid stats={stats} />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <UpcomingEvents events={upcomingEvents} />
//             <RecentActivity activities={recentActivity} />
//           </div>
//           <QuickActions />
//         </div>
//       </main>
//     </div>
//   );
// }











import { useState, useMemo } from "react";
import { useIsAuthQuery, useLogoutMutation, useGetAllEventsQuery } from "@/state/api";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import StatsGrid from "@/components/StatsGrid";
// import UpcomingEvents from "@/components/UpcomingEvents";
// import RecentActivity from "@/components/RecentActivity";
// import QuickActions from "@/components/QuickActions";
// import { menuItems, stats, recentActivity } from "@/data";

// export default function Dashboard() {

//     const menuItems = [
//     { id: "overview", icon: LayoutDashboard, label: "Overview" },
//     { id: "events", icon: CalendarPlus, label: "Events" },
//     { id: "registrations", icon: ClipboardList, label: "Registrations" },
//     { id: "attendance", icon: QrCode, label: "Attendance" },
//     { id: "feedback", icon: MessageSquare, label: "Feedback" },
//     { id: "reports", icon: FileText, label: "Reports" },
//     { id: "analytics", icon: BarChart3, label: "Analytics" },
//   ];

//   const stats = [
//     { label: "Total Events", value: "24", change: "+12%", icon: Calendar, color: "bg-blue-500" },
//     { label: "Active Participants", value: "1,248", change: "+23%", icon: Users, color: "bg-green-500" },
//     { label: "Budget Utilized", value: "₹2.4L", change: "68%", icon: DollarSign, color: "bg-purple-500" },
//     { label: "Avg. Satisfaction", value: "4.6/5", change: "+0.3", icon: TrendingUp, color: "bg-orange-500" },
//   ];

//   // const upcomingEvents = [
//   //   { id: 1, title: "Tech Fest 2025", date: "Oct 15, 2025", status: "Upcoming", attendees: 450 },
//   //   { id: 2, title: "AI Workshop", date: "Oct 18, 2025", status: "Registration Open", attendees: 120 },
//   //   { id: 3, title: "Cultural Night", date: "Oct 22, 2025", status: "Planning", attendees: 0 },
//   // ];

//   const recentActivity = [
//     { action: "New registration for Tech Fest 2025", time: "2 mins ago", type: "registration" },
//     { action: "Budget updated for AI Workshop", time: "1 hour ago", type: "budget" },
//     { action: "Feedback received for Seminar", time: "3 hours ago", type: "feedback" },
//     { action: "Certificate generated (125 students)", time: "5 hours ago", type: "certificate" },
//   ];


//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   const { data: authData } = useIsAuthQuery();
//   const [logout] = useLogoutMutation();

//   // ✅ Fetch all events
//   const { data: allEvents, isLoading } = useGetAllEventsQuery();
//   // console.log(allEvents, "all events");
  

//   // ✅ Compute statuses + pick only 3
//   const events = useMemo(() => {
//     if (!allEvents?.events) return [];

//     const today = new Date();

//     return allEvents.events
//       .map((event) => {
//         const start = new Date(event.startDate);
//         const end = new Date(event.endDate);

//         let status = "Ended";
//         if (today < start) status = "Upcoming";
//         else if (today >= start && today <= end) status = "Ongoing";

//         return {
//           id: event._id,
//           title: event.title,
//           venue: event.venue,
//           startDate: event.startDate,
//           sessionsCount: event.sessions?.length || 0,
//           status,
//         };
//       })
//        // show only 3
//   }, [allEvents]);

//   if (isLoading) return <div className="p-6 text-gray-600">Loading events...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         authData={authData?.user}
//         logout={logout}
//       />

//       <Sidebar
//         menuItems={menuItems}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         authData={authData?.user}
//         logout={logout}
//       />

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <main className="pt-16 lg:pl-64">
//         <div className="p-4 sm:p-6 lg:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Dashboard Overview
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Welcome back! Here's what's happening today.
//           </p>

//           <StatsGrid stats={stats} />

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <UpcomingEvents events={events} />
//             <RecentActivity activities={recentActivity} />
//           </div>

//           <QuickActions />
//         </div>
//       </main>
//     </div>
//   );
// }




import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
// import StatsGrid from "@/components/dashboard/StatsGrid";
// import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // ✅ Static data
  const stats = [
    { label: "Total Events", value: "24", change: "+12%", icon: Calendar, color: "bg-blue-500" },
    { label: "Active Participants", value: "1,248", change: "+23%", icon: Users, color: "bg-green-500" },
    { label: "Budget Utilized", value: "₹2.4L", change: "68%", icon: DollarSign, color: "bg-purple-500" },
    { label: "Avg. Satisfaction", value: "4.6/5", change: "+0.3", icon: TrendingUp, color: "bg-orange-500" },
  ];

  const recentActivity = [
    { action: "New registration for Tech Fest 2025", time: "2 mins ago", type: "registration" },
    { action: "Budget updated for AI Workshop", time: "1 hour ago", type: "budget" },
    { action: "Feedback received for Seminar", time: "3 hours ago", type: "feedback" },
    { action: "Certificate generated (125 students)", time: "5 hours ago", type: "certificate" },
  ];

  // ✅ Fetch events data
  const { data: allEvents, isLoading } = useGetAllEventsQuery();

  // ✅ Compute event statuses
  const events = useMemo(() => {
    if (!allEvents?.events) return [];

    const today = new Date();

    return allEvents.events
      .map((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        let status = "Ended";
        if (today < start) status = "Upcoming";
        else if (today >= start && today <= end) status = "Ongoing";

        return {
          id: event._id,
          title: event.title,
          venue: event.venue,
          startDate: event.startDate,
          sessionsCount: event.sessions?.length || 0,
          status,
        };
      })
      .slice(0, 3); // Show only 3 events
  }, [allEvents]);

  // ✅ Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ✅ Main dashboard content
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Here's what's happening today.
        </p>

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingEvents events={events} />
          <RecentActivity activities={recentActivity} />
        </div>

        <QuickActions />
      </div>
    </DashboardLayout>
  );
}