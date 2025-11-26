"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({
  rating,
  reviewCount,
  size = "md",
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1;
    const halfFilled = rating > i && rating < i + 1;

    return (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          filled
            ? "fill-yellow-400 text-yellow-400"
            : halfFilled
              ? "fill-yellow-200 text-yellow-400"
              : "fill-none text-gray-300"
        )}
      />
    );
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">{stars}</div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount} reviews)`}
      </span>
    </div>
  );
};

export default StarRating;
