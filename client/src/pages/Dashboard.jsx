import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { Calendar, Users, TrendingUp, DollarSign } from "lucide-react";

import { useState, useMemo } from "react";
import { useIsAuthQuery, useLogoutMutation, useGetAllEventsQuery } from "@/state/api";
import DashboardLayout from "@/components/layoutComponents/DashboardLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { label: "Total Events", value: "24", change: "+12%", icon: Calendar, color: "bg-blue-500" },
    { label: "Active Participants", value: "1,248", change: "+23%", icon: Users, color: "bg-green-500" },
    { label: "Budget Utilized", value: "₹2.4L", change: "68%", icon: DollarSign, color: "bg-purple-500" },
    { label: "Avg. Satisfaction", value: "4.6/5", change: "+0.3", icon: TrendingUp, color: "bg-orange-500" },
  ];

  const recentActivity = [
    { action: "New registration for Tech Fest 2025", time: "2 mins ago", type: "registration" },
    { action: "Budget updated for AI Workshop", time: "1 hour ago", type: "budget" },
    { action: "Feedback received for Seminar", time: "3 hours ago", type: "feedback" },
    { action: "Certificate generated (125 students)", time: "5 hours ago", type: "certificate" },
  ];

  const { data: allEvents, isLoading } = useGetAllEventsQuery();

  const events = useMemo(() => {
    if (!allEvents?.events) return [];

    const today = new Date();

    return allEvents.events
      .map((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        let status = "Ended";
        if (today < start) status = "Upcoming";
        else if (today >= start && today <= end) status = "Ongoing";

        return {
          id: event._id,
          title: event.title,
          venue: event.venue,
          startDate: event.startDate,
          sessionsCount: event.sessions?.length || 0,
          status,
        };
      })
      .slice(0, 3);
  }, [allEvents]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Here's what's happening today.
        </p>

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingEvents events={events} />
          <RecentActivity activities={recentActivity} />
        </div>

        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
