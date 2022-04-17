/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileUpdateSchema } from '../models/ProfileUpdateSchema';
import type { UserSchema } from '../models/UserSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

    /**
     * Patch
     * @param requestBody
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static patchApiProfilePatch(
        requestBody: ProfileUpdateSchema,
    ): CancelablePromise<UserSchema> {
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