/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderReceiveKindEnum } from './OrderReceiveKindEnum';
import type { OrderStatusEnum } from './OrderStatusEnum';
import type { ShopProductDTO } from './ShopProductDTO';

export type OrderRespDTO = {
    id: number;
    products: Array<ShopProductDTO>;
    status: OrderStatusEnum;
    created_at: string;
    receive_kind: OrderReceiveKindEnum;
    total_price: number;
};
