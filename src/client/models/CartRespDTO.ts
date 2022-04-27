/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartProductDTO } from './CartProductDTO';

export type CartRespDTO = {
    products: Array<CartProductDTO>;
    total_price: number;
};
