import { PASSWORDS_NOT_MATCH_ERROR, REQUIRED_FIELD_ERROR } from 'shared/constants';

import { RegisterFormErrors, RegisterFormValues } from './RegisterPopup.types';

export const validateRegister =
    (submitted?: boolean) =>
    (values: RegisterFormValues): RegisterFormErrors => ({
        email: values.email ? undefined : REQUIRED_FIELD_ERROR,
        password: values.password ? undefined : REQUIRED_FIELD_ERROR,
        passwordRepeat: values.passwordRepeat
            ? values.password === values.passwordRepeat
                ? undefined
                : PASSWORDS_NOT_MATCH_ERROR
            : REQUIRED_FIELD_ERROR,
        code: values.code ? undefined : submitted ? REQUIRED_FIELD_ERROR : undefined,
    });
