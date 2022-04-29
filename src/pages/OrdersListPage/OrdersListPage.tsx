import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppSelector } from 'store/hooks';

import { OrdersListPageProps } from './OrdersListPage.types';

import styles from './OrdersListPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const OrdersListPage: React.FC<OrdersListPageProps> = () => {
    const { userEmail } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userEmail) {
            navigate('/');
        }
    }, [navigate, userEmail]);
    return (
        <div className={cx('orders-list-page', 'page')}>
            <Typography variant='h5'>Ваши заказы</Typography>
            <Typography variant='h2'>Список заказов пуст</Typography>

        </div>
    );
};
