// import { useState } from "react";
// import { Search, UserCheck, Shield } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {toast} from 'sonner'

// import { useApproveRoleMutation, useGetPendingRequestsQuery, useRejectRoleMutation } from "@/state/api";

// const mockUsers = [
//   {
//     id: "1",
//     name: "Rahul Sharma",
//     email: "rahul.sharma@college.edu",
//     currentRole: "participant",
//     requestedRole: "organizer",
//     status: "pending",
//     joinedDate: "2025-01-15",
//   },
//   {
//     id: "2",
//     name: "Priya Patel",
//     email: "priya.patel@college.edu",
//     currentRole: "participant",
//     requestedRole: "faculty",
//     status: "pending",
//     joinedDate: "2025-01-20",
//   },
//   {
//     id: "3",
//     name: "Amit Kumar",
//     email: "amit.kumar@college.edu",
//     currentRole: "organizer",
//     status: "approved",
//     joinedDate: "2024-12-10",
//   },
//   {
//     id: "4",
//     name: "Sneha Reddy",
//     email: "sneha.reddy@college.edu",
//     currentRole: "participant",
//     requestedRole: "organizer",
//     status: "pending",
//     joinedDate: "2025-02-01",
//   },
//   {
//     id: "5",
//     name: "Dr. Rajesh Verma",
//     email: "rajesh.verma@college.edu",
//     currentRole: "faculty",
//     status: "approved",
//     joinedDate: "2024-09-01",
//   },
// ];

// const ApproveRole = () => {
// //   const [users, setUsers] = useState(mockUsers);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedRoles, setSelectedRoles] = useState({});

// //   const filteredUsers = users.filter(
// //     (user) =>
// //       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       user.email.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const handleRoleChange = (userId, newRole) => {
// //     setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
// //   };

// //   const handleApprove = (userId) => {
// //     const newRole = selectedRoles[userId];

// //     setUsers((prevUsers) =>
// //       prevUsers.map((user) =>
// //         user.id === userId
// //           ? {
// //               ...user,
// //               currentRole: newRole || user.requestedRole || user.currentRole,
// //               status: "approved",
// //               requestedRole: undefined,
// //             }
// //           : user
// //       )
// //     );

// //     toast({
// //       title: "User Approved",
// //       description: `Role updated successfully to ${newRole || "requested role"}`,
// //     });

// //     setSelectedRoles((prev) => {
// //       const updated = { ...prev };
// //       delete updated[userId];
// //       return updated;
// //     });
// //   };

// //   const getRoleBadgeVariant = (role) => {
// //     switch (role) {
// //       case "admin":
// //         return "destructive";
// //       case "faculty":
// //         return "default";
// //       case "organizer":
// //         return "secondary";
// //       default:
// //         return "outline";
// //     }
// //   };

// //   const getStatusBadgeVariant = (status) => {
// //     return status === "approved" ? "default" : "outline";
// //   };

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState({});

//   const { data, error, isLoading } = useGetPendingRequestsQuery();
//   const users = data?.users || [];

//   const [approveRole] = useApproveRoleMutation()
//   const [rejectRole] = useRejectRoleMutation()

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
//       {/* Header */}
//       <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
//               <Shield className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
//                 User Role Management
//               </h1>
//               <p className="text-slate-600 mt-1">
//                 Approve and manage user role assignments
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-lg border border-slate-200">
//           {/* Search Bar */}
//           <div className="p-6 border-b border-slate-200">
//             <div className="relative max-w-md">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Current Role</TableHead>
//                   <TableHead>Requested Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Assign Role</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow
//                     key={user.id}
//                     className="hover:bg-slate-50 transition-colors"
//                   >
//                     <TableCell>
//                       <div>
//                         <div className="font-medium text-slate-900">
//                           {user.name}
//                         </div>
//                         <div className="text-sm text-slate-500">
//                           {user.email}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={getRoleBadgeVariant(user.currentRole)}>
//                         {user.currentRole}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {user.requestedRole ? (
//                         <Badge
//                           variant="outline"
//                           className="border-amber-500 text-amber-600 bg-amber-50"
//                         >
//                           {user.requestedRole}
//                         </Badge>
//                       ) : (
//                         <span className="text-slate-400 text-sm">—</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={getStatusBadgeVariant(user.status)}>
//                         {user.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Select
//                         value={
//                           selectedRoles[user.id] ||
//                           user.requestedRole ||
//                           user.currentRole
//                         }
//                         onValueChange={(value) =>
//                           handleRoleChange(user.id, value)
//                         }
//                       >
//                         <SelectTrigger className="w-[150px]">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="participant">Participant</SelectItem>
//                           <SelectItem value="organizer">Organizer</SelectItem>
//                           <SelectItem value="faculty">Faculty</SelectItem>
//                           <SelectItem value="admin">Admin</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         size="sm"
//                         onClick={() => handleApprove(user.id)}
//                         className="gap-2"
//                         disabled={
//                           user.status === "approved" && !selectedRoles[user.id]
//                         }
//                       >
//                         <UserCheck className="h-4 w-4" />
//                         {user.status === "pending" ? "Approve" : "Update"}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {filteredUsers.length === 0 && (
//             <div className="py-12 text-center text-slate-500">
//               No users found matching your search.
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="text-2xl font-bold text-amber-600">
//               {users.filter((u) => u.status === "pending").length}
//             </div>
//             <div className="text-sm text-slate-600 mt-1">Pending Approvals</div>
//           </div>
//           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="text-2xl font-bold text-green-600">
//               {users.filter((u) => u.status === "approved").length}
//             </div>
//             <div className="text-sm text-slate-600 mt-1">Approved Users</div>
//           </div>
//           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="text-2xl font-bold text-purple-600">
//               {users.length}
//             </div>
//             <div className="text-sm text-slate-600 mt-1">Total Users</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApproveRole;

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetPendingRequestsQuery,
  useApproveRoleMutation,
  useRejectRoleMutation,
} from "@/state/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Search, Loader2, CheckCircle, XCircle } from "lucide-react";

const ApproveRole = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);

  // RTK Query hooks
  const { data, error, isLoading } = useGetPendingRequestsQuery();
  const [approveRole, { isLoading: isApproving }] = useApproveRoleMutation();
  const [rejectRole, { isLoading: isRejecting }] = useRejectRoleMutation();

  const users = data?.users || [];

  //   console.log(users, "usersssssssssssssssss");

  // Filter users based on search query
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Handle approve function
  const handleApprove = async (userId, userName) => {
    try {
      const result = await approveRole(userId).unwrap();
      toast.success(`${userName}'s role has been approved`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to approve role");
    }
  };

  // Handle reject function
  const handleReject = async (userId, userName) => {
    try {
      const result = await rejectRole(userId).unwrap();
      toast.success(`${userName}'s role request has been rejected`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to reject role");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-slate-600">Loading pending requests...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-600">
              Error Loading Data
            </h2>
          </div>
          <p className="text-slate-600">
            {error.data?.message || "Failed to load pending requests"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                User Role Management
              </h1>
              <p className="text-slate-600 mt-1">
                Approve and manage user role assignments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          {/* Search Bar */}
          <div className="p-6 border-b border-slate-200">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              {/* <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Requested Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assign Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role || 'participant'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.requestedRole ? (
                          <Badge
                            variant="outline"
                            className="border-amber-500 text-amber-600 bg-amber-50"
                          >
                            {user.requestedRole}
                          </Badge>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.department || '—'}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={
                            selectedRoles[user._id] ||
                            user.requestedRole ||
                            user.role ||
                            'participant'
                          }
                          onValueChange={(value) =>
                            handleRoleChange(user._id, value)
                          }
                          disabled={isApproving || isRejecting}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="participant">
                              Participant
                            </SelectItem>
                            <SelectItem value="organizer">
                              Organizer
                            </SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user._id)}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                          disabled={isApproving || isRejecting}
                        >
                          {isApproving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReject(user._id)}
                          variant="destructive"
                          className="gap-2"
                          disabled={isApproving || isRejecting}
                        >
                          {isRejecting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4" />
                              Reject
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Requested Role</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id} className="hover:bg-slate-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {user.role || "participant"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.requestedRole ? (
                          <Badge
                            variant="outline"
                            className="border-amber-500 text-amber-600"
                          >
                            {user.requestedRole}
                          </Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user._id, user.name)}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                          disabled={isApproving || isRejecting}
                        >
                          {isApproving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleReject(user._id, user.name)}
                          variant="destructive"
                          className="gap-2 bg-red-600 hover:bg-red-700"
                          disabled={isApproving || isRejecting}
                        >
                          {isRejecting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4" />
                              Reject
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">
              {users.length === 0
                ? "No pending requests"
                : "No users found matching your search."}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-amber-600">
              {users.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Pending Role Requests
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-purple-600">
              {
                users.filter(
                  (u) => u.requestedRole && u.requestedRole !== u.role
                ).length
              }
            </div>
            <div className="text-sm text-slate-600 mt-1">Role Changes</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.department).length}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Users with Department
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveRole;
