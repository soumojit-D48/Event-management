

// import { useGetEventAttendanceQuery } from '@/state/api'
// import React from 'react'
// import { useParams } from 'react-router-dom'

// const AttendanceEvent = () => {
//     const {eventId} = useParams()
//     const {data} = useGetEventAttendanceQuery(eventId)
//     console.log(data);
    
//   return (
//     <div>AttendanceEvent</div>
//   )
// }

// export default AttendanceEvent















import { useState, useMemo } from 'react';
import { Download, Loader2, AlertCircle, Search, UserCheck, Clock, CheckCircle, Users } from 'lucide-react';

// Mock hook - replace with your actual import
import { useParams } from 'react-router-dom';
import { useGetEventAttendanceQuery } from '@/state/api';

// Mock data for demonstration
// const mockAttendanceData = {
//   success: true,
//   data: [
//     {
//       _id: "att1",
//       participant: {
//         _id: "p1",
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "1234567890",
//         department: "Computer Science"
//       },
//       verifiedBy: {
//         _id: "v1",
//         name: "Admin User",
//         email: "admin@example.com",
//         role: "organizer"
//       },
//       checkInTime: "2025-11-07T10:30:00.000Z",
//       event: "690c8ad957be69751b1b5270"
//     },
//     {
//       _id: "att2",
//       participant: {
//         _id: "p2",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         phone: "9876543210",
//         department: "Electronics"
//       },
//       verifiedBy: {
//         _id: "v2",
//         name: "Volunteer One",
//         email: "volunteer@example.com",
//         role: "volunteer"
//       },
//       checkInTime: "2025-11-07T11:15:00.000Z",
//       event: "690c8ad957be69751b1b5270"
//     },
//     {
//       _id: "att3",
//       participant: {
//         _id: "p3",
//         name: "Alice Johnson",
//         email: "alice@example.com",
//         phone: "5551234567",
//         department: "Mechanical"
//       },
//       verifiedBy: {
//         _id: "v1",
//         name: "Admin User",
//         email: "admin@example.com",
//         role: "organizer"
//       },
//       checkInTime: "2025-11-07T09:45:00.000Z",
//       event: "690c8ad957be69751b1b5270"
//     }
//   ],
//   count: 3
// };




export default function EventAttendance() {
  // Replace with actual hooks
  const { eventId } = useParams();
  const { data: responseData, isLoading, error } = useGetEventAttendanceQuery(eventId);
  
//   const eventId = "690c8ad957be69751b1b5270";
//   const responseData = mockAttendanceData;
//   const isLoading = false;
//   const error = null;
  
  const attendances = responseData?.data || [];
  
  const [sortBy, setSortBy] = useState('checkInTime');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter attendance by search term
  const filteredAttendances = useMemo(() => {
    return attendances.filter((att) =>
      att.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.participant.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.verifiedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [attendances, searchTerm]);

  // Sort attendances
  const sortedAttendances = useMemo(() => {
    return [...filteredAttendances].sort((a, b) => {
      if (sortBy === 'checkInTime') {
        return new Date(b.checkInTime) - new Date(a.checkInTime);
      }
      if (sortBy === 'name') {
        return a.participant.name.localeCompare(b.participant.name);
      }
      if (sortBy === 'department') {
        return a.participant.department.localeCompare(b.participant.department);
      }
      return 0;
    });
  }, [filteredAttendances, sortBy]);

  const exportToCSV = () => {
    const headers = [
      'Participant Name',
      'Email',
      'Phone',
      'Department',
      'Check-in Time',
      'Verified By',
      'Verifier Role'
    ];
    
    const rows = sortedAttendances.map(att => [
      att.participant.name,
      att.participant.email,
      att.participant.phone || 'N/A',
      att.participant.department,
      new Date(att.checkInTime).toLocaleString('en-IN'),
      att.verifiedBy.name,
      att.verifiedBy.role
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `event-attendance-${eventId}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3 bg-red-50 p-6 rounded-lg max-w-md">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h2 className="text-lg font-semibold text-red-900">Error Loading Attendance</h2>
          <p className="text-red-700 text-center">{error?.message || 'Failed to fetch attendance records'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Event Attendance</h1>
          </div>
          <p className="text-gray-600">
            Total Check-ins: <span className="font-semibold text-blue-600">{attendances.length}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, department, or verifier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="checkInTime">Sort by Check-in Time (Latest)</option>
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
            </select>

            {/* Export */}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 font-medium transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {sortedAttendances.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <UserCheck className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No attendance records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Participant
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Department</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Check-in Time
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Verified By
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAttendances.map((attendance, index) => (
                    <tr
                      key={attendance._id}
                      className={`border-b border-gray-100 hover:bg-blue-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {attendance.participant.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {attendance.participant.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {attendance.participant.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {attendance.participant.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {new Date(attendance.checkInTime).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(attendance.checkInTime).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {attendance.verifiedBy.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {attendance.verifiedBy.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          attendance.verifiedBy.role === 'organizer'
                            ? 'bg-blue-100 text-blue-700'
                            : attendance.verifiedBy.role === 'faculty'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {attendance.verifiedBy.role.charAt(0).toUpperCase() + attendance.verifiedBy.role.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Checked In</p>
                <p className="text-3xl font-bold text-blue-600">{attendances.length}</p>
              </div>
              <UserCheck className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Unique Departments</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(attendances.map(a => a.participant.department)).size}
                </p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">First Check-in</p>
                <p className="text-lg font-bold text-green-600">
                  {attendances.length > 0
                    ? new Date(
                        Math.min(...attendances.map(a => new Date(a.checkInTime)))
                      ).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                    : 'N/A'}
                </p>
              </div>
              <Clock className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Latest Check-in</p>
                <p className="text-lg font-bold text-orange-600">
                  {attendances.length > 0
                    ? new Date(
                        Math.max(...attendances.map(a => new Date(a.checkInTime)))
                      ).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                    : 'N/A'}
                </p>
              </div>
              <Clock className="w-10 h-10 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}