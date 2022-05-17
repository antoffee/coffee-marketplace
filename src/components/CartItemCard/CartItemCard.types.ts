import { CartProductDTO } from 'client';
// import { Product } from 'types/product';

export type CartItemCardProps = {
    item: CartProductDTO;
    viewOnly?: boolean;
    onItemClick?: (item: CartProductDTO) => void;
    onQtyChange?: (item: CartProductDTO, qty: number) => void;
};
