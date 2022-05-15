import { useEffect, useRef, useState } from 'react';

/**
 * Check if an element is in viewport
 * if element was visible any time flag wouldn't change
 * @param {number} rootMargin - Number of pixels up to the observable element from the top
 */

export const useEmergenceTracking = <T extends HTMLElement = HTMLDivElement>(rootMargin = '0px') => {
    const [isVisible, setIsVisible] = useState<boolean>();
    const visibilityRef = useRef<T>(null);

    useEffect(() => {
        const current = visibilityRef.current as Element;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin },
        );

        if (visibilityRef.current) {
            observer.observe(current);
            return () => observer.unobserve(current);
        }
    }, [isVisible, rootMargin]);
    return { isVisible, visibilityRef };
};
