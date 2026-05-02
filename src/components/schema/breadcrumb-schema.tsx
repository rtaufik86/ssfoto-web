export function BreadcrumbSchema(items: { name: string; url: string }[]) {
    const baseUrl = "https://ssfoto.co.id";
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            "item": item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
        })),
    };
}
