'use client'
import { useState, useEffect } from "react";
import { Product } from "@/utils/types";
import { CartIcon } from "@/assets/icons";

interface ProductOptionsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (selectedOptions: Record<string, string>) => void;
}

const ProductOptionsModal = ({ product, isOpen, onClose, onAddToCart }: ProductOptionsModalProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Reset selected options when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOptions({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const areAllOptionsSelected = () => {
    if (!product.productOptions || product.productOptions.length === 0) {
      return true;
    }
    return product.productOptions.every(
      (option) => selectedOptions[option.name] && selectedOptions[option.name] !== ""
    );
  };

  const handleAddToCart = () => {
    if (areAllOptionsSelected()) {
      onAddToCart(selectedOptions);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-foreground rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-foreground border-b border-gray-200 p-6 flex items-start justify-between rounded-t-2xl">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary mb-1">
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-accent">
                ${product.price}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-highlight hover:text-primary transition-colors ml-4"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        {/* Product Image */}
        <div className="px-6 pt-4">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-md bg-white">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Selecciona las opciones:
          </h3>
          {product.productOptions?.map((option) => (
            <div key={option.name} className="space-y-2">
              <label htmlFor={`modal-${option.name}`} className="block text-sm font-medium text-highlight">
                {option.name} <span className="text-red-500">*</span>
              </label>
              <select
                id={`modal-${option.name}`}
                value={selectedOptions[option.name] || ""}
                onChange={(e) => handleOptionChange(option.name, e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent transition-colors text-primary bg-white"
              >
                <option value="">Selecciona {option.name}</option>
                {option.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-foreground border-t border-gray-200 p-6 space-y-3 rounded-b-2xl">
          <button
            onClick={handleAddToCart}
            disabled={!areAllOptionsSelected()}
            className={`w-full flex items-center justify-center gap-3 text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg ${
              areAllOptionsSelected()
                ? 'bg-accent hover:opacity-90 text-white hover:shadow-xl cursor-pointer'
                : 'bg-gray-400 text-white cursor-not-allowed opacity-60'
            }`}
          >
            <CartIcon size={24} color="#ffffff" className="w-6 h-6" />
            Agregar al carrito
          </button>
          {!areAllOptionsSelected() && (
            <p className="text-sm text-highlight text-center">
              Por favor selecciona todas las opciones
            </p>
          )}
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
};

export default ProductOptionsModal;

