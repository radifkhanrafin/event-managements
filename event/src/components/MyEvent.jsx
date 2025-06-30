import Swal from 'sweetalert2'
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { axiosSecure } from "../hooks/useAxios"
import useEvent from '../hooks/useEvent'
import useMyEvent from '../hooks/useMyEvent'

const MyEvents = () => {
  const { user } = useAuth()
  const [myEventData, loading, refetch] = useMyEvent();
  const [events, setEvents] = useState([])
  const [editingEvent, setEditingEvent] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)




  const handleEdit = (event) => {
    setEditingEvent(event)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editingEvent) return

    try {
      const response = await axiosSecure.patch(`/event/${editingEvent._id}`, editingEvent);


      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your event has been updated."
        });
        setIsEditDialogOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }

  }


  const handleDelete = async (eventId) => {

    console.log(eventId)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {

      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/event/${eventId}`);
          console.log(response);
          if (response.status == 200) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }


        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error"
          });
        }
      }
    });
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
        <p className="text-gray-600">Manage the events you've created</p>
      </div>

      {myEventData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events created yet</h3>
          <p className="text-gray-500 mb-4">Start by creating your first event</p>
          <button
            // onClick={() => navigate("add-event")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEventData.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
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
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="mr-1">👥</span>
                {event.attendeeCount} attendees
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditDialogOpen && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-2">Update Event</h2>
            <p className="text-gray-600 mb-6">Make changes to your event details</p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  id="edit-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Organizer Name
                </label>
                <input
                  id="edit-name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    id="edit-date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit-time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    id="edit-time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="edit-location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyEvents
