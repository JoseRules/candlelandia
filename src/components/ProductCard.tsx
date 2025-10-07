import Image from "next/image";
import StarRating from "./StartRating";
import { CartIcon } from "@/assets/icons";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-purple-700 dark:to-pink-700">
        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
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
          
          <button className="flex items-center justify-center gap-2 bg-accent text-secondary px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto">
            <CartIcon size={16} color="#ffffff" className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;