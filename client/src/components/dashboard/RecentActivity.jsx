import { Users, DollarSign, MessageSquare, FileText } from "lucide-react";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className={`mt-1 p-2 rounded-lg ${
                activity.type === "registration"
                  ? "bg-blue-100"
                  : activity.type === "budget"
                  ? "bg-purple-100"
                  : activity.type === "feedback"
                  ? "bg-orange-100"
                  : "bg-green-100"
              }`}
            >
              {activity.type === "registration" && <Users className="w-4 h-4 text-blue-600" />}
              {activity.type === "budget" && <DollarSign className="w-4 h-4 text-purple-600" />}
              {activity.type === "feedback" && <MessageSquare className="w-4 h-4 text-orange-600" />}
              {activity.type === "certificate" && <FileText className="w-4 h-4 text-green-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
