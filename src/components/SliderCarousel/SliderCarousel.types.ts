export type CarouselItem = {
    title: string;
    description: string;
    imgUrl?: string;
    id: string | number;
};

export type SliderCarouselProps = {
    items: CarouselItem[];
    onItemClick: (item: CarouselItem) => void;
};
