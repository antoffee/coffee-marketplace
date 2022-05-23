/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressAddDTO } from '../models/AddressAddDTO';
import type { ProfileUpdateReqDTO } from '../models/ProfileUpdateReqDTO';
import type { UserAddressDTO } from '../models/UserAddressDTO';
import type { UserAddressListDTO } from '../models/UserAddressListDTO';
import type { UserRespDTO } from '../models/UserRespDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

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
     * Put
     * @param requestBody
     * @returns UserAddressDTO Successful Response
     * @throws ApiError
     */
    public static putApiProfileAddressPut(
        requestBody: AddressAddDTO,
    ): CancelablePromise<UserAddressDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/profile/address',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get List
     * @returns UserAddressListDTO Successful Response
     * @throws ApiError
     */
    public static getListApiProfileAddressListGet(): CancelablePromise<UserAddressListDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/address.list',
        });
    }

}