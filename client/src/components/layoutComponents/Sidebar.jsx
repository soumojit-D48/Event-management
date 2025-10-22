// import { Settings, LogOut } from "lucide-react";

// export default function Sidebar({ menuItems, activeTab, setActiveTab, sidebarOpen, setSidebarOpen, authData, logout  }) {
//   return (
//     <aside
//       className={`fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
//       transition-transform duration-300 ease-in-out ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0`}
//     >
//       <div className="h-full px-3 py-4 overflow-y-auto">
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
//                   activeTab === item.id
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 <item.icon className="w-5 h-5 mr-3" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-8 pt-4 border-t border-gray-200">
//           <ul className="space-y-1">
//             <li>
//               <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <Settings className="w-5 h-5 mr-3" />
//                 <span className="font-medium">Settings</span>
//               </button>
//             </li>
//             <li>
//               <button className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50">
//                 <LogOut className="w-5 h-5 mr-3" />
//                 <span className="font-medium">Logout</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </aside>
//   );
// }











// import { Settings, LogOut, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useIsAuthQuery, useLogoutMutation } from "@/state/api";

// export default function Sidebar({ 
//   menuItems, 
//   activeTab, 
//   setActiveTab, 
//   sidebarOpen, 
//   setSidebarOpen, 
//   authData, 
//   logout 
// }) {
//   const router = useNavigate();

//   const getInitials = (name) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleSettings = () => {
//     setActiveTab("settings");
//     setSidebarOpen(false);
//   };

//   return (

//     <>
//       {/* Backdrop overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-white bg-opacity-50 z-10 lg:hidden transition-opacity duration-300"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//     <aside
//       className={`fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
//       transition-transform duration-300 ease-in-out ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 flex flex-col`}
//     >
//       <div className="flex-1 px-3 py-4 overflow-y-auto">
//         {/* User Info Section */}
//         {authData && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             <div className="flex items-center space-x-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
//                   {getInitials(authData.name)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-gray-900 truncate">
//                   {authData.name}
//                 </p>
//                 <p className="text-xs text-gray-500 truncate capitalize">
//                   {authData.role}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
//                   activeTab === item.id
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
//                     : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
//                 }`}
//               >
//                 <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
//                 <span className="font-medium text-sm">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Section - Settings and Logout */}
//       <div className="border-t border-gray-200 p-3">
//         {/* {authData && (
//           <div className="mb-3 pb-3 border-b border-gray-200">
//             <div className="text-xs text-gray-500 px-4 mb-2">
//               <p className="truncate">{authData.email}</p>
//               {authData.department && (
//                 <p className="text-gray-400">{authData.department}</p>
//               )}
//             </div>
//           </div>
//         )} */}

//         <ul className="space-y-1">
//           <li>
//             <button
//               onClick={handleSettings}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
//                 activeTab === "settings"
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
//               <span className="font-medium text-sm">Settings</span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
//             >
//               <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
//               <span className="font-medium text-sm">Logout</span>
//             </button>
//           </li>
//         </ul>
//       </div>
//     </aside>

//     </>
//   );
// }





























// const Sidebar = ({ 
//   menuItems, 
//   activeTab, 
//   setActiveTab, 
//   sidebarOpen, 
//   setSidebarOpen,
//   sidebarCollapsed, // NEW
//   authData, 
//   logout 
// }) => {
//   // ... existing code ...

//   return (
//     <aside
//       className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
//       transition-all duration-300 ease-in-out flex flex-col
//       ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//       lg:translate-x-0
//       ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
//       w-64`}
//     >
//       <div className="flex-1 px-3 py-4 overflow-y-auto">
//         {/* User Info - Hidden when collapsed on desktop */}
//         {authData && !sidebarCollapsed && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             {/* existing user info */}
//           </div>
//         )}

//         {/* User Avatar Only - Shown when collapsed */}
//         {authData && sidebarCollapsed && (
//           <div className="hidden lg:flex mb-6 justify-center">
//             <Avatar className="h-10 w-10">
//               <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
//                 {getInitials(authData.name)}
//               </AvatarFallback>
//             </Avatar>
//           </div>
//         )}

//         {/* Menu Items */}
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 
//                   ${sidebarCollapsed ? 'lg:justify-center' : ''}
//                   ${
//                   activeTab === item.id
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
//                     : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
//                 }`}
//                 title={sidebarCollapsed ? item.label : ''}
//               >
//                 <item.icon className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//                 {!sidebarCollapsed && (
//                   <span className="font-medium text-sm">{item.label}</span>
//                 )}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t border-gray-200 p-3">
//         <ul className="space-y-1">
//           <li>
//             <button
//               onClick={handleSettings}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors 
//                 ${sidebarCollapsed ? 'lg:justify-center' : ''}
//                 ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
//               title={sidebarCollapsed ? 'Settings' : ''}
//             >
//               <Settings className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//               {!sidebarCollapsed && <span className="font-medium text-sm">Settings</span>}
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className={`flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 
//                 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
//               title={sidebarCollapsed ? 'Logout' : ''}
//             >
//               <LogOut className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//               {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
//             </button>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// };

















// const Sidebar = ({ 
//   menuItems, 
//   activeTab, 
//   setActiveTab, 
//   sidebarOpen, 
//   setSidebarOpen,
//   sidebarCollapsed 
// }) => {
//   // Hooks inside Sidebar
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

//   const handleSettings = () => {
//     setActiveTab('settings');
//     setSidebarOpen(false);
//   };

//   return (
//     <aside
//       className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
//       transition-all duration-300 ease-in-out flex flex-col
//       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//       lg:translate-x-0
//       ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
//       w-64`}
//     >
//       <div className="flex-1 px-3 py-4 overflow-y-auto">
//         {/* User Info - Full (not collapsed) */}
//         {authData?.user && !sidebarCollapsed && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             <div className="flex items-center space-x-3">
//               <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                 {getInitials(authData.user.name)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-gray-900 truncate">
//                   {authData.user.name}
//                 </p>
//                 <p className="text-xs text-gray-500 truncate capitalize">
//                   {authData.user.role}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* User Avatar Only - Collapsed */}
//         {authData?.user && sidebarCollapsed && (
//           <div className="hidden lg:flex mb-6 justify-center">
//             <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//               {getInitials(authData.user.name)}
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 
//                   ${sidebarCollapsed ? 'lg:justify-center' : ''}
//                   ${
//                   activeTab === item.id
//                     ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
//                     : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
//                 }`}
//                 title={sidebarCollapsed ? item.label : ''}
//               >
//                 <item.icon className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//                 {!sidebarCollapsed && (
//                   <span className="font-medium text-sm">{item.label}</span>
//                 )}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t border-gray-200 p-3">
//         <ul className="space-y-1">
//           <li>
//             <button
//               onClick={handleSettings}
//               className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200
//                 ${sidebarCollapsed ? 'lg:justify-center' : ''}
//                 ${
//                 activeTab === 'settings'
//                   ? 'bg-blue-50 text-blue-600'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               title={sidebarCollapsed ? 'Settings' : ''}
//             >
//               <Settings className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//               {!sidebarCollapsed && <span className="font-medium text-sm">Settings</span>}
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className={`flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200
//                 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
//               title={sidebarCollapsed ? 'Logout' : ''}
//             >
//               <LogOut className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//               {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
//             </button>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// };























import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  LogOut,
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  QrCode,
  MessageSquare,
  FileText,
  BarChart3,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// ✅ IMPORT CONTEXT
import { useLayout } from './DashboardLayout';

// ✅ IMPORT YOUR REAL HOOKS
import { useIsAuthQuery, useLogoutMutation } from '@/state/api';

const Sidebar = () => {
  const navigate = useNavigate();
  
  // ✅ Get sidebar state from Context
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, activeTab, setActiveTab } = useLayout();
  
  // ✅ Get auth data from YOUR hooks
  const { data: authData } = useIsAuthQuery();
  const [logout] = useLogoutMutation();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'events', icon: CalendarPlus, label: 'Events' },
    { id: 'registrations', icon: ClipboardList, label: 'Registrations' },
    { id: 'attendance', icon: QrCode, label: 'Attendance' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside
      className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
      transition-all duration-300 ease-in-out flex flex-col
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0
      ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
      w-64`}
    >
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {/* User Info - Full */}
        {authData?.user && !sidebarCollapsed && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
                  {getInitials(authData.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {authData.user.name}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {authData.user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Avatar Only - Collapsed */}
        {authData?.user && sidebarCollapsed && (
          <div className="hidden lg:flex mb-6 justify-center">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
                {getInitials(authData.user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Menu Items */}
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 
                  ${sidebarCollapsed ? 'lg:justify-center' : ''}
                  ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-3">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200
                ${sidebarCollapsed ? 'lg:justify-center' : ''}
                ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              title={sidebarCollapsed ? 'Settings' : ''}
            >
              <Settings className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span className="font-medium text-sm">Settings</span>}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200
                ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className={`w-5 h-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;