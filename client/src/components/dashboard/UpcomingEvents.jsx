// import { ChevronRight, Clock, Users } from "lucide-react";

// export default function UpcomingEvents({ events }) {
//   return (
//     <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
//         <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
//           View All <ChevronRight className="w-4 h-4 ml-1" />
//         </button>
//       </div>
//       <div className="space-y-4">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
//                 <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
//                   <span className="flex items-center">
//                     <Clock className="w-4 h-4 mr-1" />
//                     {event.date}
//                   </span>
//                   <span className="flex items-center">
//                     <Users className="w-4 h-4 mr-1" />
//                     {event.attendees} registered
//                   </span>
//                 </div>
//               </div>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                   event.status === "Upcoming"
//                     ? "bg-green-100 text-green-700"
//                     : event.status === "Registration Open"
//                     ? "bg-blue-100 text-blue-700"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {event.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }













import { ChevronRight, Clock, Users, MapPin } from "lucide-react";

import { Link } from "react-router-dom";
export default function UpcomingEvents({ events = [] }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
        <Link to="/events/all">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.venue}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(event.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.sessionsCount} sessions
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    event.status === "Upcoming"
                      ? "bg-green-100 text-green-700"
                      : event.status === "Ongoing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
