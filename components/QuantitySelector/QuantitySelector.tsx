"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 999,
  disabled = false,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Quantity:</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-12 text-center font-medium">{value}</span>

        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
