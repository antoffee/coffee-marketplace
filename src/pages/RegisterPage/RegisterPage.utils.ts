import { PASSWORDS_NOT_MATCH_ERROR, REQUIRED_FIELD_ERROR } from 'shared/constants';

import { RegisterFormErrors, RegisterFormValues } from './RegisterPage.types';

export const validateRegister = (values: RegisterFormValues, submitted?: boolean): RegisterFormErrors => ({
    email: values.email ? undefined : REQUIRED_FIELD_ERROR,
    password: values.password ? undefined : REQUIRED_FIELD_ERROR,
    passwordRepeat: values.passwordRepeat
        ? values.password === values.passwordRepeat
            ? undefined
            : PASSWORDS_NOT_MATCH_ERROR
        : REQUIRED_FIELD_ERROR,
    confirmationCode: values.confirmationCode ? undefined : submitted ? REQUIRED_FIELD_ERROR : undefined,
});
