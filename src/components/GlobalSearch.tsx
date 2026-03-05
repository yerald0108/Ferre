import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Search, Tag } from 'lucide-react';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const { data: products } = useProducts();
  const { data: categories } = useCategories();

  const handleSelectProduct = (productId: string) => {
    onOpenChange(false);
    navigate(`/producto/${productId}`);
  };

  const handleSelectCategory = (categoryId: string) => {
    onOpenChange(false);
    navigate(`/productos?categoria=${categoryId}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar productos, categorías..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading="Categorías">
          {categories?.map((cat) => (
            <CommandItem
              key={cat.id}
              value={`cat-${cat.name}`}
              onSelect={() => handleSelectCategory(cat.id)}
            >
              <Tag className="mr-2 h-4 w-4" />
              <span>{cat.icon} {cat.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Productos">
          {products?.slice(0, 20).map((product) => (
            <CommandItem
              key={product.id}
              value={`prod-${product.name}`}
              onSelect={() => handleSelectProduct(product.id)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>{product.name}</span>
              <span className="ml-auto text-sm text-muted-foreground">
                ${product.price.toLocaleString()}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
