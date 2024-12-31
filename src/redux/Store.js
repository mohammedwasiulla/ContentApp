import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './pasteSlice'; // Correctly import the reducer

export const store = configureStore({
  reducer: {
    paste: pasteReducer, // Assign the imported reducer to the key
  },
});
