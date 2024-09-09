import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
  },
  reducers: {
    // Add product to cart or update quantity if it exists
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },

    // Increment the quantity of an item
    incrementQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++; // Increase quantity
      }
    },

    // Decrement the quantity of an item, but ensure it doesn't go below 1
    decrementQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--; // Decrease quantity, minimum 1
      }
    },

    // Remove item from cart by filtering it out
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    // Clear all items from the cart
    clearCart(state) {
      state.items = []; // Empty cart
    },
  },
});

// Export the action creators
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// Export the cart reducer for store configuration
export default cartSlice.reducer;
