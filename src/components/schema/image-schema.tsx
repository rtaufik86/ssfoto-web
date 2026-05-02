export function ImageSchema({ url, description }: { url: string; description: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": url,
        "description": description
    };
}
