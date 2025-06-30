import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { axiosSecure } from "../hooks/useAxios";
import { toast } from "react-toastify";
import useEvent from "../hooks/useEvent";
import { FaCalendar, FaLocationDot, FaManatSign, FaSearchengin, FaUser, FaUsers } from "react-icons/fa6";


const Events = () => {
  const { user } = useAuth();
  const [eventData, loading, refetch] = useEvent();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");


  useEffect(() => {
    if (loading) return;

    const sorted = [...eventData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateB.getTime() !== dateA.getTime()) {
        return dateB - dateA; // Descending by date
      } else {
        // Defensive checks for time
        const timeA = typeof a.time === "string" ? a.time : "00:00";
        const timeB = typeof b.time === "string" ? b.time : "00:00";

        const [hoursA, minutesA] = timeA.split(':').map(Number);
        const [hoursB, minutesB] = timeB.split(':').map(Number);

        if (hoursB !== hoursA) return hoursB - hoursA;
        return minutesB - minutesA;
      }
    });

    setEvents(sorted);
    setFilteredEvents(sorted);
  }, [eventData, loading]);




  // Apply search + filter
  useEffect(() => {
    if (!eventData || eventData.length === 0) {
      setFilteredEvents([]);
      return;
    }

    let filtered = eventData.filter(event =>
      event.title && typeof event.title === "string"
        ? event.title.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    );

    // Helper date functions as above
    const getStartOfWeek = () => {
      const now = new Date();
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(now.getFullYear(), now.getMonth(), diff, 0, 0, 0, 0);
    };

    const getEndOfWeek = (startOfWeek) => {
      return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6, 23, 59, 59, 999);
    };

    const getStartOfLastWeek = (startOfWeek) => {
      return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() - 7, 0, 0, 0, 0);
    };

    const getEndOfLastWeek = (startOfLastWeek) => {
      return new Date(startOfLastWeek.getFullYear(), startOfLastWeek.getMonth(), startOfLastWeek.getDate() + 6, 23, 59, 59, 999);
    };

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek(startOfWeek);

    const startOfLastWeek = getStartOfLastWeek(startOfWeek);
    const endOfLastWeek = getEndOfLastWeek(startOfLastWeek);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    filtered = filtered.filter(event => {
      const eventDate = new Date(event.date);
      switch (dateFilter) {
        case "today":
          return eventDate >= startOfToday && eventDate <= endOfToday;
        case "current-week":
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        case "last-week":
          return eventDate >= startOfLastWeek && eventDate <= endOfLastWeek;
        case "current-month":
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        case "last-month":
          return eventDate >= startOfLastMonth && eventDate <= endOfLastMonth;
        case "all":
        default:
          return true;
      }
    });

    setFilteredEvents(filtered);
  }, [searchTerm, dateFilter, eventData]);






  // Join Event ( Only via backend)
  const handleJoinEvent = async (eventId) => {
    if (!user) return;
    // console.log(eventId)
    try {

      const response = await axiosSecure.patch(`/event/${eventId}`, {
        userId: user._id,
      });
      // console.log(response)
      if (response.status == 200) {
        toast('Event Joined')
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
            <input
              className="w-full px-6  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search events by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            
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
            <div className="text-6xl mb-4"><FaCalendar /></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {event.title}
                </h3>

                {/* Organizer */}
                <p className="flex items-center text-sm text-gray-500 mb-3">
                  <FaUser className="text-blue-500 mr-2" />
                  <span>{event.name}</span>
                </p>

                {/* Date & Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendar className="text-purple-500 mr-2" />
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaLocationDot className="text-purple-500 mr-2" />
                    {event.location}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-5 line-clamp-3">
                  {event.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="text-blue-500 mr-1" />
                    {event.attendeeCount} attendees
                  </div>
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={event.joinedUsers.includes(user?._id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md
          ${event.joinedUsers.includes(user?._id)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      }`}
                  >
                    {event.joinedUsers.includes(user?._id) ? "Joined" : "Join Event"}
                  </button>
                </div>
              </div>

              {/* Floating Icon */}
              {/* <div className="absolute bottom-0 right-0 mb-4 mr-4 opacity-10 text-blue-500 text-6xl pointer-events-none">
                <FaCalendar />
              </div> */}
            </div>

          ))
        )}
      </div>
    </div>
  );
};

export default Events;
