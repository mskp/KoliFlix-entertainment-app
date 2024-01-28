// Importing necessary dependencies from React and Redux
import { useSelector, useDispatch } from 'react-redux';

// Importing the Redux action creator to set modal state
import { setIsOpen } from '@/redux/slices/modalSlice';

// Custom React hook for handling logout modal-related state
export default function useLogoutModal() {
    // Accessing the 'isOpen' state from the modal slice in the Redux store
    const isOpen = useSelector(state => state.modal.isOpen);

    // Accessing the Redux dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Returning an object with 'isOpen' state and a function to update 'isOpen'
    return {
        // Current state of the logout modal (whether it's open or closed)
        isOpen,
        // Function to update the state of the logout modal
        setIsOpen: (newIsOpen) => {
            // Dispatching the 'setIsOpen' action with the new state for the modal
            dispatch(setIsOpen(newIsOpen));
        }
    };
}
