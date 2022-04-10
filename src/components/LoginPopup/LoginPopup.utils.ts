import { REQUIRED_FIELD_ERROR } from 'shared/constants';

import { LoginFormErrors, LoginFormValues } from './LoginPopup.types';

export const validateLogin = (values: LoginFormValues): LoginFormErrors => ({
    email: values.email ? undefined : REQUIRED_FIELD_ERROR,
    password: values.password ? undefined : REQUIRED_FIELD_ERROR,
});
