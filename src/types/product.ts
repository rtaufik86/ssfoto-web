import { Database } from './database';

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductCategory = Product['category'];
export type ProductStatus = Product['status'];

export interface ProductSpecifications {
  sizes?: string[];
  background_colors?: string[];
  quantity?: number;
  turnaround?: string;
  size?: string;
  paper?: string;
  finish?: string | string[];
  material?: string;
  materials?: string[];
  frame?: string;
  colors?: string;
  cover?: string;
  binding?: string;
  min_pages?: number;
  duration?: string;
  includes?: string[];
  [key: string]: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpecs?: Record<string, any>;
  uploadedFiles?: UploadedFile[];
  specialInstructions?: string;
}

export interface UploadedFile {
  id?: string;
  file: File;
  preview: string;
  checksum?: string;
  isDuplicate?: boolean;
}

