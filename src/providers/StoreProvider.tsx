"use client";

import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
