"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSearchProducts } from "@/hooks/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [, { isPending, data }] = useSearchProducts(
    query.trim() ? { search: query } : undefined
  );

  // Use data from the query response (not global state)
  const products = data?.data || [];

  // Empty Query State
  if (!query || query.trim() === "") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Search className="h-24 w-24 mx-auto mb-6 text-muted-foreground/40" />
          <h1 className="text-3xl font-bold mb-4">Search Products</h1>
          <p className="text-muted-foreground mb-6">
            Enter a search term in the search bar above to find products
          </p>
          <Button asChild size="lg">
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Loading State
  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Searching for "{query}"...</p>
          </div>
        </div>
      </div>
    );
  }

  // No Results State
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Search className="h-24 w-24 mx-auto mb-6 text-muted-foreground/40" />
          <h1 className="text-3xl font-bold mb-4">
            No results found for &quot;{query}&quot;
          </h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find any products matching your search. Try different keywords or browse all products.
          </p>
          <Button asChild size="lg">
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Results Display
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground">
          Found {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} item={product} size="half" />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
