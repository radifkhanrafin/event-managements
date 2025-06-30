import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import Events from "../components/Event";
import App from "../App";
import AddEvent from "../components/AddEvent";
import MyEvents from "../components/MyEvent";
import PrivateRoute from "./PrivateRoute"; 


 


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/events',
                element: <PrivateRoute><Events />  </PrivateRoute>, 

            },
            {
                path: '/add-event',
                element: <PrivateRoute> <AddEvent /></PrivateRoute>

            },
            {
                path: '/my-events',
                element: <PrivateRoute> <MyEvents /></PrivateRoute>

            },

        ]
    },

]);
export default router;