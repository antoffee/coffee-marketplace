import { APIRoutes } from './apiRoutes';

export type SignUpRequest = { email: string; password: string };
export type VerifyRequest = { email: string; code?: string };

export interface UserApi {
    signup({ email, password }: SignUpRequest): Promise<unknown>;
    verifyCode({ email, code }: VerifyRequest): Promise<unknown>;
    resendCode: (email: string) => Promise<unknown>;
    login: (request: FormData) => Promise<unknown>;
}

export const USER_ROUTES: APIRoutes<UserApi> = {
    signup: () => '/auth.signup',
    verifyCode: () => '/auth.verify_code',
    resendCode: () => '/auth.resend_code',
    login: () => '/auth.login',
};
