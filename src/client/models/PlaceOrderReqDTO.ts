/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderReceiveKindEnum } from './OrderReceiveKindEnum';

export type PlaceOrderReqDTO = {
    shop_id: number;
    receive_kind?: OrderReceiveKindEnum;
    delivery_address_id?: number;
};
