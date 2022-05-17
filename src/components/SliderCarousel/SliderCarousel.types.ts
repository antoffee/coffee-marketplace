import { ShopProductDTO } from 'client';

export type SliderCarouselProps = {
    items: ShopProductDTO[];
    onItemClick: (item: ShopProductDTO) => void;
};
