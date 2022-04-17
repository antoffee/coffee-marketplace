import { useEffect } from 'react';

/**
 * Sets state false on click something outside component
 * @param {React.RefObject<HTMLDivElement>} ref - ref for the controlling element
 * @param {() => void} handler - SetStateAction from useState for
 * controlling component open/close state
 */

export const useOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, handler]);
};
