import { useEffect } from 'react';

type MetaArgs = {
    title?: string;
    description?: string;
    canonical?: string;
};

export function useMeta( { title, description, canonical }: MetaArgs ) {
    useEffect( () => {
        if (title) document.title = title;
        if (description) {
            let descTag = document.querySelector('meta[name="description"]');
            if (!descTag) {
                descTag = document.createElement('meta');
                descTag.setAttribute('name', 'description');
                document.head.appendChild(descTag);
            }
            descTag.setAttribute('content', description);
        }
        if (canonical) {
            let linkTag = document.querySelector('link[rel="canonical"]');
            if (!linkTag) {
                linkTag = document.createElement('link');
                linkTag.setAttribute('rel', 'canonical');
                document.head.appendChild(linkTag);
            }
            linkTag.setAttribute('href', canonical);
        }
    })
}