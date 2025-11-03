export type ProductOption = {
  name: string;
  options: string[];
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  reviews: number;
  productOptions?: ProductOption[];
}