/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderListSortByEnum } from '../models/OrderListSortByEnum';
import type { OrderReceiveKindEnum } from '../models/OrderReceiveKindEnum';
import type { OrderRespDTO } from '../models/OrderRespDTO';
import type { OrdersListRespDTO } from '../models/OrdersListRespDTO';
import type { SortOrderEnum } from '../models/SortOrderEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderService {

    /**
     * Get
     * @param id
     * @returns OrderRespDTO Successful Response
     * @throws ApiError
     */
    public static getApiOrderGet(
        id: number,
    ): CancelablePromise<OrderRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order',
            query: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Place Order
     * @param shopId
     * @param receiveKind
     * @returns any Successful Response
     * @throws ApiError
     */
    public static placeOrderApiOrderPut(
        shopId: number,
        receiveKind?: OrderReceiveKindEnum,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/order',
            query: {
                'shop_id': shopId,
                'receive_kind': receiveKind,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get List
     * @param count
     * @param offset
     * @param sortBy
     * @param order
     * @returns OrdersListRespDTO Successful Response
     * @throws ApiError
     */
    public static getListApiOrderListGet(
        count: number,
        offset: number,
        sortBy?: OrderListSortByEnum,
        order?: SortOrderEnum,
    ): CancelablePromise<OrdersListRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order.list',
            query: {
                'sort_by': sortBy,
                'count': count,
                'offset': offset,
                'order': order,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}