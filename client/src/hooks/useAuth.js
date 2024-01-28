// Importing necessary dependencies from React and Redux
import { useSelector, useDispatch } from 'react-redux';

// Importing the Redux action creator to set authentication data
import { setAuth } from '@/redux/slices/authSlice';

// Custom React hook for handling authentication-related state
export default function useAuth() {
    // Accessing the 'auth' state from the Redux store
    const auth = useSelector((state) => state.auth);

    // Accessing the Redux dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Returning an object with 'auth' state and a function to update 'auth'
    return {
        // Current authentication state
        auth,
        // Function to update authentication state
        setAuth: newAuthData => {
            // Dispatching the 'setAuth' action with new authentication data
            dispatch(setAuth(newAuthData));
        }
    };
}
