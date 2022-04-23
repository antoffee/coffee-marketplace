/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_user_api_auth_login_post } from '../models/Body_login_user_api_auth_login_post';
import type { ResendCodeReqDTO } from '../models/ResendCodeReqDTO';
import type { ResendCodeRespDTO } from '../models/ResendCodeRespDTO';
import type { SignupReqDTO } from '../models/SignupReqDTO';
import type { SignupRespDTO } from '../models/SignupRespDTO';
import type { TokenRespDTO } from '../models/TokenRespDTO';
import type { UserRespDTO } from '../models/UserRespDTO';
import type { VerifyCodeReqDTO } from '../models/VerifyCodeReqDTO';
import type { VerifyCodeRespSchema } from '../models/VerifyCodeRespSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

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

}