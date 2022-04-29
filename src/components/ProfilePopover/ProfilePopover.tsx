import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/reducers/profileReducer';

import { ProfilePopoverProps } from './ProfilePopover.types';

import styles from './ProfilePopover.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({ opened }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={cx('profile-popover', { opened })}>
            <Button onClick={() => dispatch(logout())}>Выйти</Button>
            <Link to={`/orders`}>
                <Button>Просмотреть список заказов</Button>
            </Link>
        </div>
    );
};
