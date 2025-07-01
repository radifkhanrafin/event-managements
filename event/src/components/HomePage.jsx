
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
// import { FaCalendarCheck, FaClock, FaLocationDot, FaUsers, FaStar, FaArrowRight, FaCalendarDays, } from "react-icons/fa"
import HeroSection from "./HeroSection"
import { FaArrowRight, FaCalendarDay, FaStar } from "react-icons/fa"
 

const Homepage = ({ navigate }) => {
  const { user } = useAuth()

  // const features = [
  //   {
  //     icon: FaCalendarCheck,
  //     title: "Easy Event Creation",
  //     description: "Create and customize your events with our intuitive drag-and-drop interface",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     icon: FaUsers,
  //     title: "Community Driven",
  //     description: "Connect with like-minded people and build lasting relationships",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     icon: FaLocationDot,
  //     title: "Location Intelligence",
  //     description: "Smart location-based discovery and venue recommendations",
  //     color: "bg-green-500",
  //   },
  //   {
  //     icon: FaClock,
  //     title: "Real-time Updates",
  //     description: "Instant notifications and live event updates for all participants",
  //     color: "bg-orange-500",
  //   },
  // ]

  const testimonials = [
    {
      quote:
        "EventHub transformed how I organize conferences. The intuitive interface and powerful features made everything effortless.",
      author: "Sarah Johnson",
      role: "Conference Organizer",
      rating: 5,
    },
    {
      quote:
        "I've discovered amazing local workshops and met incredible people through EventHub. It's become my go-to platform.",
      author: "James Kim",
      role: "Community Builder",
      rating: 5,
    },
    {
      quote:
        "The real-time updates and notifications saved my event when we had last-minute venue changes. Absolutely brilliant!",
      author: "Priya Mehta",
      role: "Event Coordinator",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Why Choose EventHub
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                amazing events
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From planning to execution, we've got you covered with powerful tools and seamless experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              <FaStar className="w-4 h-4 mr-2" />
              Testimonials
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by event creators worldwide</h2>
            <p className="text-xl text-gray-600">See what our community has to say about EventHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to create something amazing?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of event organizers and attendees who trust EventHub to bring their visions to life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {!user ? (
              <>
                <Link to="/register">
                  <button
                    onClick={() => navigate("register")}
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 text-lg font-semibold rounded-full shadow-2xl transition-all duration-200"
                  >
                    {/* <FaCheckCircle className="w-5 h-5 mr-2" /> */}
                    Create Your Account
                  </button>
                </Link>
                <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg font-semibold rounded-full bg-transparent transition-all duration-200">
                  Learn More
                </button>
              </>
            ) : (
              <Link to="/events">
                <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 text-lg font-semibold rounded-full shadow-2xl transition-all duration-200">
                  <FaCalendarDay className="w-5 h-5 mr-2" />
                  Explore Events
                  <FaArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-blue-200">
            <div className="flex items-center">
              {/* <FaCheckCircle className="w-5 h-5 mr-2" /> */}
              Free to start
            </div>
            <div className="flex items-center">
              {/* <FaCheckCircle className="w-5 h-5 mr-2" /> */}
              No setup fees
            </div>
            <div className="flex items-center">
              {/* <FaCheckCircle className="w-5 h-5 mr-2" /> */}
              24/7 support
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
