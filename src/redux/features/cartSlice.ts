import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  availableQuantity?: number; // For stock checking
  image?: string; // Image property
  brand?: string; // Brand property
};

interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload, // Spread to include all properties
          quantity: action.payload.quantity, // Set initial quantity
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
export type { CartState }; // Export the type
