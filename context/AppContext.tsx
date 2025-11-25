"use client";

import React, { createContext, useContext, useReducer } from "react";
import type { Product, Cart, Order, User } from "@/lib/types/api";

const TOKEN = "token";
const USER = "user";

const getLoggedInUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const loggedInUser = localStorage?.getItem(USER);
  return loggedInUser ? JSON?.parse(loggedInUser) : null;
};

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage?.getItem(TOKEN);
};

interface AppState {
  currentUser: User | null;
  authToken: string | null;
  products: Product[];
  cart: Cart | null;
  orders: Order[];
  loading: {
    products: boolean;
    cart: boolean;
    orders: boolean;
    auth: boolean;
  };
}

const initialState: AppState = {
  currentUser: getLoggedInUser(),
  authToken: getToken(),
  products: [],
  cart: null,
  orders: [],
  loading: {
    products: false,
    cart: false,
    orders: false,
    auth: false,
  },
};

type Action =
  | { type: "SET_CURRENT_USER"; data: User | null }
  | { type: "SET_TOKEN"; data: string | null }
  | { type: "SET_PRODUCTS"; data: Product[] }
  | { type: "SET_CART"; data: Cart | null }
  | { type: "SET_ORDERS"; data: Order[] }
  | { type: "SET_LOADING"; entity: keyof AppState["loading"]; value: boolean }
  | { type: "LOGOUT" };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      if (typeof window !== "undefined") {
        localStorage.setItem(
          USER,
          action.data ? JSON.stringify(action.data) : ""
        );
      }
      return { ...state, currentUser: action.data };

    case "SET_TOKEN":
      if (typeof window !== "undefined") {
        if (action.data) {
          localStorage.setItem(TOKEN, action.data);
        } else {
          localStorage.removeItem(TOKEN);
        }
      }
      return { ...state, authToken: action.data };

    case "SET_PRODUCTS":
      return { ...state, products: action.data };

    case "SET_CART":
      return { ...state, cart: action.data };

    case "SET_ORDERS":
      return { ...state, orders: action.data };

    case "SET_LOADING":
      return {
        ...state,
        loading: { ...state.loading, [action.entity]: action.value },
      };

    case "LOGOUT":
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
      return {
        ...initialState,
        currentUser: null,
        authToken: null,
        products: [],
        cart: null,
        orders: [],
      };

    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  setCurrentUser: (data: User | null) => void;
  setToken: (data: string | null) => void;
  setProducts: (data: Product[]) => void;
  setCart: (data: Cart | null) => void;
  setOrders: (data: Order[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrentUser = (data: User | null) => {
    dispatch({ type: "SET_CURRENT_USER", data });
  };

  const setToken = (data: string | null) => {
    dispatch({ type: "SET_TOKEN", data });
  };

  const setProducts = (data: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", data });
  };

  const setCart = (data: Cart | null) => {
    dispatch({ type: "SET_CART", data });
  };

  const setOrders = (data: Order[]) => {
    dispatch({ type: "SET_ORDERS", data });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setCurrentUser,
    setToken,
    setProducts,
    setCart,
    setOrders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

export { AppContext };
