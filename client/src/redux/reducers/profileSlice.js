import { createSlice } from '@reduxjs/toolkit';
const initialState ={
  profileDetails:{},
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfileDetails: (state, action) => {
     const {profileDetails}= action.payload
     return {
      ...state,
      profileDetails,
      }
    }
  }});

// this is for dispatch
export const {addProfileDetails ,logout} = profileSlice.actions;

// this is for configureStore
export default profileSlice.reducer;