"use client";

import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useAddToCart } from "@/hooks/cart";
import { useRef, useState } from "react";
import type { CheckoutSliderHandle } from "@/components/CheckoutSlider/CheckoutSlider";
import CheckoutSlider from "@/components/CheckoutSlider";
import { GridTileImage } from "@/components/ProductCard/components/GridTitleImage";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import QuantitySelector from "@/components/QuantitySelector";
import StarRating from "@/components/StarRating";
import Link from "next/link";

const ProductPage = () => {
  const params = useParams();
  const id = params.id as string;

  const {
    state: { products, loading },
  } = useAppContext();
  const [addToCart, { isPending }] = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const checkoutSliderRef = useRef<CheckoutSliderHandle>(null);

  // Loading state
  if (loading.products) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Find product
  const product = products.find((p) => p._id === id);

  // Product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Product inactive
  if (!product.isActive) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h1 className="text-3xl font-bold">Product Unavailable</h1>
          <p className="text-gray-600">
            This product is currently unavailable.
          </p>
          <Button asChild>
            <Link href="/">Browse Other Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculate similar products
  const similarProducts = products
    .filter(
      (p) =>
        p._id !== product._id &&
        p.category === product.category &&
        p.isActive
    )
    .slice(0, 4);

  const isOutOfStock = product.stock === 0;

  // Handlers
  const handleAddToCart = () => {
    addToCart({ productId: product._id, quantity });
  };

  const handleBuyNow = () => {
    addToCart(
      { productId: product._id, quantity },
      {
        onSuccess: () => {
          checkoutSliderRef.current?.open();
        },
      }
    );
  };

  return (
    <>
      <CheckoutSlider ref={checkoutSliderRef} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="aspect-square relative">
            {product.images[0] ? (
              <GridTileImage
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                isInteractive={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg border border-gray-200">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

            <StarRating rating={product.rating} reviewCount={product.reviewCount} />

            <div className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>

            {isOutOfStock ? (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-md font-medium">
                Out of Stock
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{product.stock}</span> in stock
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={product.stock}
              disabled={isOutOfStock}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                className="flex-1"
              >
                {isPending ? "Adding..." : "Add to Cart"}
              </Button>

              <Button
                size="lg"
                onClick={handleBuyNow}
                disabled={isOutOfStock || isPending}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p._id} item={p} size="half" />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductPage;
