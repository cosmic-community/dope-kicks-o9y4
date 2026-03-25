export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: number;
    sale_price?: number;
    category?: Category;
    product_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string | { key: string; value: string };
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    reviewer_name?: string;
    rating?: number | string | { key: string; value: string };
    review?: string;
  };
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';