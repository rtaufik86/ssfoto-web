export function WebPageSchema({
    name,
    url
}: {
    name: string;
    url: string;
}) {
    const baseUrl = "https://ssfoto.co.id";
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": name,
        "url": fullUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": "SS Foto",
            "url": baseUrl
        }
    };
}
