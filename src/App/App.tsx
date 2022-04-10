import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { AppBar, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { Navbar } from 'components/Navbar';
import { RegisterPopup } from 'components/RegisterPopup';
import { noop } from 'utils/noop';

import styles from './App.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    const [registerPopupOpened, setRegisterPopupOpened] = useState(false);
    return (
        <div className={cx('App')}>
            <AppBar />
            <Navbar onLoginClick={noop} onLogoClick={noop} onRegisterClick={() => setRegisterPopupOpened(true)} />
            {/* <Routes>
                <Route path="/register" caseSensitive element={<RegisterPage />}></Route>
            </Routes> */}
            <RegisterPopup
                opened={registerPopupOpened}
                onCloseClick={() => setRegisterPopupOpened(false)}
                onSubmit={noop}
            ></RegisterPopup>
            <Typography />
        </div>
    );
};
