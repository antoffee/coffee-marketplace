/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductListRespDTO } from '../models/ProductListRespDTO';
import type { ProductListSortByEnum } from '../models/ProductListSortByEnum';
import type { ProductRespDTO } from '../models/ProductRespDTO';
import type { SortOrderEnum } from '../models/SortOrderEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductsService {

    /**
     * Get By Shop
     * @param productId
     * @param shopId
     * @returns ProductRespDTO Successful Response
     * @throws ApiError
     */
    public static getByShopApiProductsGet(
        productId: number,
        shopId: number,
    ): CancelablePromise<ProductRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
            query: {
                'product_id': productId,
                'shop_id': shopId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get List
     * @param shopId
     * @param count
     * @param offset
     * @param sortBy
     * @param order
     * @returns ProductListRespDTO Successful Response
     * @throws ApiError
     */
    public static getListApiProductsListGet(
        shopId: number,
        count: number,
        offset: number,
        sortBy?: ProductListSortByEnum,
        order?: SortOrderEnum,
    ): CancelablePromise<ProductListRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products.list',
            query: {
                'shop_id': shopId,
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