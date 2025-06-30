"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { axiosSecure } from "../hooks/useAxios"
import { Navigate, useNavigate } from "react-router-dom"

const AddEvent = () => {
  const { user } = useAuth();
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

    const newEvent = {
      title: formData.title,
      name: formData.name,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      attendeeCount: 0,
      createdBy: user?._id,
      joinedUsers: [],
    }

    console.log(newEvent)
    const response = await axiosSecure.post('/event', newEvent);

    console.log(response);

    navigate("/events")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Event</h1>
        <p className="text-gray-600">Create and share your event with the community</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-2">Event Details</h2>
        <p className="text-gray-600 mb-6">Fill in the information below to create your event</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Organizer Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter organizer name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                id="time"
                type="time"  // change type to time for native time picker
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })} // update using setter inline
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              📍 Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEvent
