// import React from 'react'

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

// const Navbar = ({sidebarOpen, setSidebarOpen}) => {
//   return (
//     <div>
        
//         <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
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
//       </nav>
//     </div>
//   )
// }

// export default Navbar










// import React from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Calendar, Menu, X, Search, Bell } from 'lucide-react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'

// const Navbar = ({ sidebarOpen, setSidebarOpen, authData, logout }) => {
//   const router = useNavigate()
//   console.log(authData, "dataaaa");
// //   console.log(authData.user, "dataaaa anme");
  

//   // Get initials from name
//   const getInitials = (name) => {
//     if (!name) return 'U'
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//   }

//   const handleLogout = async () => {
//     try {
//       await logout()
//       router('/')
//     } catch (error) {
//       console.error('Logout failed:', error)
//     }
//   }

//   return (
//     <div>
//       <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Left side - Logo and Sidebar trigger */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
//               >
//                 {sidebarOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//               <Link href="/" className="flex items-center ml-2 lg:ml-0 cursor-pointer hover:opacity-80">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
//                   Campus
//                   <span className="text-blue-600"> Sync</span>
//                 </span>
//               </Link>
//             </div>

//             {/* Right side - Search, Notifications, User */}
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               {/* Search bar */}
//               <div className="relative hidden md:block">
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//               </div>

//               {/* Notifications */}
//               <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
//                 <Bell className="w-6 h-6 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* User Section */}
//               {authData ? (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger className="flex items-center space-x-2 pl-2 border-l border-gray-200 focus:outline-none cursor-pointer">
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback className="bg-blue-600 text-white font-semibold">
//                         {getInitials(authData.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="hidden sm:block">
//                       <p className="text-sm font-medium text-gray-900">
//                         {authData.name}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize">
//                         {authData.role}
//                       </p>
//                     </div>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent className="w-56 bg-white">
//                     {/* User Info */}
//                     <div className="px-4 py-3">
//                       <p className="text-sm font-medium text-gray-900">
//                         {authData.name}
//                       </p>
//                       <p className="text-xs text-gray-500">{authData.email}</p>
//                     </div>

//                     <DropdownMenuSeparator className="bg-gray-200" />

//                     {/* Menu Items */}
//                     <DropdownMenuItem
//                       className="cursor-pointer hover:!bg-blue-50 hover:!text-blue-600 font-medium"
//                       onClick={() => router('/dashboard')}
//                     >
//                       Go to Dashboard
//                     </DropdownMenuItem>

//                     <DropdownMenuSeparator className="bg-gray-200" />

//                     <DropdownMenuItem
//                       className="cursor-pointer hover:!bg-blue-50 hover:!text-blue-600 font-medium"
//                       onClick={() => router('/profile')}
//                     >
//                       My Profile
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                       className="cursor-pointer hover:!bg-blue-50 hover:!text-blue-600 font-medium"
//                       onClick={() => router('/settings')}
//                     >
//                       Settings
//                     </DropdownMenuItem>

//                     <DropdownMenuSeparator className="bg-gray-200" />

//                     <DropdownMenuItem
//                       className="cursor-pointer hover:!bg-red-50 hover:!text-red-600 font-medium text-red-600"
//                       onClick={handleLogout}
//                     >
//                       Sign Out
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 /* Login/Signup buttons when not authenticated */
//                 <div className="flex items-center space-x-2">
//                   <Link href="/signin">
//                     <Button
//                       variant="outline"
//                       className="text-gray-700 border-gray-300 hover:bg-gray-50"
//                     >
//                       Sign In
//                     </Button>
//                   </Link>
//                   <Link href="/signup">
//                     <Button className="bg-blue-600 text-white hover:bg-blue-700">
//                       Get Started
//                     </Button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Navbar










// Add these props to Navbar
// const Navbar = ({ 
//   sidebarOpen, 
//   setSidebarOpen, 
//   sidebarCollapsed, 
//   setSidebarCollapsed, 
//   authData, 
//   logout 
// }) => {
//   // ... existing code ...

//   return (
//     <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
//             >
//               {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>

//             {/* Desktop toggle - NEW */}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hidden lg:block"
//             >
//               {sidebarCollapsed ? (
//                 <ChevronRight className="w-6 h-6" />
//               ) : (
//                 <ChevronLeft className="w-6 h-6" />
//               )}
//             </button>

//             {/* Rest of navbar code... */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };






// import React, { useState, useMemo } from 'react';
// import { 
//   Menu, 
//   X, 
//   ChevronLeft, 
//   ChevronRight, 
//   Calendar,
//   Search,
//   Bell,
//   Settings,
//   LogOut,
//   LayoutDashboard,
//   CalendarPlus,
//   ClipboardList,
//   QrCode,
//   MessageSquare,
//   FileText,
//   BarChart3
// } from 'lucide-react';
// import { useIsAuthQuery, useLogoutMutation } from '@/state/api';

// // Mock hooks for demo - Replace with your actual hooks
// // const useIsAuthQuery = () => ({
// //   data: { user: { name: 'John Doe', email: 'john@example.com', role: 'admin' } }
// // });
// // const useLogoutMutation = () => [() => console.log('Logout')];

// // ============ NAVBAR COMPONENT ============
// const Navbar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
//   // Hooks inside Navbar
//   const { data: authData } = useIsAuthQuery();
//   const [logout] = useLogoutMutation();

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase();
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // router('/') - add your navigation
//       console.log('Logged out');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side */}
//           <div className="flex items-center">
//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
//             >
//               {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>

//             {/* Desktop toggle */}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hidden lg:block"
//             >
//               {sidebarCollapsed ? (
//                 <ChevronRight className="w-6 h-6" />
//               ) : (
//                 <ChevronLeft className="w-6 h-6" />
//               )}
//             </button>

//             <div className="flex items-center ml-2 cursor-pointer hover:opacity-80">
//               <Calendar className="w-8 h-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
//                 Campus<span className="text-blue-600"> Sync</span>
//               </span>
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             {/* Search bar */}
//             <div className="relative hidden md:block">
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//             </div>

//             {/* Notifications */}
//             <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
//               <Bell className="w-6 h-6 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* User Section */}
//             {authData?.user ? (
//               <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
//                 <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   {getInitials(authData.user.name)}
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-gray-900">
//                     {authData.user.name}
//                   </p>
//                   <p className="text-xs text-gray-500 capitalize">
//                     {authData.user.role}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   Sign In
//                 </button>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   Get Started
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };






import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronLeft, ChevronRight, Calendar, Search, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { useLayout } from './DashboardLayout';

import { useIsAuthQuery, useLogoutMutation } from '../../state/api';

const Navbar = () => {
  const navigate = useNavigate();
  
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout();
  
  const { data: authData, refetch } = useIsAuthQuery();
  const [logout] = useLogoutMutation();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await refetch()
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hidden lg:block"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <ChevronLeft className="w-6 h-6" />
              )}
            </button>

            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center ml-2 cursor-pointer hover:opacity-80"
            >
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Campus<span className="text-blue-600"> Sync</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search events..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            {authData?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 pl-2 border-l border-gray-200 focus:outline-none cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {getInitials(authData.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {authData.user.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {authData.user.role}
                    </p>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-white">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {authData.user.name}
                    </p>
                    <p className="text-xs text-gray-500">{authData.user.email}</p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/signin')}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









// import { useState } from 'react';
// import { 
//   Calendar,
//   Bell, 
//   Search,
//   CalendarPlus,
//   Menu,
//   X,
//   User,
//   Settings,
//   LogOut,
//   ChevronDown
// } from 'lucide-react';

// // Mock data - replace with actual API calls
// const mockUser = {
//   name: "John Doe",
//   role: "Organizer",
//   email: "john@college.edu",
//   avatar: null
// };

// const Navbar = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isAuth, setIsAuth] = useState(true); // Replace with useIsAuthQuery()
  
//   // Replace these with actual API hooks
//   // const { data: authData } = useIsAuthQuery();
//   // const { data: profile } = useGetProfileQuery();
//   // const [logout] = useLogoutMutation();

//   const handleLogout = async () => {
//     try {
//       // await logout().unwrap();
//       console.log('Logout clicked');
//       setIsAuth(false);
//       // Redirect to login page
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const handleCreateEvent = () => {
//     console.log('Create event clicked');
//     // Navigate to create event page
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left Section - Logo & Menu Toggle */}
//           <div className="flex items-center gap-4">
//             {/* Mobile Menu Toggle */}
//             <button
//               onClick={onMobileMenuToggle}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-none"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>

//             {/* Logo */}
//             <div className="flex items-center gap-2 cursor-pointer">
//               <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
//                 <Calendar className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900 hidden sm:block">
//                 Campus<span className="text-blue-600">Sync</span>
//               </span>
//             </div>

//             {/* Create Event Button - Desktop */}
//             {isAuth && (
//               <button
//                 onClick={handleCreateEvent}
//                 className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ml-4"
//               >
//                 <CalendarPlus className="w-4 h-4" />
//                 <span>Create Event</span>
//               </button>
//             )}
//           </div>

//           {/* Center Section - Tagline (Hidden on mobile) */}
//           <div className="hidden lg:block">
//             <p className="text-gray-500 text-sm">
//               Streamline your college events with ease
//             </p>
//           </div>

//           {/* Right Section - Search, Notifications, Profile */}
//           <div className="flex items-center gap-3">
//             {isAuth ? (
//               <>
//                 {/* Search Bar - Hidden on mobile */}
//                 <div className="relative hidden md:block">
//                   <input
//                     type="text"
//                     placeholder="Search events..."
//                     className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
//                 </div>

//                 {/* Search Icon - Mobile */}
//                 <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
//                   <Search className="w-5 h-5 text-gray-600" />
//                 </button>

//                 {/* Notifications */}
//                 <button className="relative p-2 rounded-full hover:bg-gray-100">
//                   <Bell className="w-5 h-5 text-gray-600" />
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                 </button>

//                 {/* User Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="flex items-center gap-2 pl-2 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
//                   >
//                     {/* Avatar */}
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
//                       {getInitials(mockUser.name)}
//                     </div>
                    
//                     {/* Name & Role - Hidden on mobile */}
//                     <div className="hidden sm:block text-left pr-2">
//                       <p className="text-sm font-medium text-gray-900 leading-tight">
//                         {mockUser.name}
//                       </p>
//                       <p className="text-xs text-gray-500 leading-tight">
//                         {mockUser.role}
//                       </p>
//                     </div>

//                     <ChevronDown 
//                       className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${
//                         isDropdownOpen ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>

//                   {/* Dropdown Menu */}
//                   {isDropdownOpen && (
//                     <>
//                       {/* Backdrop */}
//                       <div
//                         className="fixed inset-0 z-10"
//                         onClick={() => setIsDropdownOpen(false)}
//                       ></div>

//                       {/* Dropdown Content */}
//                       <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
//                         {/* User Info - Mobile Only */}
//                         <div className="sm:hidden px-4 py-3 border-b border-gray-200">
//                           <p className="text-sm font-medium text-gray-900">
//                             {mockUser.name}
//                           </p>
//                           <p className="text-xs text-gray-500">{mockUser.email}</p>
//                           <p className="text-xs text-blue-600 mt-1">{mockUser.role}</p>
//                         </div>

//                         {/* Profile */}
//                         <button
//                           onClick={() => {
//                             console.log('Profile clicked');
//                             setIsDropdownOpen(false);
//                           }}
//                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <User className="w-4 h-4" />
//                           <span>My Profile</span>
//                         </button>

//                         {/* Settings */}
//                         <button
//                           onClick={() => {
//                             console.log('Settings clicked');
//                             setIsDropdownOpen(false);
//                           }}
//                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <Settings className="w-4 h-4" />
//                           <span>Settings</span>
//                         </button>

//                         <div className="border-t border-gray-200 my-1"></div>

//                         {/* Logout */}
//                         <button
//                           onClick={() => {
//                             setIsDropdownOpen(false);
//                             handleLogout();
//                           }}
//                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                           <LogOut className="w-4 h-4" />
//                           <span>Logout</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </>
//             ) : (
//               /* Auth Buttons - Not Logged In */
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => (window.location.href = '/login')}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   onClick={() => (window.location.href = '/register')}
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };