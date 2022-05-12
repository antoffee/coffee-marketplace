/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartRespDTO } from '../models/CartRespDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CartService {

    /**
     * Get
     * @param shopId
     * @returns CartRespDTO Successful Response
     * @throws ApiError
     */
    public static getApiCartGet(
        shopId: number,
    ): CancelablePromise<CartRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart',
            query: {
                'shop_id': shopId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete
     * @returns CartRespDTO Successful Response
     * @throws ApiError
     */
    public static deleteApiCartDelete(): CancelablePromise<CartRespDTO> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cart',
        });
    }

    /**
     * Patch
     * @param productId
     * @param qty
     * @returns CartRespDTO Successful Response
     * @throws ApiError
     */
    public static patchApiCartPatch(
        productId: number,
        qty: number,
    ): CancelablePromise<CartRespDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/cart',
            query: {
                'product_id': productId,
                'qty': qty,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}