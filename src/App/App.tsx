import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { HomePage } from 'pages/HomePage';
import { ProductDetailsPage } from 'pages/ProductDetailsPage';
import { ShopPage } from 'pages/ShopPage';
import { useAppDispatch } from 'store/hooks';
import { fetchLoginUser } from 'store/reducers/profileReducer';

import { LoginPopup } from 'components/LoginPopup';
import { Navbar } from 'components/Navbar';
import { RegisterPopup } from 'components/RegisterPopup';

import styles from './App.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    const [registerPopupOpened, setRegisterPopupOpened] = useState(false);
    const [loginPopupOpened, setLoginPopupOpened] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <div className={cx('App')}>
            <AppBar />
            <Navbar
                onLoginClick={() => setLoginPopupOpened(true)}
                onLogoClick={() => navigate('/')}
                onRegisterClick={() => setRegisterPopupOpened(true)}
            />
            <Routes>
                <Route path="/" caseSensitive element={<HomePage />}></Route>
                <Route path="/product-details/:id" element={<ProductDetailsPage />}></Route>
                <Route path="/shop/:id" element={<ShopPage />}></Route>
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
