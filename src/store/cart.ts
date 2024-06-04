import { ProductType } from "@/types/product.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cart: ProductType[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ProductType>) => {
      state.cart = [...state.cart, action.payload];
    },
    removeCart: (state, action: PayloadAction<ProductType>) => {
      const newCartList = state.cart.filter((c) => c.id !== action.payload.id);
      state.cart = newCartList;
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
