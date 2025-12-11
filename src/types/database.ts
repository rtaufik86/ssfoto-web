// ============================================================================
// SUPABASE DATABASE TYPES
// ============================================================================
// Auto-generated types based on schema.sql
// Run `npx supabase gen types typescript --local` to regenerate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone_number: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          base_price: number
          image_url: string | null
          specifications: Json | null
          is_featured: boolean
          status: 'active' | 'inactive' | 'out_of_stock'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          category: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          base_price: number
          image_url?: string | null
          specifications?: Json | null
          is_featured?: boolean
          status?: 'active' | 'inactive' | 'out_of_stock'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          category?: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          base_price?: number
          image_url?: string | null
          specifications?: Json | null
          is_featured?: boolean
          status?: 'active' | 'inactive' | 'out_of_stock'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      stores: {
        Row: {
          id: string
          name: string
          slug: string
          address: string
          city: string
          phone: string | null
          latitude: number | null
          longitude: number | null
          opening_hours: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          address: string
          city: string
          phone?: string | null
          latitude?: number | null
          longitude?: number | null
          opening_hours?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          address?: string
          city?: string
          phone?: string | null
          latitude?: number | null
          longitude?: number | null
          opening_hours?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          status: 'draft' | 'pending_payment' | 'payment_confirmed' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed' | 'cancelled' | 'refunded'
          subtotal: number
          shipping_cost: number
          total_amount: number
          delivery_method: 'pickup' | 'shipping'
          pickup_store_id: string | null
          shipping_address: string | null
          payment_method: string | null
          payment_proof_url: string | null
          paid_at: string | null
          customer_notes: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          status?: 'draft' | 'pending_payment' | 'payment_confirmed' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed' | 'cancelled' | 'refunded'
          subtotal: number
          shipping_cost?: number
          total_amount: number
          delivery_method: 'pickup' | 'shipping'
          pickup_store_id?: string | null
          shipping_address?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          paid_at?: string | null
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          status?: 'draft' | 'pending_payment' | 'payment_confirmed' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed' | 'cancelled' | 'refunded'
          subtotal?: number
          shipping_cost?: number
          total_amount?: number
          delivery_method?: 'pickup' | 'shipping'
          pickup_store_id?: string | null
          shipping_address?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          paid_at?: string | null
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_category: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          quantity: number
          unit_price: number
          subtotal: number
          specifications: Json | null
          uploaded_files: Json | null
          special_instructions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          product_category: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          quantity?: number
          unit_price: number
          subtotal: number
          specifications?: Json | null
          uploaded_files?: Json | null
          special_instructions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_category?: 'pas_foto' | 'cetak_foto' | 'wall_decor' | 'photobook' | 'studio'
          quantity?: number
          unit_price?: number
          subtotal?: number
          specifications?: Json | null
          uploaded_files?: Json | null
          special_instructions?: string | null
          created_at?: string
        }
      }
      uploaded_files: {
        Row: {
          id: string
          user_id: string | null
          order_item_id: string | null
          file_name: string
          file_url: string
          file_size: number | null
          mime_type: string | null
          width: number | null
          height: number | null
          checksum: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_item_id?: string | null
          file_name: string
          file_url: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          checksum?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          order_item_id?: string | null
          file_name?: string
          file_url?: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          checksum?: string | null
          created_at?: string
        }
      }
    }
  }
}

