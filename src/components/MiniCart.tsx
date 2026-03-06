import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Link } from 'react-router-dom';

interface MiniCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MiniCart({ open, onOpenChange }: MiniCartProps) {
  const { items, removeItem, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[350px] sm:w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Tu Carrito ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Tu carrito está vacío
            </p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 items-start">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-lg bg-muted"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    x{item.quantity}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <div className="flex gap-2">
              <Link to="/carrito" className="flex-1" onClick={() => onOpenChange(false)}>
                <Button variant="outline" className="w-full">
                  Ver carrito
                </Button>
              </Link>
              <Link to="/checkout" className="flex-1" onClick={() => onOpenChange(false)}>
                <Button className="w-full gap-1">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
