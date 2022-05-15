import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccountBox, Home, ShoppingBasket } from '@mui/icons-material';
import { AppBar, Button, IconButton, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useOutside } from 'hooks/useOutside';
import { useAppSelector } from 'store/hooks';

import { ProfilePopover } from 'components/ProfilePopover';

import { NavbarProps } from './Navbar.types';

import styles from './Navbar.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onLogoClick, onRegisterClick }) => {
    const logged = useAppSelector((state) => !!state.profile.userEmail);
    const [profilePopoverOpened, setProfilePopoverOpened] = useState(false);

    const popover = useRef(null);
    useOutside(popover, () => setProfilePopoverOpened(false));

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 20,
        target: undefined,
    });

    const location = useLocation();

    useEffect(() => {
        if (!logged) {
            setProfilePopoverOpened(false);
        }
    }, [logged]);

    useEffect(() => {
        setProfilePopoverOpened(false);
    }, [location.pathname]);

    return (
        <Slide appear={true} direction="down" in={!trigger}>
            <AppBar color="transparent" elevation={4} className={cx('navbar')}>
                <Toolbar sx={{ width: '100%', columnGap: '12px' }}>
                    <IconButton onClick={onLogoClick} sx={{ marginRight: 'auto' }}>
                        <Home color="primary" />
                    </IconButton>
                    {logged ? (
                        <>
                            <Link to="/cart">
                                <IconButton color="primary">
                                    <ShoppingBasket />
                                </IconButton>
                            </Link>
                            <IconButton
                                ref={popover}
                                color="primary"
                                onClick={() => setProfilePopoverOpened(true)}
                                className={cx('profile-button')}
                            >
                                <ProfilePopover
                                    handleClose={() => setProfilePopoverOpened(false)}
                                    opened={profilePopoverOpened}
                                />
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
                </Toolbar>
            </AppBar>
        </Slide>
    );
};
