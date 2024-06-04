import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AccountState {
  address: string;
  balance: string;
}

const initialState: AccountState = {
  address: "",
  balance: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<AccountState>) => {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
    removeAccount: (state) => {
      state.address = "";
      state.balance = "";
    },
  },
});

export const { addAccount, removeAccount } = accountSlice.actions;

export default accountSlice.reducer;
