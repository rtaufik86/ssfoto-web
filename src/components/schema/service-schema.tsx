export function ServiceSchema({ name, description, url, areaServed = ["Jakarta Timur", "Bekasi"] }: { name: string; description: string; url: string; areaServed?: string[] }) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "url": url,
        "provider": {
            "@type": "PhotoStudio",
            "name": "SS Foto"
        },
        "areaServed": areaServed,
        "serviceType": "Passport Photo"
    };
}
