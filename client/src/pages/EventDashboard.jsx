import { useGetAllEventsQuery, useIsAuthQuery } from '@/state/api'
import { useState } from "react";
import { Search, Calendar, MapPin, Users, Plus } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layoutComponents/DashboardLayout';

const EventDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()

    const {data: eventData} = useGetAllEventsQuery()
    const { data: authData } = useIsAuthQuery();
    const userRole = authData?.user?.role;

    // console.log(eventData, "event");
   const events = eventData?.events || [];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalParticipants = events.reduce((sum, e) => sum + e.currentParticipants, 0);
  const totalSessions = events.reduce((sum, e) => sum + e.sessions.length, 0);

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Campus Events
              </h1>
            </div>
            <nav className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-purple-600 font-medium transition">
                My Events
              </button>
              <button className="text-gray-700 hover:text-purple-600 font-medium transition">
                Managing
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-purple-200 font-medium flex items-center gap-2 transition">
                <Plus className="h-4 w-4" />
                Create Event
              </button>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Discover Campus Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join exciting events, workshops, and conferences happening on campus
          </p>
        </div>

        {userRole === "organizer" && (
  <div className="flex justify-center mb-6">
    <button
      onClick={() => navigate("/create-event")}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600
                 hover:from-purple-700 hover:to-blue-700 text-white font-medium
                 px-5 py-3 rounded-xl shadow-md transition-all duration-300"
    >
      <Plus className="h-5 w-5" /> Create Event
    </button>
  </div>
)}

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 h-14 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl shadow-sm focus:outline-none transition"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border-2 border-purple-100 shadow-lg shadow-purple-100/50 hover:shadow-xl transition-shadow rounded-lg p-6 text-center bg-white">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {events.length}
            </div>
            <div className="text-gray-600 font-medium">Total Events</div>
          </div>
          <div className="border-2 border-blue-100 shadow-lg shadow-blue-100/50 hover:shadow-xl transition-shadow rounded-lg p-6 text-center bg-white">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {totalParticipants}
            </div>
            <div className="text-gray-600 font-medium">Total Participants</div>
          </div>
          <div className="border-2 border-purple-100 shadow-lg shadow-purple-100/50 hover:shadow-xl transition-shadow rounded-lg p-6 text-center bg-white">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {totalSessions}
            </div>
            <div className="text-gray-600 font-medium">Total Sessions</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="overflow-hidden border-2 border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full rounded-lg bg-white cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {event.bannerUrl ? (
                  <img
                    src={event.bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
                    <Calendar className="h-12 w-12 text-purple-400" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-purple-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {event.sessions.length} Sessions
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>
                      {event.currentParticipants}
                      {event.maxParticipants > 0 && ` / ${event.maxParticipants}`} participants
                    </span>
                  </div>
                  {event.maxParticipants > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(event.currentParticipants / event.maxParticipants) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div> {/* onclick={navigate(`/events/${events?._id}`)} */}
              <Link to={`/events/${event._id}`}>
              <div  className="p-4 border-t border-gray-100">
                <  button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition">
                  View Details
                </button>
              </div>
                </Link>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        )}
      </section>
    </div>
    </DashboardLayout>
  );
}

export default EventDashboard