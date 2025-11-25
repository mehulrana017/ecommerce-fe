"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "../ProductCard";

const ProductGrid = () => {
  const {
    state: { products },
  } = useAppContext();
  return (
    <div className="grid grid-cols-4 gap-3">
      {products.map((p, i) => (
        <ProductCard key={i} item={p} size="half" />
      ))}
    </div>
  );
};

export default ProductGrid;
