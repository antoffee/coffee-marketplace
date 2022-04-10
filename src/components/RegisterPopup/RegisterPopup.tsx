import React, { useCallback, useState } from 'react';
import { Form } from 'react-final-form';
import { Close } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInputField } from 'components/Fields/CustomInputField';
import { disableWindowScroll } from 'utils/disableWindowScroll';
import { noop } from 'utils/noop';

import { RegisterFormValues, RegisterPopupProps } from './RegisterPopup.types';
import { validateRegister } from './RegisterPopup.utils';

import styles from './RegisterPopup.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const RegisterPopup: React.FC<RegisterPopupProps> = ({ opened, onCloseClick }) => {
    disableWindowScroll(opened);

    const [step, setStep] = useState<0 | 1>(0);

    const handleSubmit = useCallback(() => {
        switch (step) {
            case 0:
                setStep(1);
                break;

            default:
                break;
        }
    }, [step]);

    return (
        <div onClick={onCloseClick} className={cx('register-popup-wrapper', { opened })}>
            <div className={cx('register-popup')} onClick={(e) => e.stopPropagation()}>
                <IconButton className={cx('close')} onClick={onCloseClick}>
                    <Close />
                </IconButton>
                <Form<RegisterFormValues> validate={validateRegister(step === 1)} onSubmit={noop}>
                    {({ valid }) => (
                        <form>
                            <CustomInputField label="email" required name="email" margin="dense" />
                            <CustomInputField type="password" required label="Пароль" name="password" />
                            <CustomInputField type="password" required label="Повторите пароль" name="passwordRepeat" />
                            {step === 1 && <CustomInputField required type="password" label="Код подтверждения" name="code" />}
                            <Button disabled={!valid} variant="contained" onClick={handleSubmit}>
                                {step === 0 ? 'Отправить код подтверждения' : 'Зарегистрироваться'}
                            </Button>
                        </form>
                    )}
                </Form>
            </div>
        </div>
    );
};
