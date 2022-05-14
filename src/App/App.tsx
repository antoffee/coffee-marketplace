import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import { updateAxiosClientCredential } from 'api/axios';
import cnBind, { Argument } from 'classnames/bind';
import { CartPage } from 'pages/CartPage';
import { HomePage } from 'pages/HomePage';
import { OrderDetails } from 'pages/OrderDetails';
import { OrdersListPage } from 'pages/OrdersListPage';
import { ProductDetailsPage } from 'pages/ProductDetailsPage';
import { ShopPage } from 'pages/ShopPage';
import { useAppDispatch } from 'store/hooks';
import { fetchCheckAuthConnection, fetchLoginUser } from 'store/reducers/profileReducer';

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

    useEffect(() => {
        if (localStorage.getItem('authToken') && localStorage.getItem('username')) {
            updateAxiosClientCredential(localStorage.getItem('authToken') ?? undefined);
            void dispatch(fetchCheckAuthConnection());
        }
    }, [dispatch]);

    return (
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: 'light',
                    primary: {
                        main: '#6b63c5',
                        light: '#c4c1e8',
                        dark: '#2b284f',
                    },
                    secondary: {
                        main: '#5c6bc0',
                    },
                    background: {
                        default: '#ebeced',
                        paper: '#e3e3e4',
                    },
                },
            })}
        >
            <Box minHeight="100vh" bgcolor={(theme) => theme.palette.background.default} className={cx('App')}>
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
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/orders" element={<OrdersListPage />}></Route>
                    <Route path="/orders/:id" element={<OrderDetails />}></Route>
                </Routes>
                <RegisterPopup opened={registerPopupOpened} onCloseClick={() => setRegisterPopupOpened(false)} />
                <LoginPopup
                    onSubmit={(values) => {
                        void dispatch(fetchLoginUser({ password: values.password, username: values.email }));
                    }}
                    opened={loginPopupOpened}
                    onCloseClick={() => setLoginPopupOpened(false)}
                />
                <Typography />
            </Box>
        </ThemeProvider>
    );
};
