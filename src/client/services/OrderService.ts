/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderListSortByEnum } from '../models/OrderListSortByEnum';
import type { OrderRespDTO } from '../models/OrderRespDTO';
import type { OrdersListRespDTO } from '../models/OrdersListRespDTO';
import type { PlaceOrderReqDTO } from '../models/PlaceOrderReqDTO';
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
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static placeOrderApiOrderPut(
        requestBody: PlaceOrderReqDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get List
     * @param sortBy
     * @param count
     * @param offset
     * @param order
     * @returns OrdersListRespDTO Successful Response
     * @throws ApiError
     */
    public static getListApiOrderListGet(
        sortBy?: OrderListSortByEnum,
        count: number = 10,
        offset?: number,
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