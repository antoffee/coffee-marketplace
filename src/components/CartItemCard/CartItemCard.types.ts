import { Product } from 'types/product';

export type CartItemCardProps = {
    item: Product;
    onItemClick?: (item: Product) => void;
    onQtyChange?: (item: Product, qty: number) => void;
};
