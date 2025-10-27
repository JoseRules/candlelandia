'use client';

import TopNav from "@/components/TopNav";
import { CartProvider, useCart } from "@/contexts/CartContext";
import AddToCartConfirmation from "@/components/AddToCartConfirmation";

function CartContent({ children }: { children: React.ReactNode }) {
  const { 
    confirmationItem, 
    isConfirmationOpen, 
    closeConfirmation,
    setIsCartOpen 
  } = useCart();

  const handleViewCart = () => {
    closeConfirmation();
    setIsCartOpen(true);
  };

  return (
    <>
      <TopNav />
      {children}
      <AddToCartConfirmation
        isOpen={isConfirmationOpen}
        product={confirmationItem}
        onClose={closeConfirmation}
        onViewCart={handleViewCart}
      />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartContent>{children}</CartContent>
    </CartProvider>
  );
}

