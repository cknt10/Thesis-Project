export interface ProductCard{
    id: string;
    headline: string;
    description: string;
    categories: string[];
    tag: string[];
    badges: string[];
    sizes: string[];
    price: number;
    privileges?: string[];
    imgSrc: string;
  }
  