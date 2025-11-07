

import { useState } from "react";
import {
  MessageSquare,
  Calendar,
  Search,
  ArrowRight,
  Star,
  Users,
  Edit,
} from "lucide-react";

import {
  useGetMyEventsQuery,
  useGetMyRegistrationsQuery,
  useIsAuthQuery,
} from "@/state/api";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
import { useNavigate } from "react-router-dom";

const FeedbackOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: authData } = useIsAuthQuery();
  const navigate = useNavigate();

  const currentUser = authData?.user;
  const userId = currentUser?._id;

  // roles
  const isParticipant = currentUser?.role === "participant";
  const isStaff = ["organizer", "faculty", "volunteer"].includes(
    currentUser?.role
  );

  // fetch staff events
  const { data: eventData, isLoading: eventsLoading } = useGetMyEventsQuery(
    undefined,
    { skip: !isStaff }
  );

  // fetch participant registrations
  const { data: registrationData, isLoading: registrationsLoading } =
    useGetMyRegistrationsQuery(undefined, {
      skip: !isParticipant,
    });

  const isLoading = isParticipant ? registrationsLoading : eventsLoading;

  // prepare events
  const participantEvents =
    registrationData?.data?.map((reg) => reg.event) || [];

  const staffEvents = eventData?.events || [];

  const events = isParticipant ? participantEvents : staffEvents;

  const hasEventAccess = (event) => {
    if (isParticipant) return true;

    if (currentUser?.role === "organizer") {
      return event.organizer?._id === userId;
    }
    if (currentUser?.role === "faculty") {
      return event.coordinators?.some((coord) => coord._id === userId);
    }
    if (currentUser?.role === "volunteer") {
      return event.volunteers?.some((vol) => vol._id === userId);
    }

    return false;
  };

  // Filter events the user has access to
  const myEvents = events.filter(hasEventAccess);

  // Search filter
  const filteredEvents = myEvents.filter((event) =>
    `${event.title} ${event.venue}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleEventAction = (eventId) => {
    navigate(`/feedback/${eventId}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
          <p className="text-gray-600 mb-6">
            Please wait while we load your information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <section className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                {isParticipant ? "Event Feedback" : "Event Feedback Overview"}
              </h2>
            </div>
            <p className="text-gray-600">
              {isParticipant
                ? "Share your feedback for events you've attended"
                : "View feedback and analytics for your events"}
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Events list */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? "No events found" : "No events yet"}
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search"
                  : isParticipant
                  ? "You haven't registered for any events yet"
                  : "You don't have feedback access yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left">Event Name</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Venue</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredEvents.map((event) => (
                      <tr key={event._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-gray-500">
                            {event.description}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            {new Date(event.startDate).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {event.venue}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {isParticipant ? (
                            <button
                              onClick={() => handleEventAction(event._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                            >
                              <Edit className="h-4 w-4" />
                              Give Feedback
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEventAction(event._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                              <Users className="h-4 w-4" />
                              View Feedback
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600 my-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>

                    <p className="text-sm text-gray-500 mb-4">{event.venue}</p>

                    {isParticipant ? (
                      <button
                        onClick={() => handleEventAction(event._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                        Give Feedback
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEventAction(event._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        <Star className="h-4 w-4" />
                        View Feedback
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackOverview;
