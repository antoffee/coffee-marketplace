/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderRespDTO } from './OrderRespDTO';

export type OrdersListRespDTO = {
    orders: Array<OrderRespDTO>;
    total: number;
};
