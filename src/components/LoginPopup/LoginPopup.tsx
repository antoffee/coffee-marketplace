import React from 'react';
import { Form } from 'react-final-form';
import { Close } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInputField } from 'components/Fields/CustomInputField';
import { disableWindowScroll } from 'utils/disableWindowScroll';

import { LoginFormValues, LoginPopupProps } from './LoginPopup.types';
import { validateLogin } from './LoginPopup.utils';

import styles from './LoginPopup.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginPopup: React.FC<LoginPopupProps> = ({ opened, onCloseClick, onSubmit }) => {
    disableWindowScroll(opened);

    return (
        <div onClick={onCloseClick} className={cx('login-popup-wrapper', { opened })}>
            <div className={cx('login-popup')} onClick={(e) => e.stopPropagation()}>
                <IconButton className={cx('close')} onClick={onCloseClick}>
                    <Close />
                </IconButton>
                <Form<LoginFormValues> validate={validateLogin} onSubmit={onSubmit}>
                    {({ valid, handleSubmit }) => (
                        <form>
                            <CustomInputField label="email" required name="email" margin="dense" />
                            <CustomInputField type="password" required label="Пароль" name="password" />
                            <Button disabled={!valid} variant="contained" onClick={handleSubmit}>
                                Войти
                            </Button>
                        </form>
                    )}
                </Form>
            </div>
        </div>
    );
};
