


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, Search, Bell, RefreshCcw } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { useIsAuthQuery, useLogoutMutation } from '../../state/api';

// // ============ SIMPLE NAVBAR (No Sidebar Toggle) ============
// const SimpleNavbar = () => {
//   const navigate = useNavigate();
//   const { data: authData, refetch } = useIsAuthQuery();
//   const [logout] = useLogoutMutation();

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase();
//   };

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       refetch()
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div
//               onClick={() => navigate('/')}
//               className="flex items-center cursor-pointer hover:opacity-80"
//             >
//               <Calendar className="w-8 h-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
//                 Campus<span className="text-blue-600"> Sync</span>
//               </span>
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             {/* Only show search if authenticated */}
//             {authData?.user && (
//               <div className="relative hidden md:block">
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//               </div>
//             )}

//             {/* Notifications - only if authenticated */}
//             {authData?.user && (
//               <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
//                 <Bell className="w-6 h-6 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//             )}

//             {/* User Section or Auth Buttons */}
//             {authData?.user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger className="flex items-center space-x-2 pl-2 border-l border-gray-200 focus:outline-none cursor-pointer">
//                   <Avatar className="h-8 w-8">
//                     <AvatarFallback className="bg-blue-600 text-white font-semibold">
//                       {getInitials(authData.user.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="hidden sm:block">
//                     <p className="text-sm font-medium text-gray-900">
//                       {authData.user.name}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">
//                       {authData.user.role}
//                     </p>
//                   </div>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent className="w-56 bg-white">
//                   <div className="px-4 py-3">
//                     <p className="text-sm font-medium text-gray-900">
//                       {authData.user.name}
//                     </p>
//                     <p className="text-xs text-gray-500">{authData.user.email}</p>
//                   </div>

//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem onClick={() => navigate('/dashboard')}>
//                     Go to Dashboard
//                   </DropdownMenuItem>

//                   <DropdownMenuItem onClick={() => navigate('/profile')}>
//                     My Profile
//                   </DropdownMenuItem>

//                   <DropdownMenuItem onClick={() => navigate('/settings')}>
//                     Settings
//                   </DropdownMenuItem>

//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem
//                     className="text-red-600"
//                     onClick={handleLogout}
//                   >
//                     Sign Out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => navigate('/signin')}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
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

// // ============ LAYOUT COMPONENT (For Landing/Auth Pages) ============
// const Layout = ({ children, showNavFooter = true }) => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {showNavFooter && <SimpleNavbar />}
      
//       <main className="flex-1">
//         {children}
//       </main>

//       {showNavFooter && (
//         <footer className="bg-gray-900 text-gray-400 py-8 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid md:grid-cols-4 gap-8 mb-8">
//               <div>
//                 <div className="flex items-center space-x-2 mb-4">
//                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                     <Calendar className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-xl font-bold text-white">Campus Sync</span>
//                 </div>
//                 <p className="text-gray-400">
//                   Transforming college event management through technology
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-4">Product</h4>
//                 <div className="space-y-2">
//                   <a href="#features" className="block text-gray-400 hover:text-white transition-colors">
//                     Features
//                   </a>
//                   <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">
//                     Pricing
//                   </a>
//                   <a href="#demo" className="block text-gray-400 hover:text-white transition-colors">
//                     Demo
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-4">Company</h4>
//                 <div className="space-y-2">
//                   <a href="#about" className="block text-gray-400 hover:text-white transition-colors">
//                     About
//                   </a>
//                   <a href="#blog" className="block text-gray-400 hover:text-white transition-colors">
//                     Blog
//                   </a>
//                   <a href="#careers" className="block text-gray-400 hover:text-white transition-colors">
//                     Careers
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-4">Support</h4>
//                 <div className="space-y-2">
//                   <a href="#help" className="block text-gray-400 hover:text-white transition-colors">
//                     Help Center
//                   </a>
//                   <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
//                     Contact
//                   </a>
//                   <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">
//                     Privacy
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="pt-8 border-t border-gray-700 text-center">
//               <p>© 2025 Campus Sync. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       )}
//     </div>
//   );
// };

// export default Layout;






















import React from 'react';
import SimpleNavbar from './SimpleNavbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;