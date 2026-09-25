"use client";

import { useState } from "react";
import { Minus, Plus, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductBuyBox({ price, unit }: { price: string; unit: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-6">
      <p className="text-2xl font-semibold">
        {price}{" "}
        <span className="text-sm font-normal uppercase tracking-widest text-muted-foreground">
          {unit}
        </span>
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-border">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setQuantity((n) => Math.max(1, n - 1))}
            className="rounded-l-full"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center tabular-nums">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setQuantity((n) => n + 1)}
            className="rounded-r-full"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="button"
          className="flex-grow bg-black py-6 text-lg font-medium text-white hover:bg-gray-900"
          onClick={() => setAdded(true)}
        >
          {added ? "Added to bag" : "Add to bag"}
        </Button>
      </div>

      {added && (
        <p className="text-sm text-muted-foreground">
          Demo only — this bag is simulated. We will confirm orders by email.
        </p>
      )}

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Share:</span>
        <span className="text-gray-400">
          <Facebook className="h-5 w-5" />
        </span>
        <span className="text-gray-400">
          <Twitter className="h-5 w-5" />
        </span>
        <span className="text-gray-400">
          <Instagram className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
