import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tproducts } from "../../types/productTypes";
// Adjust the import based on your structure

// Define the initial state
interface ProductState {
  products: Tproducts[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Create async thunk for posting a product
export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (product: Tproducts) => {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      product
    ); // Adjust the URL based on your server port
    return response.data;
  }
);

// Create product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { actions: productActions } = productSlice;
export const productReducer = productSlice.reducer;
export type { ProductState }; // Export the type
