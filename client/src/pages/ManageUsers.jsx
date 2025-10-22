// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import {
//   useGetPendingRequestsQuery,
//   useApproveRoleMutation,
//   useRejectRoleMutation,
//   useGetAllUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserRoleMutation,
// } from "@/state/api";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Shield, Search, Loader2, CheckCircle, XCircle } from "lucide-react";

// const ManageUsers = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState({});
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   // RTK Query hooks
//   const { data, error, isLoading } = useGetAllUsersQuery();
//   const [deleteRole, { isLoading: isDeleting }] = useDeleteUserMutation();
//   const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

//   const users = data?.users || [];

//   //   console.log(users, "usersssssssssssssssss");

//   // Filter users based on search query
// //   useEffect(() => {
// //     const filtered = users.filter(
// //       (user) =>
// //         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         user.email.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     setFilteredUsers(filtered);
// //   }, [searchQuery, users]);





//   // Handle role change in dropdown
// //   const handleRoleChange = (userId, value) => {
// //     setSelectedRoles((prev) => ({
// //       ...prev,
// //       [userId]: value,
// //     }));
// //   };

//   // Handle approve

//   //   const handleApprove = async (userId) => {
//   //     const newRole = selectedRoles[userId]

//   //     if (!newRole) {
//   //       toast.error('Please select a role')
//   //       return
//   //     }

//   //     try {
//   //       const result = await approveRole(userId).unwrap()
//   //       toast.success(result.message || 'Role approved successfully')
//   //       // Clear the selected role
//   //       setSelectedRoles((prev) => {
//   //         const updated = { ...prev }
//   //         delete updated[userId]
//   //         return updated
//   //       })
//   //     } catch (error) {
//   //       toast.error(error.data?.message || 'Failed to approve role')
//   //     }
//   //   }

//   //   // Handle reject
//   //   const handleReject = async (userId) => {
//   //     try {
//   //       const result = await rejectRole(userId).unwrap()
//   //       toast.success('Role request rejected')
//   //       // Clear the selected role
//   //       setSelectedRoles((prev) => {
//   //         const updated = { ...prev }
//   //         delete updated[userId]
//   //         return updated
//   //       })
//   //     } catch (error) {
//   //       toast.error(error.data?.message || 'Failed to reject role')
//   //     }
//   //   }

//   // Handle approve function
  
  
// //   const handleApprove = async (userId, userName) => {
// //     try {
// //       const result = await approveRole(userId).unwrap();
// //       toast.success(`${userName}'s role has been approved`);
// //     } catch (error) {
// //       toast.error(error.data?.message || "Failed to approve role");
// //     }
// //   };

// //   // Handle reject function
// //   const handleReject = async (userId, userName) => {
// //     try {
// //       const result = await rejectRole(userId).unwrap();
// //       toast.success(`${userName}'s role request has been rejected`);
// //     } catch (error) {
// //       toast.error(error.data?.message || "Failed to reject role");
// //     }
// //   };

// //   // Loading state
// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
// //         <div className="flex flex-col items-center gap-4">
// //           <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
// //           <p className="text-slate-600">Loading pending requests...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
// //         <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200 max-w-md">
// //           <div className="flex items-center gap-3 mb-4">
// //             <XCircle className="h-6 w-6 text-red-600" />
// //             <h2 className="text-xl font-bold text-red-600">
// //               Error Loading Data
// //             </h2>
// //           </div>
// //           <p className="text-slate-600">
// //             {error.data?.message || "Failed to load pending requests"}
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
// //       {/* Header */}
// //       <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="flex items-center gap-3">
// //             <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
// //               <Shield className="h-6 w-6 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
// //                 User Role Management
// //               </h1>
// //               <p className="text-slate-600 mt-1">
// //                 Approve and manage user role assignments
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="bg-white rounded-xl shadow-lg border border-slate-200">
// //           {/* Search Bar */}
// //           <div className="p-6 border-b border-slate-200">
// //             <div className="relative max-w-md">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
// //               <Input
// //                 type="text"
// //                 placeholder="Search by name or email..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="pl-10"
// //               />
// //             </div>
// //           </div>

// //           {/* Users Table */}
// //           {filteredUsers.length > 0 ? (
// //             <div className="overflow-x-auto">
// //               {/* <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>User</TableHead>
// //                     <TableHead>Current Role</TableHead>
// //                     <TableHead>Requested Role</TableHead>
// //                     <TableHead>Department</TableHead>
// //                     <TableHead>Assign Role</TableHead>
// //                     <TableHead>Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredUsers.map((user) => (
// //                     <TableRow
// //                       key={user._id}
// //                       className="hover:bg-slate-50 transition-colors"
// //                     >
// //                       <TableCell>
// //                         <div>
// //                           <div className="font-medium text-slate-900">
// //                             {user.name}
// //                           </div>
// //                           <div className="text-sm text-slate-500">
// //                             {user.email}
// //                           </div>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={getRoleBadgeVariant(user.role)}>
// //                           {user.role || 'participant'}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>
// //                         {user.requestedRole ? (
// //                           <Badge
// //                             variant="outline"
// //                             className="border-amber-500 text-amber-600 bg-amber-50"
// //                           >
// //                             {user.requestedRole}
// //                           </Badge>
// //                         ) : (
// //                           <span className="text-slate-400 text-sm">—</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="text-slate-600">
// //                         {user.department || '—'}
// //                       </TableCell>
// //                       <TableCell>
// //                         <Select
// //                           value={
// //                             selectedRoles[user._id] ||
// //                             user.requestedRole ||
// //                             user.role ||
// //                             'participant'
// //                           }
// //                           onValueChange={(value) =>
// //                             handleRoleChange(user._id, value)
// //                           }
// //                           disabled={isApproving || isRejecting}
// //                         >
// //                           <SelectTrigger className="w-[150px]">
// //                             <SelectValue />
// //                           </SelectTrigger>
// //                           <SelectContent>
// //                             <SelectItem value="participant">
// //                               Participant
// //                             </SelectItem>
// //                             <SelectItem value="organizer">
// //                               Organizer
// //                             </SelectItem>
// //                             <SelectItem value="faculty">Faculty</SelectItem>
// //                             <SelectItem value="admin">Admin</SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                       </TableCell>
// //                       <TableCell className="space-x-2">
// //                         <Button
// //                           size="sm"
// //                           onClick={() => handleApprove(user._id)}
// //                           className="gap-2 bg-green-600 hover:bg-green-700"
// //                           disabled={isApproving || isRejecting}
// //                         >
// //                           {isApproving ? (
// //                             <>
// //                               <Loader2 className="h-4 w-4 animate-spin" />
// //                               Approving...
// //                             </>
// //                           ) : (
// //                             <>
// //                               <CheckCircle className="h-4 w-4" />
// //                               Approve
// //                             </>
// //                           )}
// //                         </Button>
// //                         <Button
// //                           size="sm"
// //                           onClick={() => handleReject(user._id)}
// //                           variant="destructive"
// //                           className="gap-2"
// //                           disabled={isApproving || isRejecting}
// //                         >
// //                           {isRejecting ? (
// //                             <>
// //                               <Loader2 className="h-4 w-4 animate-spin" />
// //                               Rejecting...
// //                             </>
// //                           ) : (
// //                             <>
// //                               <XCircle className="h-4 w-4" />
// //                               Reject
// //                             </>
// //                           )}
// //                         </Button>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table> */}

// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>User</TableHead>
// //                     <TableHead>Current Role</TableHead>
// //                     <TableHead>Requested Role</TableHead>
// //                     <TableHead>Actions</TableHead>
// //                     <TableHead>Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredUsers.map((user) => (
// //                     <TableRow key={user._id} className="hover:bg-slate-50">
// //                       <TableCell>
// //                         <div>
// //                           <div className="font-medium text-slate-900">
// //                             {user.name}
// //                           </div>
// //                           <div className="text-sm text-slate-500">
// //                             {user.email}
// //                           </div>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant="secondary">
// //                           {user.role || "participant"}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>
// //                         {user.requestedRole ? (
// //                           <Badge
// //                             variant="outline"
// //                             className="border-amber-500 text-amber-600"
// //                           >
// //                             {user.requestedRole}
// //                           </Badge>
// //                         ) : (
// //                           <span className="text-slate-400">—</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="space-x-2">
// //                         <Button
// //                           size="sm"
// //                           onClick={() => handleApprove(user._id, user.name)}
// //                           className="gap-2 bg-green-600 hover:bg-green-700"
// //                           disabled={isApproving || isRejecting}
// //                         >
// //                           {isApproving ? (
// //                             <>
// //                               <Loader2 className="h-4 w-4 animate-spin" />
// //                               Approving...
// //                             </>
// //                           ) : (
// //                             <>
// //                               <CheckCircle className="h-4 w-4" />
// //                               Approve
// //                             </>
// //                           )}
// //                         </Button>
// //                       </TableCell>
// //                       <TableCell className="space-x-2">
// //                         <Button
// //                           size="sm"
// //                           onClick={() => handleReject(user._id, user.name)}
// //                           variant="destructive"
// //                           className="gap-2 bg-red-600 hover:bg-red-700"
// //                           disabled={isApproving || isRejecting}
// //                         >
// //                           {isRejecting ? (
// //                             <>
// //                               <Loader2 className="h-4 w-4 animate-spin" />
// //                               Rejecting...
// //                             </>
// //                           ) : (
// //                             <>
// //                               <XCircle className="h-4 w-4" />
// //                               Reject
// //                             </>
// //                           )}
// //                         </Button>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </div>
// //           ) : (
// //             <div className="py-12 text-center text-slate-500">
// //               {users.length === 0
// //                 ? "No pending requests"
// //                 : "No users found matching your search."}
// //             </div>
// //           )}
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
// //           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
// //             <div className="text-2xl font-bold text-amber-600">
// //               {users.length}
// //             </div>
// //             <div className="text-sm text-slate-600 mt-1">
// //               Pending Role Requests
// //             </div>
// //           </div>
// //           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
// //             <div className="text-2xl font-bold text-purple-600">
// //               {
// //                 users.filter(
// //                   (u) => u.requestedRole && u.requestedRole !== u.role
// //                 ).length
// //               }
// //             </div>
// //             <div className="text-sm text-slate-600 mt-1">Role Changes</div>
// //           </div>
// //           <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
// //             <div className="text-2xl font-bold text-blue-600">
// //               {users.filter((u) => u.department).length}
// //             </div>
// //             <div className="text-sm text-slate-600 mt-1">
// //               Users with Department
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// };

// export default ApproveRole;














import React, { useState, useEffect } from 'react';
import { Loader2, XCircle, Shield, Search, Trash2, UserCog } from 'lucide-react';
import { toast } from 'sonner';

// Import your RTK Query hooks
import { 
  useGetAllUsersQuery, 
  useUpdateUserRoleMutation, 
  useDeleteUserMutation 
} from '@/state/api';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

// Import shadcn components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);

  // RTK Query hooks
  const { data, error, isLoading } = useGetAllUsersQuery();
  const [updateUserRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = data?.users || [];

  // Filter users based on search query
  useEffect(() => {
    if (!users.length && !searchQuery) return; // important to avoid filtering on empty data

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Handle role change in dropdown
  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  // Handle update role function
  const handleUpdateRole = async (userId, userName) => {
    const newRole = selectedRoles[userId];
    
    if (!newRole) {
      toast.error('Please select a role first');
      return;
    }

    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      toast.success(`${userName}'s role has been updated to ${newRole}`);
      // Reset selected role after successful update
      setSelectedRoles((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    } catch (error) {
      toast.error(error.data?.message || 'Failed to update role');
    }
  };

  // Handle delete user function
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    try {
      await deleteUser(userId).unwrap();
      toast.success(`${userName} has been deleted successfully`);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete user');
    }
  };

  // Get badge variant based on role
  const getRoleBadgeVariant = (role) => {
    const variants = {
      admin: 'destructive',
      organizer: 'default',
      faculty: 'secondary',
      volunteer: 'outline',
      participant: 'secondary',
    };
    return variants[role] || 'secondary';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-slate-600">Loading users...</p>
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
            <h2 className="text-xl font-bold text-red-600">Error Loading Data</h2>
          </div>
          <p className="text-slate-600">
            {error.data?.message || 'Failed to load users'}
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
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Manage Users
              </h1>
              <p className="text-slate-600 mt-1">
                View, update, and manage all users in the system
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
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">


              {/* <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Current Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Requested Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Update Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {user.phone || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {user.department || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role || 'participant'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isApproved ? (
                          <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50">
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Select
                            value={selectedRoles[user._id] || user.role || 'participant'}
                            onValueChange={(value) => handleRoleChange(user._id, value)}
                            disabled={isUpdating || isDeleting}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="participant">Participant</SelectItem>
                              <SelectItem value="volunteer">Volunteer</SelectItem>
                              <SelectItem value="organizer">Organizer</SelectItem>
                              <SelectItem value="faculty">Faculty</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateRole(user._id, user.name)}
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                            disabled={isUpdating || isDeleting || !selectedRoles[user._id]}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              <>
                                <UserCog className="h-4 w-4" />
                                Update
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          variant="destructive"
                          className="gap-2 bg-red-600 hover:bg-red-700"
                          disabled={isUpdating || isDeleting}
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}



               <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead>Requested Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id} className="hover:bg-slate-50 transition-colors">
              <TableCell>
                <div>
                  <div className="font-medium text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </div>
              </TableCell>

              <TableCell className="text-slate-600">
                {user.phone || "—"}
              </TableCell>

              <TableCell className="text-slate-600">
                {user.department || "—"}
              </TableCell>

              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role || "participant"}
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

              <TableCell>
                {user.isApproved ? (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600 bg-green-50"
                  >
                    Approved
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-orange-500 text-orange-600 bg-orange-50"
                  >
                    Pending
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedRoles[user._id] || user.role || "participant"}
                    onValueChange={(value) => handleRoleChange(user._id, value)}
                    disabled={isUpdating || isDeleting}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participant">Participant</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="organizer">Organizer</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    size="sm"
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleUpdateRole(user._id, user.name)}
                    disabled={isUpdating || isDeleting || !selectedRoles[user._id]}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <UserCog className="h-4 w-4" />
                        Update
                      </>
                    )}
                  </Button>
                </div>
              </TableCell>

              <TableCell
              >
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-2 bg-red-600 hover:bg-red-700"
                  onClick={() => handleDeleteUser(user._id, user.name)}
                  disabled={isUpdating || isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
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
                ? 'No users found'
                : 'No users found matching your search.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;






