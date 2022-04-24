/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShopListRespDTO } from '../models/ShopListRespDTO';
import type { ShopListSortByEnum } from '../models/ShopListSortByEnum';
import type { ShopRespDTO } from '../models/ShopRespDTO';
import type { SortOrderEnum } from '../models/SortOrderEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ShopService {

    /**
     * Get Shop
     * @param id
     * @returns ShopRespDTO Successful Response
     * @throws ApiError
     */
    public static getShopApiShopGet(
        id: number,
    ): CancelablePromise<ShopRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shop',
            query: {
                'id': id,
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
     * @returns ShopListRespDTO Successful Response
     * @throws ApiError
     */
    public static getListApiShopListGet(
        count: number,
        offset: number,
        sortBy?: ShopListSortByEnum,
        order?: SortOrderEnum,
    ): CancelablePromise<ShopListRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shop.list',
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