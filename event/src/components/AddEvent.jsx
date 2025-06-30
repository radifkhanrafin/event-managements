
import { useState } from "react"
import { FaCrown, FaGem, FaHandSparkles, FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext"
import { axiosSecure } from "../hooks/useAxios"
import { Navigate, useNavigate } from "react-router-dom"
import { FaMagic } from "react-icons/fa";

const AddEvent = () => {
  const { user } = useAuth();
  // console.log(user.user)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // console.log(user._id)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const localData = JSON.parse(localStorage.getItem("user"));
    const newEvent = {
      title: formData.title,
      name: formData.name,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      attendeeCount: 0,
      joinedUsers: [],
    }

    const token = localData.token
    // console.log(token)
    const response = await axiosSecure.post("/event", newEvent)


    // console.log(response);

    navigate("/events")
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        {/* Premium Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium mb-6 shadow-md">
          <FaMagic className="w-4 h-4 mr-2 text-purple-500" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
            Create Extraordinary Events
          </span>
          <FaGem className="w-4 h-4 ml-2 text-blue-500" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
          Add New Event
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent w-20"></div>
          <FaCrown className="w-5 h-5 text-purple-500" />
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent w-20"></div>
        </div>

        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
          Create and share your event with the community
        </p>
      </div>

      {/* Main Form Container */}
      <div className="relative group">
        {/* Soft glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-md border border-white/10 overflow-hidden p-8 transition-all duration-300">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent flex items-center">
            <FaHandSparkles className="w-6 h-6 mr-3 text-purple-500" />
            Event Details
          </h2>
          <p className="text-gray-600 mb-6 text-lg font-light">Fill in the information below to create your event</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-purple-600"
              >
                Event Title
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-purple-600"
              >
                Organizer Name
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter organizer name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-emerald-600"
                >
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-emerald-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-orange-600"
                >
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                  <input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700 mb-1 flex gap-2 items-center transition-colors group-focus-within:text-pink-600"
              >
                <FaLocationDot className="text-pink-500" /> Location
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-pink-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600"
              >
                Description
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-50 transition-all duration-300"></div>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="relative w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:shadow-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center">
                <FaHandSparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Create Event
              </span>
            </button>
          </form>


          <div className="absolute bottom-8 right-8 text-6xl text-purple-200/10 pointer-events-none transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
            <FaGem />
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddEvent
