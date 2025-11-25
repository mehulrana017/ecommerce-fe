import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function FeaturedProductsCards() {
  return (
    <section className="container mt-12">
      <div className="">
        <h2 className="font-semibold text-2xl md:text-3xl mb-1 md:mb-3">
          Featured Products
        </h2>
        <p className="max-w-4xl text-sm md:text-md leading-[1.5] tracking-[-2%] mb-2">
          Ideas to help Bring Home to Life based on your recently viewed
          products. Share your space on Instagram and tag @Penpengrian
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 py-5 overflow-auto">
        <div className="w-full border rounded-lg">
          <Skeleton className="w-full h-[400px] mb-5" />
          <div className="space-y-2 mb-8 px-5">
            <Skeleton className="w-[120px] h-6" />
            <Skeleton className="w-[180px] h-4" />
            <Skeleton className="w-[160px] h-4" />
            <Skeleton className="w-[80px] h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
