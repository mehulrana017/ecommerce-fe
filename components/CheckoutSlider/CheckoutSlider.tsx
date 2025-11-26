"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useGetCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/cart";
import { useCreateCheckoutSession } from "@/hooks/stripe";

export interface CheckoutSliderHandle {
  open: () => void;
  close: () => void;
}

const CheckoutSlider = forwardRef<CheckoutSliderHandle, object>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const {
      state: { cart },
      setCart,
    } = useAppContext();

    // Hooks
    const [refetchCart, { data: cartData, isPending: isLoadingCart }] =
      useGetCart();
    const [updateCartItem, { isPending: isUpdating }] = useUpdateCartItem();
    const [removeFromCart, { isPending: isRemoving }] = useRemoveFromCart();
    const [createCheckoutSession, { isPending: isCheckingOut }] =
      useCreateCheckoutSession();

    // Fetch cart when slider opens
    useEffect(() => {
      if (open) {
        refetchCart();
      }
    }, [open, refetchCart]);

    // Sync cart data with context
    useEffect(() => {
      if (cartData) {
        setCart(cartData);
      }
    }, [cartData]);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    // Handlers
    const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
      updateCartItem({ cartItemId, quantity: newQuantity });
    };

    const handleRemoveItem = (cartItemId: string) => {
      removeFromCart(cartItemId);
    };

    const handleCheckout = () => {
      if (!cart || cart.items.length === 0) {
        return;
      }
      createCheckoutSession();
    };

    // Calculate totals
    const subtotal = cart?.total || 0;
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    const isEmpty = !cart || cart.items.length === 0;

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col p-4">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              {isEmpty
                ? "Your cart is empty"
                : `${cart.items.length} item${
                    cart.items.length > 1 ? "s" : ""
                  } in your cart`}
            </SheetDescription>
          </SheetHeader>

          {isLoadingCart ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
              <p className="text-muted-foreground text-center">
                Your cart is empty
                <br />
                <span className="text-sm">
                  Add some products to get started!
                </span>
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-autospace-y-4">
                {cart.items.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-muted/30 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-xs text-gray-400">
                              No image
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Selector - Compact Version */}
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || isUpdating}
                            className="h-8 w-8"
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={
                              item.quantity >= (product.stock || 999) ||
                              isUpdating
                            }
                            className="h-8 w-8"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button & Subtotal */}
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isRemoving}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-2 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <SheetFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || isEmpty}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    );
  }
);

CheckoutSlider.displayName = "CheckoutSlider";

export default CheckoutSlider;
