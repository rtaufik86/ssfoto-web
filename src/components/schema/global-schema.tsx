export function GlobalSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SS Foto",
        "url": "https://ssfoto.co.id",
        "logo": "https://ssfoto.co.id/logo.png",
        "sameAs": [
            "https://www.instagram.com/ssfoto_official",
            "https://www.facebook.com/ssfotodigitallab"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
