
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  category: 'Oversized' | 'Capsule' | 'Accessory' | 'Myth Pop';
  mythStory: string;
  description: string;
  tags: string[];
  soundProfile?: 'drum' | 'wind' | 'electric' | 'hover';
  oracleTraits?: string[]; // Traits for matching logic e.g., ['void', 'chaos', 'power']
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  POST_PURCHASE = 'POST_PURCHASE',
  ASHRAM = 'ASHRAM',
  COMMUNITY = 'COMMUNITY',
  COMING_SOON = 'COMING_SOON',
}