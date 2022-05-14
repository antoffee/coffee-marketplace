import React, { useCallback, useState } from 'react';
import { Form } from 'react-final-form';
import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { SignupRespDTO } from 'client';
import { useTimer } from 'hooks/useTimer';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchResendCode, fetchSignup, fetchVerifyCode } from 'store/reducers/profileReducer';

import { CustomInputField } from 'components/Fields/CustomInputField';
import { disableWindowScroll } from 'utils/disableWindowScroll';
import { noop } from 'utils/noop';

import { RegisterFormValues, RegisterPopupProps } from './RegisterPopup.types';
import { validateRegister } from './RegisterPopup.utils';

import styles from './RegisterPopup.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const Timer = ({ secondsLeft }: { secondsLeft: number }) => {
    const { timer } = useTimer(secondsLeft ?? 0);

    return timer ? <>через {timer} секунд</> : null;
};

export const RegisterPopup: React.FC<RegisterPopupProps> = ({ opened, onCloseClick }) => {
    disableWindowScroll(opened);
    const dispatch = useAppDispatch();

    const { signUpError, verifyCodeError, secondsLeft } = useAppSelector((state) => state.profile);

    const [step, setStep] = useState<0 | 1>(0);
    const [resendDisabled, setResendDisabled] = useState(true);

    const handleSubmit = useCallback(
        (values: RegisterFormValues) => () => {
            switch (step) {
                case 0:
                    void dispatch(fetchSignup({ email: values.email, password: values.password })).then(
                        ({ meta, payload }) => {
                            if (meta.requestStatus === 'fulfilled') {
                                setStep(1);
                                setTimeout(
                                    () => setResendDisabled(false),
                                    (payload as SignupRespDTO)?.seconds_left * 1000,
                                );
                            }
                        },
                    );

                    break;

                default:
                    void dispatch(fetchVerifyCode({ code: values.code ?? '', email: values.email }));
            }
        },
        [dispatch, step],
    );

    return (
        <div onClick={onCloseClick} className={cx('register-popup-wrapper', { opened })}>
            <div className={cx('register-popup')} onClick={(e) => e.stopPropagation()}>
                <IconButton className={cx('close')} onClick={onCloseClick}>
                    <Close />
                </IconButton>
                <Form<RegisterFormValues> validate={validateRegister(step === 1)} onSubmit={noop}>
                    {({ valid, values }) => (
                        <form>
                            <CustomInputField label="email" required name="email" margin="dense" />
                            <CustomInputField type="password" required label="Пароль" name="password" />
                            <CustomInputField type="password" required label="Повторите пароль" name="passwordRepeat" />
                            {step === 1 && (
                                <CustomInputField required type="password" label="Код подтверждения" name="code" />
                            )}
                            {step === 1 && (
                                <>
                                    <Button
                                        disabled={resendDisabled}
                                        onClick={() => {
                                            void dispatch(fetchResendCode({ email: values.email }));
                                            setResendDisabled(true);
                                            setTimeout(() => setResendDisabled(false), 10000);
                                        }}
                                    >
                                        Отправить код повторно {secondsLeft && <Timer secondsLeft={secondsLeft} />}
                                    </Button>
                                </>
                            )}
                            <Button disabled={!valid} variant="contained" onClick={handleSubmit(values)}>
                                {step === 0 ? 'Отправить код подтверждения' : 'Зарегистрироваться'}
                            </Button>
                            {(signUpError || verifyCodeError) && (
                                <Alert severity="error">{signUpError || verifyCodeError}</Alert>
                            )}
                            {step === 1 && !(signUpError || verifyCodeError) && (
                                <Alert severity="info">Код был отправлен на указанный выше адрес почты</Alert>
                            )}
                        </form>
                    )}
                </Form>
            </div>
        </div>
    );
};
