"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useCancelOrder } from "@/hooks/order";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OrdersPage = () => {
  const {
    state: { currentUser, orders },
  } = useAppContext();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [cancelOrder, { isPending: isCancelling }] = useCancelOrder();

  // Show success message if coming from Stripe
  useEffect(() => {
    if (sessionId) {
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      });
    }
  }, [sessionId]);

  // Auth check
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p className="text-muted-foreground mb-6">
          You need to be logged in to view your orders
        </p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground/40" />
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-muted-foreground mb-6">
          You haven&apos;t placed any orders yet. Start shopping!
        </p>
        <Button asChild size="lg">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  // Status icon helper
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your order history
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(order.status)}
                  <h3 className="font-semibold text-lg capitalize">
                    {order.status}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Order ID: {order.orderId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Placed on:{" "}
                  {new Date(order.createdAt || "").toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">${(order.totalPrice ?? 0).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {order.products.length} item{order.products.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              {order.products.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.products.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  +{order.products.length - 3} more items
                </p>
              )}
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="text-sm text-muted-foreground mb-4">
                <p className="font-medium mb-1">Shipping Address:</p>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/orders/${order._id}`}>View Details</Link>
              </Button>

              {["pending", "processing"].includes(order.status) && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={isCancelling}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
