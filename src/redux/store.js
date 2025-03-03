import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from './features/userSlice'; // Import your slice reducer

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer, // Use the slice reducer here
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
  });

export const wrapper = createWrapper(makeStore);