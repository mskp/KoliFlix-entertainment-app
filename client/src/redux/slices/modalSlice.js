// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice of the Redux state for the modal
export const modalSlice = createSlice({
    // Name of the slice, used to generate action types
    name: "modal",

    // Initial state for the slice
    initialState: {
        isOpen: false
    },

    // Reducers for updating the state
    reducers: {
        // Reducer for setting the modal open/closed state
        setIsOpen: (state, action) => {
            // Updating the isOpen property in the state with the payload from the action
            state.isOpen = action.payload;
        }
    }
});

// Exporting the setIsOpen action creator
export const { setIsOpen } = modalSlice.actions;

// Exporting the reducer function to be used in the Redux store configuration
export default modalSlice.reducer;
