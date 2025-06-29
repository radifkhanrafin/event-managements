import React, { useState } from "react"; 
import { useAuth } from "../contexts/AuthContext";
import Homepage from "./HomePase";
import Login from "./Login";
import Register from "./Register";
import Events from "./Event";
import AddEvent from "./AddEvent";
import MyEvents from "./MyEvent";
import Navbar from "./Navbar";

const AppRouter = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage navigate={navigate} />;
      case "login":
        return <Login navigate={navigate} />;
      case "register":
        return <Register navigate={navigate} />;
      case "events":
        return user ? (
          <Events navigate={navigate} />
        ) : (
          <Login  navigate={navigate} />
        );
      case "add-event":
        return user ? (
          <AddEvent navigate={navigate} />
        ) : (
          <Login navigate={navigate} />
        );
      case "my-events":
        return user ? (
          <MyEvents navigate={navigate} />
        ) : (
          <Login navigate={navigate} />
        );
      default:
        return <Homepage navigate={navigate} />;
    }
  };

  return (
    <>
      <Navbar navigate={navigate} currentPage={currentPage} />
      {renderPage()}
    </>
  );
};

export default AppRouter;
