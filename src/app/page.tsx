import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { products } from "@/utils/products";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      
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
      <Footer />
    </div>
  );
}
