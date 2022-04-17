import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppBar, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { HomePage } from 'pages/HomePage';
import { useAppDispatch } from 'store/hooks';
import { fetchLoginUser } from 'store/reducers/profileReducer';

import { LoginPopup } from 'components/LoginPopup';
import { Navbar } from 'components/Navbar';
import { RegisterPopup } from 'components/RegisterPopup';
import { noop } from 'utils/noop';

import styles from './App.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    const [registerPopupOpened, setRegisterPopupOpened] = useState(false);
    const [loginPopupOpened, setLoginPopupOpened] = useState(false);

    const dispatch = useAppDispatch();
    return (
        <div className={cx('App')}>
            <AppBar />
            <Navbar
                onLoginClick={() => setLoginPopupOpened(true)}
                onLogoClick={noop}
                onRegisterClick={() => setRegisterPopupOpened(true)}
            />
            <Routes>
                <Route path="/" caseSensitive element={<HomePage />}></Route>
            </Routes>
            <RegisterPopup opened={registerPopupOpened} onCloseClick={() => setRegisterPopupOpened(false)} />
            <LoginPopup
                onSubmit={(values) => {
                    void dispatch(fetchLoginUser({ password: values.password, username: values.email }));
                    setLoginPopupOpened(false);
                }}
                opened={loginPopupOpened}
                onCloseClick={() => setLoginPopupOpened(false)}
            />
            <Typography />
        </div>
    );
};
