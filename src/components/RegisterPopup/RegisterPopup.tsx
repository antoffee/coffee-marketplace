import React from 'react';
import { Form } from 'react-final-form';
import { Close } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInputField } from 'components/Fields/CustomInputField';
import { disableWindowScroll } from 'utils/disableWindowScroll';

import { RegisterFormValues, RegisterPopupProps } from './RegisterPopup.types';
import { validateRegister } from './RegisterPopup.utils';

import styles from './RegisterPopup.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const RegisterPopup: React.FC<RegisterPopupProps> = ({ opened, onSubmit, onCloseClick }) => {
    disableWindowScroll(opened);

    return (
        <div onClick={onCloseClick} className={cx('register-popup-wrapper', { opened })}>
            <div className={cx('register-popup')} onClick={(e) => e.stopPropagation()}>
                <IconButton className={cx('close')} onClick={onCloseClick}>
                    <Close />
                </IconButton>
                <Form<RegisterFormValues> validate={validateRegister} onSubmit={onSubmit}>
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
        </div>
    );
};
