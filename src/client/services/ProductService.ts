/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductListSortByEnum } from '../models/ProductListSortByEnum';
import type { ShopProductDTO } from '../models/ShopProductDTO';
import type { ShopProductsListDTO } from '../models/ShopProductsListDTO';
import type { SortOrderEnum } from '../models/SortOrderEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductService {

    /**
     * Get
     * @param productId
     * @param shopId
     * @returns ShopProductDTO Successful Response
     * @throws ApiError
     */
    public static getApiProductGet(
        productId: number,
        shopId: number,
    ): CancelablePromise<ShopProductDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product',
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
     * @param sortBy
     * @param count
     * @param offset
     * @param order
     * @returns ShopProductsListDTO Successful Response
     * @throws ApiError
     */
    public static getListApiProductListGet(
        shopId: number,
        sortBy?: ProductListSortByEnum,
        count: number = 10,
        offset?: number,
        order?: SortOrderEnum,
    ): CancelablePromise<ShopProductsListDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product.list',
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