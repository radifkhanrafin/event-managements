import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { axiosSecure } from "../hooks/useAxios";
import { toast } from "react-toastify";
import useEvent from "../hooks/useEvent";
import {
  FaCalendar,
  FaFilter,
  FaHandSparkles,
  FaGem,
} from "react-icons/fa6";

const Events = () => {
  const { user } = useAuth();
  const [eventData, loading] = useEvent();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    if (loading) return;

    const sorted = [...eventData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setEvents(sorted);
    setFilteredEvents(sorted);
  }, [eventData, loading]);

  useEffect(() => {
    if (!eventData || eventData.length === 0) {
      setFilteredEvents([]);
      return;
    }

    let filtered = eventData.filter(event =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const endOfToday = new Date(now.setHours(23, 59, 59, 999));

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    filtered = filtered.filter(event => {
      const eventDate = new Date(event.date);
      switch (dateFilter) {
        case "today":
          return eventDate >= startOfToday && eventDate <= endOfToday;
        case "current-week":
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        case "current-month":
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        default:
          return true;
      }
    });

    setFilteredEvents(filtered);
  }, [searchTerm, dateFilter, eventData]);

  const handleJoinEvent = async (eventId) => {
    if (!user) return;

    try {
      const response = await axiosSecure.patch(`/event/${eventId}`, {
        userId: user._id,
      });
      if (response.status === 200) toast("Event Joined");

      const updated = events.map(event =>
        event._id === eventId && !event.joinedUsers.includes(user._id)
          ? {
            ...event,
            attendeeCount: event.attendeeCount + 1,
            joinedUsers: [...event.joinedUsers, user._id],
          }
          : event
      );
      setEvents(updated);
    } catch (err) {
      console.error("Failed to join event:", err);
    }
  };

  const formatDate = date =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = time =>
    new Date(`2000-01-01 ${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="min-h-screen relative overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Light static blobs for vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full shadow-md">
            <FaHandSparkles className="w-4 h-4 mr-2 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
              Discover Amazing Events
            </span>
            <FaGem className="w-4 h-4 ml-2 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
            All Events
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <input
              className="w-full px-6 py-4 rounded-xl shadow-md bg-white/90 backdrop-blur-sm focus:outline-none"
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-6 py-4 rounded-xl shadow-md bg-white/90 backdrop-blur-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="current-week">This Week</option>
              <option value="current-month">This Month</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p>No events found.</p>
            </div>
          ) : (
            filteredEvents.map(event => (
              <div
                key={event._id}
                className="relative bg-white/95 rounded-3xl shadow-xl border border-white/10 p-6 hover:scale-105 transform transition duration-300"
                style={{ willChange: "transform" }}
              >
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-1">{formatDate(event.date)}</p>
                <p className="text-gray-600 mb-4">{formatTime(event.time)}</p>
                <p className="text-gray-600 mb-4">{event.location}</p>
                <p className="text-gray-500 mb-4 line-clamp-3">{event.description}</p>
                <p className="text-gray-600 mb-4">{event.attendeeCount} attendees</p>
                <button
                  onClick={() => handleJoinEvent(event._id)}
                  disabled={event.joinedUsers.includes(user?._id)}
                  className={`px-4 py-2 rounded-full text-white font-semibold ${event.joinedUsers.includes(user?._id)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                >
                  {event.joinedUsers.includes(user?._id) ? "Joined" : "Join Event"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
