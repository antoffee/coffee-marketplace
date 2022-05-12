import { CartProductDTO } from 'client';
import { Product } from 'types/product';

export type CartItemCardProps = {
    item: CartProductDTO;
    viewOnly?: boolean;
    onItemClick?: (item: Product) => void;
    onQtyChange?: (item: Product, qty: number) => void;
};
