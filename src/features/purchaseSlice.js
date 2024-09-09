// src/features/purchaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchases: [],
};

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase(state, action) {
      state.purchases.push(action.payload);
    },
    clearPurchases(state) {
      state.purchases = [];
    },
  },
});

export const { addPurchase, clearPurchases } = purchaseSlice.actions;
export default purchaseSlice.reducer;
