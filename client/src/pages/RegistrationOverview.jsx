

import { useState } from "react";
import { Users, Calendar, Search, ArrowRight, Eye } from "lucide-react";
import { useGetMyEventsQuery, useIsAuthQuery } from "@/state/api";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
import { useNavigate } from "react-router-dom";

const RegistrationOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: authData } = useIsAuthQuery();
  const { data: eventData, isLoading } = useGetMyEventsQuery(); // event._id

  const currentUser = authData?.user;
  const events = eventData?.events || [];

  // Check if user has access to the event based on their role
  const hasEventAccess = (event) => {
    const userId = currentUser?.id;
    // console.log(event._id);
    
    
    // Organizers can access events they created
    if (currentUser?.role === "organizer") {
      return event.createdBy?.some(organizer => organizer._id === userId);
    }
    
    // Faculty/Coordinators can access events where they are coordinators
    if (currentUser?.role === "faculty") {
      return event.coordinators?.some(coordinator => coordinator._id === userId);
    }
    
    // Volunteers can access events where they are assigned
    if (currentUser?.role === "volunteer") {
      return event.volunteers?.some(volunteer => volunteer._id === userId);
    }
    
    return false;
  };

  // Filter events based on user's role and assignment
  const myEvents = events.filter(hasEventAccess);

  // Filter events based on search query
  const filteredEvents = myEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewRegistrations = (eventId) => { /// /event/:eventId/registrations
    navigate(`/events/${eventId}/registrations`); 
  };

  const allowedRoles = ["organizer", "faculty", "volunteer"];
  
  if (!currentUser || !allowedRoles.includes(currentUser?.role)) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to be an organizer, faculty, or volunteer to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <section className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Event Registrations
              </h2>
            </div>
            <p className="text-gray-600">
              View and manage registrations for your events
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Events Table/List */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? "No events found" : "No events yet"}
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "You don't have access to any events yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Event Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Venue
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Registrations
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Your Role
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.map((event) => {
                      // Determine user's role in this event
                      const userId = currentUser?.id;
                      let userRole = "Participant";
                      
                      if (event.createdBy?.some(org => org._id === userId)) {
                        userRole = "Organizer";
                      } else if (event.coordinators?.some(coord => coord._id === userId)) {
                        userRole = "Coordinator";
                      } else if (event.volunteers?.some(vol => vol._id === userId)) {
                        userRole = "Volunteer";
                      }

                      return (
                        <tr
                          key={event._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {event.title}
                              </p>
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {event.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 text-purple-600" />
                              <span>
                                {new Date(event.startDate).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {event.venue}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                              <Users className="h-4 w-4" />
                              <span>{event.currentParticipants}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              userRole === "Organizer" 
                                ? "bg-purple-100 text-purple-700"
                                : userRole === "Coordinator"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}>
                              {userRole}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewRegistrations(event._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition font-medium"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredEvents.map((event) => {
                  const userId = currentUser?.id;
                  let userRole = "Participant";
                  
                  if (event.createdBy?.some(org => org._id === userId)) {
                    userRole = "Organizer";
                  } else if (event.coordinators?.some(coord => coord._id === userId)) {
                    userRole = "Coordinator";
                  } else if (event.volunteers?.some(vol => vol._id === userId)) {
                    userRole = "Volunteer";
                  }

                  return (
                    <div key={event._id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          userRole === "Organizer" 
                            ? "bg-purple-100 text-purple-700"
                            : userRole === "Coordinator"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {userRole}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>
                            {new Date(event.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span>{event.currentParticipants} registrations</span>
                        </div>
                        <p className="text-sm text-gray-500">{event.venue}</p>
                      </div>
                      <button
                        onClick={() => handleViewRegistrations(event._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-sm mb-1">Total Events</p>
              <p className="text-3xl font-bold text-gray-900">{myEvents.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-sm mb-1">Total Registrations</p>
              <p className="text-3xl font-bold text-gray-900">
                {myEvents.reduce((sum, event) => sum + event.currentParticipants, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-sm mb-1">Upcoming Events</p>
              <p className="text-3xl font-bold text-gray-900">
                {myEvents.filter(event => new Date(event.startDate) > new Date()).length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default RegistrationOverview;


