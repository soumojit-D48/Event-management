import { CalendarPlus, QrCode, FileText, MessageSquare } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { icon: CalendarPlus, label: "Create Event" },
    { icon: QrCode, label: "Generate QR" },
    { icon: FileText, label: "Export Report" },
    { icon: MessageSquare, label: "View Feedback" },
  ];

  return (
    <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-gray-700 bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all"
          >
            <action.icon className="w-6 h-6 mb-2" />
            <span className="font-semibold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
