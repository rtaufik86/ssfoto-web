import { supabase } from '@/lib/supabaseClient';
import { Metadata } from 'next';

/**
 * SEO Metadata Type dari Database
 */
export interface SEOMetadata {
    id: string;
    page_path: string;
    page_name: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    og_type: string;
    twitter_card: string;
    twitter_title: string | null;
    twitter_description: string | null;
    twitter_image: string | null;
    canonical_url: string | null;
    schema_json: any;
    h1_text: string | null;
    h2_texts: string[] | null;
    focus_keyword: string | null;
    is_active: boolean;
    is_indexed: boolean;
    priority: number;
    change_frequency: string;
    created_at: string;
    updated_at: string;
    version: number;
    updated_by: string | null;
}

/**
 * Fetch SEO metadata dari database berdasarkan page path
 * @param pagePath - Path halaman (e.g., '/', '/layanan', '/layanan/pas-foto')
 * @returns SEO metadata atau null jika tidak ditemukan
 */
export async function getSEOMetadata(pagePath: string): Promise<SEOMetadata | null> {
    try {
        const { data, error } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('page_path', pagePath)
            .eq('is_active', true)
            .single();

        if (error) {
            console.error(`Error fetching SEO metadata for ${pagePath}:`, error);
            return null;
        }

        return data as SEOMetadata;
    } catch (error) {
        console.error(`Exception fetching SEO metadata for ${pagePath}:`, error);
        return null;
    }
}

/**
 * Convert database SEO metadata ke Next.js Metadata format
 * @param seoData - SEO metadata dari database
 * @returns Next.js Metadata object
 */
export function convertToNextMetadata(seoData: SEOMetadata): Metadata {
    return {
        title: seoData.meta_title,
        description: seoData.meta_description,
        keywords: seoData.meta_keywords,

        alternates: {
            canonical: seoData.canonical_url || undefined,
        },

        openGraph: {
            title: seoData.og_title || seoData.meta_title,
            description: seoData.og_description || seoData.meta_description,
            url: seoData.canonical_url || undefined,
            siteName: 'SS Foto Digital Lab',
            locale: 'id_ID',
            type: (seoData.og_type as any) || 'website',
            images: seoData.og_image ? [
                {
                    url: seoData.og_image,
                    width: 1200,
                    height: 630,
                    alt: seoData.meta_title,
                }
            ] : undefined,
        },

        twitter: {
            card: (seoData.twitter_card as any) || 'summary_large_image',
            title: seoData.twitter_title || seoData.meta_title,
            description: seoData.twitter_description || seoData.meta_description,
            images: seoData.twitter_image ? [seoData.twitter_image] : undefined,
        },

        robots: {
            index: seoData.is_indexed,
            follow: seoData.is_indexed,
            googleBot: {
                index: seoData.is_indexed,
                follow: seoData.is_indexed,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

/**
 * Generate metadata untuk page dengan fallback ke hardcoded values
 * @param pagePath - Path halaman
 * @param fallbackMetadata - Metadata fallback jika database tidak tersedia
 * @returns Next.js Metadata object
 */
export async function generateSEOMetadata(
    pagePath: string,
    fallbackMetadata: Metadata
): Promise<Metadata> {
    const seoData = await getSEOMetadata(pagePath);

    if (seoData) {
        return convertToNextMetadata(seoData);
    }

    // Fallback ke hardcoded metadata jika database tidak tersedia
    console.warn(`Using fallback metadata for ${pagePath}`);
    return fallbackMetadata;
}

/**
 * Get all active pages untuk sitemap generation
 * @returns Array of SEO metadata untuk sitemap
 */
export async function getAllActivePagesForSitemap(): Promise<SEOMetadata[]> {
    try {
        const { data, error } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('is_active', true)
            .eq('is_indexed', true)
            .order('priority', { ascending: false });

        if (error) {
            console.error('Error fetching sitemap data:', error);
            return [];
        }

        return data as SEOMetadata[];
    } catch (error) {
        console.error('Exception fetching sitemap data:', error);
        return [];
    }
}

/**
 * Get schema markup untuk page
 * @param pagePath - Path halaman
 * @returns Schema JSON object atau null
 */
export async function getSchemaMarkup(pagePath: string): Promise<any | null> {
    const seoData = await getSEOMetadata(pagePath);
    return seoData?.schema_json || null;
}
