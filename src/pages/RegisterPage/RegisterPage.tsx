import React from 'react';
import { Form } from 'react-final-form';
import { Button } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInputField } from 'components/Fields/CustomInputField';

import { RegisterFormValues } from './RegisterPage.types';
import { validateRegister } from './RegisterPage.utils';

import styles from './RegisterPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const RegisterPage: React.FC = () => {
    return (
        <div className={cx('register-page')}>
            <Form<RegisterFormValues>
                validate={validateRegister}
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
                {({ valid }) => (
                    <form>
                        <CustomInputField label="email" required name="email" margin="dense" />
                        <CustomInputField type="password" label="Password" name="password" />
                        <CustomInputField type="password" label="Repeat password" name="passwordRepeat" />
                        <Button disabled={!valid} variant="contained">
                            Register
                        </Button>
                    </form>
                )}
            </Form>
        </div>
    );
};
