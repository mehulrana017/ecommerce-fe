"use client";

import Link from "next/link";
import { Suspense, useRef } from "react";
import { usePathname } from "next/navigation";
import Search, { SearchSkeleton } from "./search";
import { ShoppingBasketIcon, LogOut, Package } from "lucide-react";
import CheckoutSlider from "../CheckoutSlider";
import { CheckoutSliderHandle } from "../CheckoutSlider/CheckoutSlider";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth";
import { Badge } from "@/components/ui/badge";

const { SITE_NAME } = process.env;

export function Navbar() {
  const pathname = usePathname();
  const { state } = useAppContext();
  const checkoutSliderRef = useRef<CheckoutSliderHandle>(null);
  const [logout] = useLogout();

  // Hide navbar on login and signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const isAuthenticated = !!state.currentUser;
  const cartItemCount =
    state.cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <CheckoutSlider ref={checkoutSliderRef} />

      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden"></div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              Mini-Commerce
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3 gap-3 items-center">
            {isAuthenticated ? (
              // Show cart, orders, and logout when logged in
              <>
                <Button variant="ghost" asChild className="gap-2">
                  <Link href="/orders">
                    <Package className="h-5 w-5" />
                    <span className="hidden md:inline">Orders</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="relative gap-2"
                  onClick={() => checkoutSliderRef?.current?.open()}
                >
                  <ShoppingBasketIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Cart</span>
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>

                <Button variant="ghost" onClick={logout} className="gap-2">
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              // Show login/signup buttons when not logged in
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
