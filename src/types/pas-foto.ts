// ============================================================================
// PAS FOTO TYPES
// ============================================================================

export type PasFotoBackground = 'red' | 'blue' | 'white';
export type PasFotoSize = '2x3' | '3x4' | '4x6' | 'mix';
export type PasFotoQuantity = '4_pcs' | '8_pcs' | '12_pcs';
export type PasFotoStatus = 
  | 'pending' 
  | 'paid' 
  | 'processing' 
  | 'ready' 
  | 'completed' 
  | 'cancelled';

export interface PasFotoOrder {
  id: string;
  order_number: string;
  
  // Customer Info
  customer_name: string;
  customer_whatsapp: string;
  customer_email?: string;
  
  // Photo
  photo_url: string;
  photo_filename?: string;
  
  // Specifications
  background_color: PasFotoBackground;
  print_size: PasFotoSize;
  quantity_package: PasFotoQuantity;
  
  // Pickup
  branch_location: string;
  
  // Pricing
  total_price: number;
  
  // Status
  status: PasFotoStatus;
  
  // Notes
  special_instructions?: string;
  admin_notes?: string;
  
  // Payment
  payment_method?: string;
  payment_proof_url?: string;
  paid_at?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  ready_at?: string;
  completed_at?: string;
}

export interface PasFotoOrderInput {
  customer_name: string;
  customer_whatsapp: string;
  customer_email?: string;
  photo_url: string;
  photo_filename?: string;
  background_color: PasFotoBackground;
  print_size: PasFotoSize;
  quantity_package: PasFotoQuantity;
  branch_location: string;
  special_instructions?: string;
}

// Pricing configuration
export const PAS_FOTO_PRICES = {
  '2x3': {
    '4_pcs': 30000,
    '8_pcs': 54000,  // 10% discount
    '12_pcs': 75000, // 15% discount
  },
  '3x4': {
    '4_pcs': 35000,
    '8_pcs': 63000,  // 10% discount
    '12_pcs': 87500, // 15% discount
  },
  '4x6': {
    '4_pcs': 40000,
    '8_pcs': 72000,  // 10% discount
    '12_pcs': 100000, // 15% discount
  },
  'mix': {
    '4_pcs': 45000,
    '8_pcs': 81000,  // 10% discount
    '12_pcs': 112500, // 15% discount
  },
} as const;

// Helper function to calculate price
export function calculatePasFotoPrice(
  size: PasFotoSize,
  quantity: PasFotoQuantity
): number {
  return PAS_FOTO_PRICES[size][quantity];
}

// Display labels
export const PAS_FOTO_LABELS = {
  background: {
    red: 'Merah',
    blue: 'Biru',
    white: 'Putih',
  },
  size: {
    '2x3': '2x3 cm',
    '3x4': '3x4 cm',
    '4x6': '4x6 cm',
    'mix': 'Campur (2x3, 3x4)',
  },
  quantity: {
    '4_pcs': '4 Lembar',
    '8_pcs': '8 Lembar',
    '12_pcs': '12 Lembar',
  },
  status: {
    pending: 'Menunggu Pembayaran',
    paid: 'Sudah Dibayar',
    processing: 'Sedang Diproses',
    ready: 'Siap Diambil',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  },
} as const;

