import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { axiosSecure } from "../hooks/useAxios";

const Events = () => {
  const { user } = useAuth();
  const loadedEvents = useLoaderData();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  // Sort and initialize events from DB
  useEffect(() => {
    if (!loadedEvents) return;
    const sorted = [...loadedEvents].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });
    setEvents(sorted);
    setFilteredEvents(sorted);
  }, [loadedEvents]);

  // Apply search + filter
  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        switch (dateFilter) {
          case "today":
            return eventDate.toDateString() === today.toDateString();
          case "current-week":
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
          case "last-week":
            const lastWeekStart = new Date(today);
            lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
            const lastWeekEnd = new Date(lastWeekStart);
            lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
            return eventDate >= lastWeekStart && eventDate <= lastWeekEnd;
          case "current-month":
            return (
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            );
          case "last-month":
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            return (
              eventDate.getMonth() === lastMonth.getMonth() &&
              eventDate.getFullYear() === lastMonth.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, dateFilter]);

  // Join Event (✅ Only via backend)
  const handleJoinEvent = async (eventId) => {
    if (!user) return;
    console.log(eventId)
    try {

      const response = await axiosSecure.patch(`/event/${eventId}`, {
        userId: user._id,
      });
      console.log(response)
      if (response.status) {
        alert`${response.data.message}`
      }

      const updated = events.map((event) => {
        if (event._id === eventId) {
          if (!event.joinedUsers.includes(user._id)) {
            return {
              ...event,
              attendeeCount: event.attendeeCount + 1,
              joinedUsers: [...event.joinedUsers, user._id],
            };
          }
        }
        return event;
      });

      setEvents(updated);
    } catch (err) {
      console.error("Failed to join event:", err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Events</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search events by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="today">Today</option>
            <option value="current-week">Current Week</option>
            <option value="last-week">Last Week</option>
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">👤 {event.name}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📅</span>
                  {formatDate(event.date)} at {formatTime(event.time)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  {event.location}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-1">👥</span>
                  {event.attendeeCount} attendees
                </div>
                <button
                  onClick={() => handleJoinEvent(event._id)}
                  disabled={event.joinedUsers.includes(user?._id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${event.joinedUsers.includes(user?._id)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {event.joinedUsers.includes(user?._id) ? "Joined" : "Join Event"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
