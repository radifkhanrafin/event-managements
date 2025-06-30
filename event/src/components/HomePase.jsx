"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { FaCalendarCheck, FaClock, FaLocationPin, FaLocationPinLock, FaUsers } from "react-icons/fa6";
const Homepage = ({ navigate }) => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to EventHub</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover, create, and manage amazing events. Connect with your community and make memories that last.
            </p>
            <div className="space-x-4">
              {user ? (
                <>
                  <Link to='/events'><button
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Browse Events
                  </button></Link>
                  <Link to='/add-event'><button
                    onClick={() => navigate("add-event")}
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
                  >
                    Create Event
                  </button></Link>
                </>
              ) : (
                <>
                  <Link to='/register'><button
                    onClick={() => navigate("register")}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Get Started
                  </button></Link>


                  <Link to='/login'><button

                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
                  >
                    Sign In
                  </button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and attend amazing events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            <div className="text-center p-6 bg-white rounded-lg shadow-md  flex flex-col items-center">
              <div className="text-4xl mb-4"><FaCalendarCheck /></div>
              <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
              <p className="text-gray-600">Create and customize your events with our intuitive interface</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md  flex flex-col items-center">
              <div className="text-4xl mb-4"><FaUsers /></div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Connect with like-minded people and build your community</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md  flex flex-col items-center">
              <div className="text-4xl mb-4"><FaLocationPinLock /></div>
              <h3 className="text-xl font-semibold mb-2">Location Based</h3>
              <p className="text-gray-600">Find events near you or create events for your local area</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md flex flex-col items-center ">
              <div className="text-4xl mb-4"><FaClock /></div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Stay updated with real-time notifications and event changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers and attendees who trust EventHub
          </p>
          <Link to='/register'>{!user && (
            <button

              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Create Your Account
            </button>
          )}</Link>
        </div>
      </section>
    </div>
  )
}

export default Homepage
