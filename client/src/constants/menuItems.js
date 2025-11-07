
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


export const menuItems = [
  // ✅ Visible to all roles
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "organizer", "feculty", "volunteer", "participant"],
  },
  {
    id: "events",
    icon: CalendarPlus,
    label: "All Events",
    path: "/events/all",
    roles: ["admin", "organizer", "feculty", "volunteer", "participant"],
  },

  // ✅ Admin-only
  {
    id: "manage-users",
    icon: ClipboardList,
    label: "Manage Users",
    path: "/admin/manage-users",
    roles: ["admin"],
  },
  {
    id: "approve-role",
    icon: MessageSquare,
    label: "Approve Roles",
    path: "/admin/approve-roles",
    roles: ["admin"],
  },

  // ✅ Organizer + Feculty + Volunteer ///events/manage/by-team
  {
    id: "my-events",
    icon: QrCode,
    label: "My Events",
    path: "/events/manage/my-events",
    roles: ["organizer"],
  },


  {
    id: "event-i-manage",
    icon: QrCode,
    label: "My Events",
    path: "/events/manage/by-team",
    roles: [ "feculty", "volunteer"],
  },

  // ✅ Participant-only
  {
    id: "registered-events",
    icon: FileText,
    label: "Events I Registered",
    path: "/events/my-registrations",
    roles: ["participant"],
  },

  {
    id: "budget-overview",
    icon: FileText,
    label: "Budget Overview",
    path: "/events/budget",
    roles: ["organizer", "feculty", "volunteer"],
  },

  {
    id: "registration-overview",
    icon: FileText,
    label: "Registration Overview",
    path: "/events/registrations",
    roles: ["organizer", "feculty", "volunteer"],
  }, 

  {
    id: "attendance-scan",
    icon: FileText,
    label: "Attendance Scan",
    path: "/events/attendance",
    roles: ["organizer", "feculty", "volunteer"],
  }, 

  {
    id: "attendance-overview",
    icon: FileText,
    label: "Attendance Overview",
    path: "/attendance/view",
    roles: ["organizer", "feculty", "volunteer"],
  }, // AttendanceOverview

  



  // ✅ Common items for all roles (optional)
  {
    id: "feedback",
    icon: MessageSquare,
    label: "Feedback",
    path: "/events/feedback",
    roles: ["admin", "organizer", "feculty", "volunteer", "participant"],
    // roles: ["admin", "organizer", "feculty", "volunteer", "participant"],
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
    path: "/reports",
    roles: ["admin", "organizer", "feculty", "volunteer"],
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
    roles: ["admin", "organizer"],
  },
];







  // const menuItems = [
  //   { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  //   { id: 'events', icon: CalendarPlus, label: 'Events' },
  //   { id: 'registrations', icon: ClipboardList, label: 'Registrations' },
  //   { id: 'attendance', icon: QrCode, label: 'Attendance' },
  //   { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
  //   { id: 'reports', icon: FileText, label: 'Reports' },
  //   { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  // ];

