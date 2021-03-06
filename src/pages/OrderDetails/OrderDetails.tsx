import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchOrderDetails } from 'store/reducers/cartReducer';

import { CartItemCard } from 'components/CartItemCard';
import { getDeliveryAddress } from 'utils/getDeliveryAddress';
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
                <Grid width={'100%'} container spacing={3} columns={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={1} sm={1.3} md={1.3}>
                        {orderDetails?.products?.map((item) => (
                            <CartItemCard
                                viewOnly
                                key={item.name}
                                item={{ product: item, price: item.price * item.availability, qty: item.availability }}
                            />
                        ))}
                    </Grid>
                    <Grid
                        display={'flex'}
                        flexDirection="column"
                        alignItems={'flex-start'}
                        item
                        xs={1}
                        sm={0.7}
                        md={0.7}
                    >
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h5">??????????????????: {orderDetails?.total_price}???</Typography>
                                <Typography variant="subtitle2">
                                    ??????????????: {orderDetails?.products?.length ?? 0} ????
                                </Typography>
                                <Typography variant="subtitle2">
                                    ???????????? ????????????????: {getReceiveName(orderDetails?.receive_kind)}
                                </Typography>
                                {orderDetails?.delivery_address && (
                                    <Typography variant="subtitle2">
                                        ?????????? ????????????????: {getDeliveryAddress(orderDetails?.delivery_address)}
                                    </Typography>
                                )}
                                <Chip
                                    label={getStatusName(orderDetails?.status)}
                                    color={getStatusColor(orderDetails?.status)}
                                ></Chip>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
