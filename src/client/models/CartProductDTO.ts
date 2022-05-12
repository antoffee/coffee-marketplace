/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ShopProductDTO } from './ShopProductDTO';

export type CartProductDTO = {
    product: ShopProductDTO;
    qty: number;
    price: number;
};
