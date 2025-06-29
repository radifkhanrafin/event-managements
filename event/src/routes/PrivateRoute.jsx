 
import { Navigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
     const { user,loading } = useAuth();
    const location = useLocation()
    // console.log(user)
    if (loading) {
        return <div className='flex justify-center items-center'>

            <h2 className='text-3xl  font-bold'>Loading ...</h2>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;