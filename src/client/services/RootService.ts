/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_user_api_auth_login_post } from '../models/Body_login_user_api_auth_login_post';
import type { CartRespDTO } from '../models/CartRespDTO';
import type { OrderListSortByEnum } from '../models/OrderListSortByEnum';
import type { OrderReceiveKindEnum } from '../models/OrderReceiveKindEnum';
import type { OrderRespDTO } from '../models/OrderRespDTO';
import type { OrdersListRespDTO } from '../models/OrdersListRespDTO';
import type { ProductListSortByEnum } from '../models/ProductListSortByEnum';
import type { ProfileUpdateReqDTO } from '../models/ProfileUpdateReqDTO';
import type { ResendCodeReqDTO } from '../models/ResendCodeReqDTO';
import type { ResendCodeRespDTO } from '../models/ResendCodeRespDTO';
import type { ShopListRespDTO } from '../models/ShopListRespDTO';
import type { ShopListSortByEnum } from '../models/ShopListSortByEnum';
import type { ShopProductDTO } from '../models/ShopProductDTO';
import type { ShopProductsListDTO } from '../models/ShopProductsListDTO';
import type { ShopRespDTO } from '../models/ShopRespDTO';
import type { SignupReqDTO } from '../models/SignupReqDTO';
import type { SignupRespDTO } from '../models/SignupRespDTO';
import type { SortOrderEnum } from '../models/SortOrderEnum';
import type { TokenRespDTO } from '../models/TokenRespDTO';
import type { UserRespDTO } from '../models/UserRespDTO';
import type { VerifyCodeReqDTO } from '../models/VerifyCodeReqDTO';
import type { VerifyCodeRespSchema } from '../models/VerifyCodeRespSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RootService {

    /**
     * Signup User
     * @param requestBody
     * @returns SignupRespDTO Successful Response
     * @throws ApiError
     */
    public static signupUserApiAuthSignupPost(
        requestBody: SignupReqDTO,
    ): CancelablePromise<SignupRespDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login User
     * @param formData
     * @returns TokenRespDTO Successful Response
     * @throws ApiError
     */
    public static loginUserApiAuthLoginPost(
        formData: Body_login_user_api_auth_login_post,
    ): CancelablePromise<TokenRespDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Current User
     * @returns UserRespDTO Successful Response
     * @throws ApiError
     */
    public static currentUserApiAuthMeGet(): CancelablePromise<UserRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }

    /**
     * Verify Code
     * @param requestBody
     * @returns VerifyCodeRespSchema Successful Response
     * @throws ApiError
     */
    public static verifyCodeApiAuthVerifyCodePost(
        requestBody: VerifyCodeReqDTO,
    ): CancelablePromise<VerifyCodeRespSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify_code',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Resend Code
     * @param requestBody
     * @returns ResendCodeRespDTO Successful Response
     * @throws ApiError
     */
    public static resendCodeApiAuthResendCodePost(
        requestBody: ResendCodeReqDTO,
    ): CancelablePromise<ResendCodeRespDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/resend_code',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Patch
     * @param requestBody
     * @returns UserRespDTO Successful Response
     * @throws ApiError
     */
    public static patchApiProfilePatch(
        requestBody: ProfileUpdateReqDTO,
    ): CancelablePromise<UserRespDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/profile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get By Shop
     * @param productId
     * @param shopId
     * @returns ShopProductDTO Successful Response
     * @throws ApiError
     */
    public static getByShopApiProductsGet(
        productId: number,
        shopId: number,
    ): CancelablePromise<ShopProductDTO> {
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
     * @returns ShopProductsListDTO Successful Response
     * @throws ApiError
     */
    public static getListApiProductsListGet(
        shopId: number,
        count: number,
        offset: number,
        sortBy?: ProductListSortByEnum,
        order?: SortOrderEnum,
    ): CancelablePromise<ShopProductsListDTO> {
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

    /**
     * Get
     * @param id
     * @returns OrderRespDTO Successful Response
     * @throws ApiError
     */
    public static getApiOrdersGet(
        id: number,
    ): CancelablePromise<OrderRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders',
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
    public static placeOrderApiOrdersPut(
        shopId: number,
        receiveKind?: OrderReceiveKindEnum,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/orders',
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
    public static getListApiOrdersListGet(
        count: number,
        offset: number,
        sortBy?: OrderListSortByEnum,
        order?: SortOrderEnum,
    ): CancelablePromise<OrdersListRespDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders.list',
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