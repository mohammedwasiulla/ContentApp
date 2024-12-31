import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: (() => {
    try {
      const savedPastes = localStorage.getItem("pastes");
      return savedPastes ? JSON.parse(savedPastes) : [];
    } catch (error) {
      console.error("Failed to parse pastes from localStorage:", error);
      return []; // Default to an empty array if parsing fails
    }
  })(),
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Correctly store as JSON
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((paste) => paste._id === updatedPaste._id);
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Update localStorage
        toast.success("Paste updated successfully");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes"); // Remove all pastes from localStorage
      toast.success("All pastes have been reset");
    },
    removeFromPastes: (state, action) => {
      const id = action.payload.id; // Extract the paste ID
      state.pastes = state.pastes.filter((paste) => paste._id !== id); // Remove the paste from state
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Update localStorage
      toast.success("Paste deleted successfully"); // Show success toast
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
