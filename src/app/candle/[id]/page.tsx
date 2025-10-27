'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/utils/products";
import StarRating from "@/components/StartRating";
import { CartIcon } from "@/assets/icons";
import { use } from "react";
import { useCart } from "@/contexts/CartContext";

export default function CandlePage({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-accent text-secondary px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="mb-8 text-accent hover:text-primary transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Carousel Section */}
          <div className="space-y-4">
            {/* Main Image with Navigation Arrows */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white aspect-square">
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/80 hover:bg-secondary text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/80 hover:bg-secondary text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-secondary/80 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'ring-4 ring-accent shadow-lg scale-105' 
                        : 'ring-2 ring-gray-200 hover:ring-accent/50 hover:scale-105'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-lg text-highlight">
                  {product.rating} ({product.reviews} calificaciones)
                </span>
              </div>

              {/* Price */}
              <div className="text-5xl font-bold text-accent mb-6">
                ${product.price}
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-200 py-6">
              <h2 className="text-xl font-semibold text-primary mb-3">Descripción</h2>
              <p className="text-highlight text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Características</h3>
              <ul className="space-y-2 text-highlight">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Artesanal y 100% natural
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  40-50 horas de quemado
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Aceites de fragancia premium
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Eco-friendly y sostenible
                </li>
              </ul>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6">
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-3 bg-accent hover:opacity-90 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <CartIcon size={24} color="#ffffff" className="w-6 h-6" />
                Agregar al carrito
              </button>
            </div>

            {/* Additional Info 
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-highlight space-y-2">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Free shipping on orders over $50
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-day satisfaction guarantee
              </p>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}