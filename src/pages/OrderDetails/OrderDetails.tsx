import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCartProducts, fetchOrderDetails } from 'store/reducers/cartReducer';

import { CartItemCard } from 'components/CartItemCard';
import { getReceiveName } from 'utils/getReceiveName';
import { getStatusColor } from 'utils/getStatusColor';
import { getStatusName } from 'utils/getStatusName';

import { OrderDetailsProps } from './OrderDetails.types';

import styles from './OrderDetails.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const OrderDetails: React.FC<OrderDetailsProps> = () => {
    const dispatch = useAppDispatch();
    const params = useParams<{ id: string }>();
    const { orderDetails, orderDetailsLoading } = useAppSelector((state) => state.cart);
    const { userEmail } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        void dispatch(fetchCartProducts());
    }, [dispatch]);

    useEffect(() => {
        if (!userEmail) {
            navigate('/');
        }
    }, [navigate, userEmail]);

    useEffect(() => {
        if (params.id) {
            void dispatch(fetchOrderDetails(+params.id));
        }
    }, [dispatch, params.id]);

    return (
        <div className={cx('cart-page', 'page')}>
            {orderDetailsLoading ? (
                <CircularProgress />
            ) : (
                <Grid width={'100%'} container spacing={3}>
                    <Grid item xs={8}>
                        {orderDetails?.products?.map((item) => (
                            <CartItemCard
                                viewOnly
                                key={item.name}
                                item={{ product: item, price: item.price * item.qty, qty: item.qty }}
                            />
                        ))}
                    </Grid>
                    <Grid display={'flex'} flexDirection="column" alignItems={'flex-start'} item xs={4}>
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h5">Стоимость: {orderDetails?.total_price}₽</Typography>
                                <Typography variant="subtitle2">
                                    Товаров: {orderDetails?.products?.length ?? 0} шт
                                </Typography>
                                <Typography variant="subtitle2">
                                    Способ доставки: {getReceiveName(orderDetails?.receive_kind)}
                                </Typography>
                                <Typography variant="subtitle2">Статус:</Typography>
                                <Badge
                                    badgeContent={getStatusName(orderDetails?.status)}
                                    color={getStatusColor(orderDetails?.status)}
                                ></Badge>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
