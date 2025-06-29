 
import { useEffect } from "react"

// Component to seed demo data for preview
const DemoData = () => {
  useEffect(() => {
    // Check if demo data already exists
    const existingEvents = localStorage.getItem("events")
    const existingUsers = localStorage.getItem("users")

    if (!existingUsers) {
      // Create demo users
      const demoUsers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          photoURL: "https://via.placeholder.com/40",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          password: "password123",
          photoURL: "https://via.placeholder.com/40",
        },
      ]
      localStorage.setItem("users", JSON.stringify(demoUsers))
    }

    if (!existingEvents) {
      // Create demo events
      const demoEvents = [
        {
          id: "1",
          title: "React Conference 2024",
          name: "John Doe",
          date: "2024-07-15",
          time: "09:00",
          location: "San Francisco, CA",
          description:
            "Join us for the biggest React conference of the year! Learn about the latest features, best practices, and network with fellow developers.",
          attendeeCount: 150,
          createdBy: "1",
          joinedUsers: [],
        },
        {
          id: "2",
          title: "Web Development Workshop",
          name: "Jane Smith",
          date: "2024-07-20",
          time: "14:00",
          location: "New York, NY",
          description:
            "Hands-on workshop covering modern web development techniques including HTML5, CSS3, and JavaScript ES6+.",
          attendeeCount: 45,
          createdBy: "2",
          joinedUsers: [],
        },
        {
          id: "3",
          title: "Tech Startup Meetup",
          name: "John Doe",
          date: "2024-07-10",
          time: "18:30",
          location: "Austin, TX",
          description:
            "Network with entrepreneurs, investors, and tech enthusiasts. Pitch your ideas and discover new opportunities.",
          attendeeCount: 75,
          createdBy: "1",
          joinedUsers: [],
        },
        {
          id: "4",
          title: "AI & Machine Learning Summit",
          name: "Jane Smith",
          date: "2024-08-05",
          time: "10:00",
          location: "Seattle, WA",
          description:
            "Explore the latest developments in artificial intelligence and machine learning with industry experts.",
          attendeeCount: 200,
          createdBy: "2",
          joinedUsers: [],
        },
      ]
      localStorage.setItem("events", JSON.stringify(demoEvents))
    }
  }, [])

  return null
}

export default DemoData
