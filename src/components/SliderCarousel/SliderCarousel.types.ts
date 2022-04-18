import { Product } from 'types/product';

export type SliderCarouselProps = {
    items: Product[];
    onItemClick: (item: Product) => void;
};
