/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileUpdateReqDTO } from '../models/ProfileUpdateReqDTO';
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
            url: '/api/profile/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}