'use client';

import { CartIcon, Logo } from '@/assets/icons';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';

export default function TopNav() {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-1">
              <div className="flex-shrink-0">
                <Logo size={50} color="#3a3122" className="w-12 h-12" />
              </div>
              <h1 className="text-xl font-bold text-primary">
                GDL Glow
              </h1>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none text-secondary bg-accent font-medium shadow-md hover:shadow-lg"
              aria-label="Shopping cart"
            >
              <CartIcon size={20} color="#ffffff" className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}