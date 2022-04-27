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
     * @returns CartRespDTO Successful Response
     * @throws ApiError
     */
    public static getApiCartGet(): CancelablePromise<CartRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart',
        });
    }

    /**
     * Update
     * @param productId
     * @param qty
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateApiCartPatch(
        productId: number,
        qty: number,
    ): CancelablePromise<any> {
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