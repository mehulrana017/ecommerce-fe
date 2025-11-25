"use client";

import { useEffect } from "react";
import { useGetProducts } from "./product";
// import { useGetCart } from "./cart";
// import { useGetOrders } from "./order";
import { useAppContext } from "@/context/AppContext";

export const useDataInitialization = () => {
  const { state } = useAppContext();
  const [refetchProducts] = useGetProducts();
  // const [refetchCart] = useGetCart();
  // const [refetchOrders] = useGetOrders();

  useEffect(() => {
    // Fetch products on initial load
    refetchProducts();

    // Fetch cart and orders only if user is authenticated
    // if (state.authToken) {
    //   refetchCart();
    //   refetchOrders();
    // }
  }, []);

  return {
    isInitialized: true,
  };
};
