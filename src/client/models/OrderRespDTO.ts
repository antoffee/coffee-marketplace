/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderReceiveKindEnum } from './OrderReceiveKindEnum';
import type { OrderStatusEnum } from './OrderStatusEnum';
import type { ShopProductDTO } from './ShopProductDTO';

export type OrderRespDTO = {
    id: number;
    status: OrderStatusEnum;
    created_at: string;
    receive_kind: OrderReceiveKindEnum;
    delivery_address?: string;
    total_price: number;
    products: Array<ShopProductDTO>;
};
