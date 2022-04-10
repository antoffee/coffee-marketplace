import React from 'react';
import { AccountBox, FavoriteBorder, Home, ShoppingBasket } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';

import { NavbarProps } from './Navbar.types';

import styles from './Navbar.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onLogoClick, onRegisterClick }) => {
    const logged = false;
    return (
        <div className={cx('navbar')}>
            <Home onClick={onLogoClick} />
            <div className={cx('navbar-buttons')}>
                {logged ? (
                    <>
                        <IconButton color="primary">
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton color="primary">
                            <ShoppingBasket />
                        </IconButton>
                        <IconButton color="primary">
                            <AccountBox />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Button variant="outlined" onClick={onLoginClick}>
                            Войти
                        </Button>
                        <Button variant="contained" onClick={onRegisterClick}>
                            Зарегистрироваться
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
