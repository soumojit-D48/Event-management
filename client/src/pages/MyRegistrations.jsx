import { useState } from 'react';
import { Calendar, MapPin, Loader2, AlertCircle, Trash2, CheckCircle } from 'lucide-react';

// Mock hooks - replace with your actual RTK Query hooks
// const useGetMyRegistrationsQuery = () => {
//   return {
//     data: {
//       success: true,
//       count: 1,
//       data: [
//         {
//           _id: "68ebaf2de716cf0f9084b893",
//           event: {
//             _id: "68eaa8c8abdf8d5af85e2209",
//             title: "date time next update",
//             description: "date time nextdate time next update",
//             venue: "date time next update",
//             startDate: "2025-10-15T14:28:00.000Z",
//             endDate: "2025-10-17T14:28:00.000Z"
//           },
//           participant: {
//             _id: "68ebae70e716cf0f9084b88a",
//             name: "user99",
//             email: "user99@gmail.com"
//           },
//           college: "ABC College of Engineering",
//           department: "Computer Science",
//           studentId: "34632436453",
//           status: "registered",
//           registeredAt: "2025-10-12T13:37:49.910Z",
//           __v: 0
//         }
//       ]
//     },
//     isLoading: false,
//     error: null,
//   };
// };

// const useCancelRegistrationMutation = () => {
//   return [
//     async (id) => {
//       console.log("Cancelling registration:", id);
//       // Replace with actual mutation
//     },
//     { isLoading: false }
//   ];
// };

import {useGetMyRegistrationsQuery, useCancelRegistrationMutation} from '../state/api'

export default function MyRegistrations() {
  const { data: responseData, isLoading, error } = useGetMyRegistrationsQuery();
  const [cancelRegistration, { isLoading: isCancelling }] = useCancelRegistrationMutation();
  const [cancellingId, setCancellingId] = useState(null);

  const registrations = responseData?.data || [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      registered: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: Calendar,
        label: 'Registered'
      },
      'checked-in': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle,
        label: 'Checked In'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle,
        label: 'Cancelled'
      },
    };

    const config = statusConfig[status] || statusConfig.registered;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${config.bg} ${config.text} w-fit`}>
        <Icon className="w-4 h-4" />
        <span className="font-semibold text-sm">{config.label}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelRegistration = async (registrationId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      setCancellingId(registrationId);
      try {
        await cancelRegistration(registrationId);
        alert('Registration cancelled successfully!');
      } catch (error) {
        alert('Failed to cancel registration');
      } finally {
        setCancellingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3 bg-red-50 p-6 rounded-lg max-w-md">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h2 className="text-lg font-semibold text-red-900">Error Loading Registrations</h2>
          <p className="text-red-700 text-center">{error?.message || 'Failed to fetch registrations'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Registrations</h1>
          <p className="text-gray-600">Total Events: <span className="font-semibold text-gray-900">{registrations.length}</span></p>
        </div>

        {/* Registrations Grid */}
        {registrations.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No registrations found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((registration) => (
              <div
                key={registration._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Event Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{registration.event.title}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5" />
                    <span className="text-blue-100">{registration.event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-blue-100">
                      {formatDate(registration.event.startDate)} to {formatDate(registration.event.endDate)}
                    </span>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="p-6 space-y-4">
                  {/* College & Department */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">College</p>
                      <p className="text-gray-900">{registration.college}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Department</p>
                      <p className="text-gray-900">{registration.department}</p>
                    </div>
                  </div>

                  {/* Student ID */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Student ID</p>
                    <p className="text-gray-900 font-mono">{registration.studentId}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Status</p>
                    {getStatusBadge(registration.status)}
                  </div>

                  {/* Registered At */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Registered At</p>
                    <p className="text-gray-900">{formatDate(registration.registeredAt)}</p>
                  </div>

                  {/* Cancel Button */}
                  {registration.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelRegistration(registration._id)}
                      disabled={cancellingId === registration._id || isCancelling}
                      className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center gap-2 font-semibold transition"
                    >
                      {cancellingId === registration._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Cancel Registration
                        </>
                      )}
                    </button>
                  )}

                  {registration.status === 'cancelled' && (
                    <div className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center font-semibold">
                      Registration Cancelled
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}