// the event coordinator or volunteer

import React from "react";
import { Calendar, MapPin, Users, QrCode, MessageSquare } from "lucide-react";
import { useGetEventsIManageQuery, useIsAuthQuery } from "@/state/api";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";

const EventIManage = () => {
  const { data, isLoading, isError, error } = useGetEventsIManageQuery();
  const { data: userData } = useIsAuthQuery();
  console.log(userData?.user?.role, "user data");
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Team Roles
          </h1>
          <p className="text-gray-600 mb-8">
            Events where you're a coordinator or volunteer
          </p>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Team Roles
          </h1>
          <p className="text-gray-600 mb-8">
            Events where you're a coordinator or volunteer
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading events: {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  const events = data?.events || [];

  console.log(events, "events I manage");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Team Roles
          </h1>
          <p className="text-gray-600 mb-8">
            Events where you're a coordinator or volunteer
          </p>

          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">
                No events found where you're a coordinator or volunteer.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {userData?.user?.role}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-full h-full opacity-30"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {event.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                        <span className="text-sm">
                          {formatDate(event.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 mr-2 text-purple-600" />
                        <span className="text-sm">
                          {/* {event.registeredParticipants?.length || 0} / {event.maxParticipants} participants */}
                          {event.maxParticipants === 0
                            ? `${ 
                                event?.currentParticipants || 0
                              } / No Limit`
                            : `${event?.currentParticipants || 0} / ${
                                event.maxParticipants
                              } participants`}
                        </span>
                      </div>
                    </div>

                    {event.sessions && event.sessions.length > 0 && (
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {event.sessions.length} Session
                          {event.sessions.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 mb-3">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                        View Details
                      </button>
                      <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold py-2 px-4 rounded flex items-center justify-center transition-colors">
                        <Users className="w-4 h-4 mr-1" />
                        Team
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded flex items-center justify-center transition-colors">
                        <QrCode className="w-4 h-4 mr-2" />
                        Scan
                      </button>
                      <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded flex items-center justify-center transition-colors">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventIManage;
