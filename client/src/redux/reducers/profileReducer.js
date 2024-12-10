import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'profile',
  initialState: {
    username: null,
    email:null,
    token:null
  },
  reducers: {
    SET_NAME: (state, action) => {
      state.username = action.payload;
    }
  }
});

export const { SET_NAME } = userSlice.actions;
export default userSlice.reducer;