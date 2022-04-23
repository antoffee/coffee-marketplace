/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductRespDTO } from './ProductRespDTO';

export type ProductListRespDTO = {
    products: Array<ProductRespDTO>;
    total: number;
};
