import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TUser } from "../../types";

type TUserState = {
  user?: Omit<TUser, "password">;
};

const initialState: TUserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defineUser: (state, action: PayloadAction<TUserState>) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { defineUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
