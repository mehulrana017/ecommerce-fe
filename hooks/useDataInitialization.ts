"use client";

import { useEffect } from "react";
import { useGetProducts } from "./product";
import { useGetCart } from "./cart";
import { useGetOrders } from "./order";
import { useAppContext } from "@/context/AppContext";

export const useDataInitialization = () => {
  const { state, setCart, setOrders } = useAppContext();
  const [refetchProducts] = useGetProducts();
  const [refetchCart, { data: cartData }] = useGetCart();
  const [refetchOrders, { data: ordersData }] = useGetOrders();

  useEffect(() => {
    // Fetch products on initial load
    refetchProducts();

    // Fetch cart and orders only if user is authenticated
    if (state.currentUser) {
      refetchCart();
      refetchOrders();
    }
  }, [state.currentUser]);

  // Sync cart data with context
  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  // Sync orders data with context
  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  return {
    isInitialized: true,
  };
};
