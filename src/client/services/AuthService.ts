/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_user_api_auth_login_post } from '../models/Body_login_user_api_auth_login_post';
import type { ResendCodeRespSchema } from '../models/ResendCodeRespSchema';
import type { ResendCodeSchema } from '../models/ResendCodeSchema';
import type { SignupRespSchema } from '../models/SignupRespSchema';
import type { SignupSchema } from '../models/SignupSchema';
import type { TokenSchema } from '../models/TokenSchema';
import type { UserSchema } from '../models/UserSchema';
import type { VerifyCodeRequestSchema } from '../models/VerifyCodeRequestSchema';
import type { VerifyCodeRespSchema } from '../models/VerifyCodeRespSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Signup User
     * @param requestBody
     * @returns SignupRespSchema Successful Response
     * @throws ApiError
     */
    public static signupUserApiAuthSignupPost(
        requestBody: SignupSchema,
    ): CancelablePromise<SignupRespSchema> {
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
     * @returns TokenSchema Successful Response
     * @throws ApiError
     */
    public static loginUserApiAuthLoginPost(
        formData: Body_login_user_api_auth_login_post,
    ): CancelablePromise<TokenSchema> {
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
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static currentUserApiAuthMeGet(): CancelablePromise<UserSchema> {
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
        requestBody: VerifyCodeRequestSchema,
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
     * @returns ResendCodeRespSchema Successful Response
     * @throws ApiError
     */
    public static resendCodeApiAuthResendCodePost(
        requestBody: ResendCodeSchema,
    ): CancelablePromise<ResendCodeRespSchema> {
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

}