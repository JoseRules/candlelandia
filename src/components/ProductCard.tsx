'use client'
import { useState } from "react";
import Image from "next/image";
import StarRating from "./StartRating";
import { CartIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/utils/types";
import ProductOptionsModal from "./ProductOptionsModal";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    router.push(`/candle/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Check if product has options
    if (product.productOptions && product.productOptions.length > 0) {
      setIsModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleAddToCartWithOptions = (selectedOptions: Record<string, string>) => {
    addToCart(product, selectedOptions);
  };

  return (
    <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={handleCardClick}>
      {/* Product Image */}
      <div className="relative h-48">
        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-highlight mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-highlight">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xl font-bold text-primary">
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-90 w-full sm:w-auto"
          >
            <CartIcon size={16} color="#ffffff" className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      {/* Product Options Modal */}
      <ProductOptionsModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCartWithOptions}
      />
    </div>
  );
};

export default ProductCard;