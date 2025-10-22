import { useGetEventByIdQuery } from '@/state/api';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Edit, ArrowLeft, UserPlus } from "lucide-react";
import DashboardLayout from '@/components/layoutComponents/DashboardLayout';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for demonstration
   const { data: eventData, isLoading, isError } = useGetEventByIdQuery(id);

   const event = eventData?.event;
//    console.log(event, "event details");
   
  
  // Get current user from your auth state/context
  // const { currentUser } = useAuth(); // or however you manage auth
  // const currentUserId = currentUser?._id;
  
  // Check if current user is the organizer
//   const currentUserId = "68eaa8c8abdf8d5af85e2209"; // Replace with actual current user ID
//   const isOrganizer = event?.createdBy?.some(organizer => organizer._id === currentUserId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Event not found</p>
        </div>
      </div>
    );
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFullDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const participationPercentage = event.maxParticipants > 0 
    ? (event.currentParticipants / event.maxParticipants) * 100 
    : 0;

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Event Details
              </h1>
            </div> */}

            {/* {isOrganizer && (
              <div className="flex gap-2">
                <button className="px-4 py-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-blue-600 font-medium flex items-center gap-2 transition">
                  <Users className="h-4 w-4" />
                  Manage Team
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition">
                  <Edit className="h-4 w-4" />
                  Edit Event
                </button>
              </div>
            )} */}

          {/* </div>
        </div>
      </header> */}

      <section className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="relative h-80 rounded-2xl overflow-hidden mb-8 shadow-2xl bg-gray-200">
          {event.bannerUrl ? (
            <>
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
              <Calendar className="h-20 w-20 text-white/50" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 text-white/90 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatFullDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="border-2 border-gray-100 shadow-lg rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Sessions */}
            <div className="border-2 border-gray-100 shadow-lg rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Sessions</h2>
              <div className="space-y-4">
                {event.sessions && event.sessions.length > 0 ? (
                  event.sessions.map((session) => (
                    <div key={session._id} className="border-l-4 border-purple-600 pl-4 py-2">
                      <h3 className="font-semibold text-lg text-gray-900">{session.title}</h3>
                      <p className="text-gray-600 mb-2">Speaker: {session.speaker}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No sessions scheduled</p>
                )}
              </div>
            </div>

            {/* Team */}
            <div className="border-2 border-gray-100 shadow-lg rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Team</h2>
              <div className="space-y-6">
                {/* Organizers */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Organizers</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.createdBy && event.createdBy.length > 0 ? (
                      event.createdBy.map((org) => (
                        <span
                          key={org._id}
                          className="px-3 py-1 border-2 border-purple-200 text-purple-700 rounded-full text-sm"
                        >
                          {org.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No organizers</p>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Coordinators */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Coordinators</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.coordinators && event.coordinators.length > 0 ? (
                      event.coordinators.map((coord) => (
                        <span
                          key={coord._id}
                          className="px-3 py-1 border-2 border-blue-200 text-blue-700 rounded-full text-sm"
                        >
                          {coord.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No coordinators</p>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Volunteers */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Volunteers</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.volunteers && event.volunteers.length > 0 ? (
                      event.volunteers.map((vol) => (
                        <span
                          key={vol._id}
                          className="px-3 py-1 border-2 border-green-200 text-green-700 rounded-full text-sm"
                        >
                          {vol.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No volunteers</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="border-2 border-purple-200 shadow-xl rounded-lg bg-white sticky top-24">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 border-b border-purple-100">
                <h3 className="text-xl font-bold text-gray-900">Registration</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Participants</span>
                    <span className="text-gray-900 font-bold">
                      {event.currentParticipants}
                      {event.maxParticipants > 0 && ` / ${event.maxParticipants}`}
                    </span>
                  </div>
                  {event.maxParticipants > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${participationPercentage}%` }}
                      />
                    </div>
                  )}
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>{formatFullDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>
                      {formatTime(event.startDate)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{event.sessions?.length || 0} Sessions</span>
                  </div>
                </div>

                  <Link to={`/registrations/register/${event._id}`}>
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 transition">
                  <UserPlus className="h-4 w-4" />
                  Register Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </DashboardLayout>
  );


}
export default EventDetails