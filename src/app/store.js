import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import purchaseReducer from '../features/purchaseSlice'; // Import purchase slice

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    purchases: purchaseReducer, // Add purchase slice
  },
});
