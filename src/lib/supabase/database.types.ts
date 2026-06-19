export type ProductCategory =
  | 'dogs'
  | 'cats'
  | 'birds'
  | 'accessories'
  | 'grooming'
  | 'aquarium';

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  category: ProductCategory;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  is_featured: boolean;
  is_new: boolean;
  in_stock: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Partial<Product>;
        Update: Partial<Product>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>;
        Update: Partial<ContactMessage>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Pick<NewsletterSubscriber, 'email'>;
        Update: Partial<NewsletterSubscriber>;
      };
    };
  };
}
