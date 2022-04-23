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
     * Get By Name
     * @param name
     * @returns ProductRespDTO Successful Response
     * @throws ApiError
     */
    public static getByNameApiProductsGet(
        name: string,
    ): CancelablePromise<ProductRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
            query: {
                'name': name,
            },
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
     * @returns ProductListRespDTO Successful Response
     * @throws ApiError
     */
    public static getListApiProductsListGet(
        sortBy: ProductListSortByEnum,
        count: number,
        offset: number,
        order: SortOrderEnum,
    ): CancelablePromise<ProductListRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products.list',
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