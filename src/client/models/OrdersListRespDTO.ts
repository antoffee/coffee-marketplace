/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderBaseDTO } from './OrderBaseDTO';

export type OrdersListRespDTO = {
    orders: Array<OrderBaseDTO>;
    total: number;
};
