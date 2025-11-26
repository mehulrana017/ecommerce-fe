// app/orders/page.tsx
import React, { Suspense } from "react";
import OrdersPage from "@/components/OrdersPage"; // path to your client component

export default function OrdersServerPage() {
  return (
    <div>
      <h1 className="sr-only">Orders</h1>
      <Suspense
        fallback={<div className="p-8 text-center">Loading orders…</div>}
      >
        <OrdersPage />
      </Suspense>
    </div>
  );
}
