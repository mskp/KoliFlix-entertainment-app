// Importing createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Creating a slice of the Redux state for authentication
export const authSlice = createSlice({
  // Name of the slice, used to generate action types
  name: 'auth',

  // Initial state for the slice
  initialState: {
    accessToken: ""
  },

  // Reducers for updating the state
  reducers: {
    // Reducer for setting authentication data
    setAuth: (state, action) => {
      // Updating the accessToken in the state with the payload from the action
      state.accessToken = action.payload;
    },
  },
});

// Exporting the setAuth action creator
export const { setAuth } = authSlice.actions;

// Exporting the reducer function to be used in the Redux store configuration
export default authSlice.reducer;