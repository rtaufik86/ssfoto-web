export function LocalBusinessSchema({ name, city, region, areaServed }: { name: string; city: string; region: string; areaServed: string[] }) {
    return {
        "@context": "https://schema.org",
        "@type": "PhotoStudio",
        "name": name,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": region,
            "addressCountry": "Indonesia"
        },
        "areaServed": areaServed,
        "parentOrganization": {
            "@type": "Organization",
            "name": "SS Foto"
        }
    };
}
