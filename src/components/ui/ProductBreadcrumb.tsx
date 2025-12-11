'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface ProductBreadcrumbProps {
  productName: string;
  productSlug: string;
}

/**
 * ProductBreadcrumb - A reusable breadcrumb component for product pages
 * 
 * Features:
 * - SEO-friendly with proper structured data
 * - Accessible with ARIA labels
 * - Responsive design
 * - Uses semantic HTML (nav, ol, li)
 * 
 * @param productName - Display name of the current product
 * @param productSlug - URL slug of the product (used for active state styling)
 */
export default function ProductBreadcrumb({ productName, productSlug }: ProductBreadcrumbProps) {
  // Breadcrumb items configuration
  const breadcrumbItems = [
    { label: 'Beranda', href: '/', isHome: true },
    { label: 'Layanan', href: '/layanan', isHome: false },
    { label: productName, href: `/layanan/${productSlug}`, isHome: false, isCurrent: true },
  ];

  // Generate JSON-LD structured data for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://ssfoto.co.id${item.href}`,
    })),
  };

  return (
    <>
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="w-full bg-gray-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol 
            className="flex items-center gap-1 py-3 text-sm overflow-x-auto scrollbar-hide"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbItems.map((item, index) => (
              <li 
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator (not for first item) */}
                {index > 0 && (
                  <ChevronRight 
                    className="w-4 h-4 text-[#ea2423] mx-1 flex-shrink-0" 
                    aria-hidden="true"
                  />
                )}

                {/* Link or Current Page */}
                {item.isCurrent ? (
                  // Current page - not a link, styled differently
                  <span
                    className="font-semibold text-[#ea2423] truncate max-w-[200px] sm:max-w-none"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  // Navigable link
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-600 hover:text-[#ea2423] transition-colors duration-200 whitespace-nowrap group"
                    itemProp="item"
                  >
                    {/* Home icon for first item */}
                    {item.isHome && (
                      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}

                {/* Hidden position meta for schema */}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}


