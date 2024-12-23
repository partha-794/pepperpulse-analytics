import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

// Sample product titles
export const productTitles = [
  "All Products",
  "Dining Chair",
  "Coffee Table",
  "Bed Frame",
  "Sofa Set",
  "Study Table",
  "Wardrobe",
];

export const ProductSelector = ({ value, onValueChange }: ProductSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        {productTitles.map((title) => (
          <SelectItem key={title} value={title}>
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};