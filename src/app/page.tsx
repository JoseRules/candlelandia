import Image from "next/image";

// Sample product data
const products = [
  {
    id: 1,
    name: "Lavender Dreams",
    description: "A soothing blend of lavender and vanilla that creates the perfect atmosphere for relaxation and sleep.",
    price: 24.99,
    rating: 4.8,
    image: "/api/placeholder/300/300",
    reviews: 127
  },
  {
    id: 2,
    name: "Rose Garden",
    description: "Elegant rose petals combined with subtle jasmine notes for a romantic and luxurious ambiance.",
    price: 29.99,
    rating: 4.9,
    image: "/api/placeholder/300/300",
    reviews: 89
  },
  {
    id: 3,
    name: "Ocean Breeze",
    description: "Fresh sea salt and ocean air scents that bring the calming essence of the coast to your home.",
    price: 22.99,
    rating: 4.7,
    image: "/api/placeholder/300/300",
    reviews: 156
  },
  {
    id: 4,
    name: "Vanilla Cream",
    description: "Rich, creamy vanilla with hints of caramel - perfect for creating a warm, cozy atmosphere.",
    price: 19.99,
    rating: 4.6,
    image: "/api/placeholder/300/300",
    reviews: 203
  },
  {
    id: 5,
    name: "Citrus Burst",
    description: "Energizing blend of lemon, orange, and grapefruit that brightens any space with fresh vibrancy.",
    price: 21.99,
    rating: 4.5,
    image: "/api/placeholder/300/300",
    reviews: 94
  },
  {
    id: 6,
    name: "Sandalwood Serenity",
    description: "Exotic sandalwood and patchouli create a meditative atmosphere perfect for mindfulness and focus.",
    price: 27.99,
    rating: 4.8,
    image: "/api/placeholder/300/300",
    reviews: 78
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor"/>
            <stop offset="50%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <path fill="url(#half-star)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

// Product card component
const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <div className="bg-white dark:bg-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-200 dark:border-purple-600">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-purple-700 dark:to-pink-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-pink-400 dark:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C12.5523 2 13 2.44772 13 3V4H14C15.1046 4 16 4.89543 16 6V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V6C8 4.89543 8.89543 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM10 6V18H14V6H10ZM12 8C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8ZM12 12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12Z" />
          </svg>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-pink-200 mb-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-purple-600 dark:text-pink-300 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-purple-600 dark:text-pink-300">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-800 dark:text-pink-200">
            ${product.price}
          </span>
          
          <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 dark:bg-pink-400 dark:hover:bg-pink-500 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-purple-900 dark:to-pink-900">
      
      {/* Products Section */}
      <div className="px-4 sm:px-8 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto pt-8">
          
          {/* Product Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="px-4 sm:px-8 lg:px-20 py-8 border-t border-pink-200 dark:border-purple-700">
        <div className="max-w-7xl mx-auto flex gap-6 flex-wrap items-center justify-center text-purple-600 dark:text-pink-300">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-purple-800 dark:hover:text-pink-200 transition-colors"
            href="#"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C12.5523 2 13 2.44772 13 3V4H14C15.1046 4 16 4.89543 16 6V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V6C8 4.89543 8.89543 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM10 6V18H14V6H10Z" />
            </svg>
            About Us
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-purple-800 dark:hover:text-pink-200 transition-colors"
            href="#"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C12.5523 2 13 2.44772 13 3V4H14C15.1046 4 16 4.89543 16 6V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V6C8 4.89543 8.89543 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM10 6V18H14V6H10Z" />
            </svg>
            Collections
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-purple-800 dark:hover:text-pink-200 transition-colors"
            href="#"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C12.5523 2 13 2.44772 13 3V4H14C15.1046 4 16 4.89543 16 6V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V6C8 4.89543 8.89543 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM10 6V18H14V6H10Z" />
            </svg>
            Contact →
          </a>
        </div>
      </footer>
    </div>
  );
}
