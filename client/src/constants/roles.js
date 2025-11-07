// export const ROLES = {
//   ORGANIZER: 'organizer',
// //   COORDINATOR: 'coordinator',
//   FECULTY: 'fEculty',
//   VOLUNTEER: 'volunteer',
//   PARTICIPANT: 'participant',
// };

// // Role hierarchy and permissions
// export const ROLE_PERMISSIONS = {
//   [ROLES.ORGANIZER]: {
//     label: 'Organizer',
//     level: 5,
//     canManageEvents: true,
//     canManageUsers: true,
//     canViewReports: true,
//     canManageAttendance: true,
//   },
// //   [ROLES.COORDINATOR]: {
// //     label: 'Coordinator',
// //     level: 4,
// //     canManageEvents: true,
// //     canManageUsers: false,
// //     canViewReports: true,
// //     canManageAttendance: true,
// //   },
//   [ROLES.FECULTY]: {
//     label: 'FEculty',
//     level: 3,
//     canManageEvents: true,
//     canManageUsers: false,
//     canViewReports: true,
//     canManageAttendance: true,
//   },
//   [ROLES.VOLUNTEER]: {
//     label: 'Volunteer',
//     level: 2,
//     canManageEvents: false,
//     canManageUsers: false,
//     canViewReports: false,
//     canManageAttendance: true,
//   },
//   [ROLES.PARTICIPANT]: {
//     label: 'Participant',
//     level: 1,
//     canManageEvents: false,
//     canManageUsers: false,
//     canViewReports: false,
//     canManageAttendance: false,
//   },
// };









// Role constants matching your MongoDB schema
export const ROLES = {
  ADMIN: 'admin',
  ORGANIZER: 'organizer',
  FECULTY: 'feculty',
  VOLUNTEER: 'volunteer',
  PARTICIPANT: 'participant',
};

// Role hierarchy and permissions
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    label: 'Admin',
    level: 6,
    canManageEvents: true,
    canManageUsers: true,
    canApproveRoles: true,
    canViewReports: true,
    canManageAttendance: true,
    canManageBudget: true,
    canGenerateCertificates: true,
  },
  [ROLES.ORGANIZER]: {
    label: 'Organizer',
    level: 5,
    canManageEvents: true,
    canManageUsers: true,
    canApproveRoles: true,
    canViewReports: true,
    canManageAttendance: true,
    canManageBudget: true,
    canGenerateCertificates: true,
  },
  [ROLES.FECULTY]: {
    label: 'FEculty',
    level: 4,
    canManageEvents: true,
    canManageUsers: false,
    canApproveRoles: false,
    canViewReports: true,
    canManageAttendance: true,
    canManageBudget: true,
    canGenerateCertificates: true,
  },
  [ROLES.VOLUNTEER]: {
    label: 'Volunteer',
    level: 3,
    canManageEvents: false,
    canManageUsers: false,
    canApproveRoles: false,
    canViewReports: false,
    canManageAttendance: true,
    canManageBudget: false,
    canGenerateCertificates: false,
  },
  [ROLES.PARTICIPANT]: {
    label: 'Participant',
    level: 2,
    canManageEvents: false,
    canManageUsers: false,
    canApproveRoles: false,
    canViewReports: false,
    canManageAttendance: false,
    canManageBudget: false,
    canGenerateCertificates: false,
  },
};

// Requestable roles (roles that users can request to upgrade to)
export const REQUESTABLE_ROLES = [
  ROLES.ORGANIZER,
  ROLES.FECULTY,
  ROLES.VOLUNTEER,
];

// Helper function to check if a role can perform an action
export const canPerformAction = (userRole, action) => {
  return ROLE_PERMISSIONS[userRole]?.[action] || false;
};

// Helper function to check if role A has higher permissions than role B
export const hasHigherRole = (roleA, roleB) => {
  const levelA = ROLE_PERMISSIONS[roleA]?.level || 0;
  const levelB = ROLE_PERMISSIONS[roleB]?.level || 0;
  return levelA > levelB;
};

// Helper function to get role label
export const getRoleLabel = (role) => {
  return ROLE_PERMISSIONS[role]?.label || 'Unknown';
};

// Helper function to check if a role is requestable
export const isRequestableRole = (role) => {
  return REQUESTABLE_ROLES.includes(role);
};