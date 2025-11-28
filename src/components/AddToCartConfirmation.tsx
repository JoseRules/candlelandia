'use client';

import { useEffect } from 'react';
import { CartItem } from '@/contexts/CartContext';

interface AddToCartConfirmationProps {
  isOpen: boolean;
  product: CartItem | null;
  onClose: () => void;
  onViewCart?: () => void;
}

export default function AddToCartConfirmation({ 
  isOpen, 
  product, 
  onClose,
  onViewCart
}: AddToCartConfirmationProps) {
  // Auto-close after 3 seconds
  useEffect(() => {
    if (isOpen && product) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, product, onClose]);

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-foreground rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          <div className="p-6">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-primary text-center mb-2">
              Articulo agregado al carrito!
            </h3>
            
            <div className="bg-background rounded-lg p-4 mb-4 shadow-sm ">
              <div className="flex gap-3">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-primary mb-1">{product.name}</h4>
                  
                  {/* Selected Options */}
                  {product.selectedOptions && Object.keys(product.selectedOptions).length > 0 && (
                    <div className="text-xs text-primary mb-1 space-y-0.5">
                      {Object.entries(product.selectedOptions).map(([key, value]) => (
                        <div key={key} className="flex gap-1">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-primary mb-1">Cantidad: {product.quantity}</p>
                  <p className="text-lg font-bold text-accent">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-col md:flex-row">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-primary font-medium py-3 rounded-lg transition-colors duration-200"
              >
                Continuar Comprando
              </button>
              <button
                onClick={onViewCart || onClose}
                className="flex-1 bg-accent hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Ver Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

