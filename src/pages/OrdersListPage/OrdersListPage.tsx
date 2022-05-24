import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchOrderList } from 'store/reducers/cartReducer';

import { formatDate } from 'utils/formatDate';
import { getReceiveName } from 'utils/getReceiveName';
import { getStatusColor } from 'utils/getStatusColor';
import { getStatusName } from 'utils/getStatusName';

import { OrdersListPageProps } from './OrdersListPage.types';

import styles from './OrdersListPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const OrdersListPage: React.FC<OrdersListPageProps> = () => {
    const { userEmail } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orderList, orderListLoading } = useAppSelector((state) => state.cart);

    useEffect(() => {
        if (!userEmail) {
            navigate('/');
        }
    }, [navigate, userEmail]);

    useEffect(() => {
        void dispatch(fetchOrderList({ count: 100, offset: 0 }));
    }, [dispatch]);

    return (
        <div className={cx('orders-list-page', 'page')}>
            <Typography variant="h5">Ваши заказы</Typography>
            {!orderListLoading && !orderList?.length && <Typography variant="h2">Список заказов пуст</Typography>}
            <List>
                {orderList?.map((item) => (
                    <ListItem
                        sx={{ bgcolor: 'background.paper', mb: '8px' }}
                        key={item.id}
                        onClick={() => navigate(`/orders/${item.id}`)}
                    >
                        <ListItem>
                            <ListItemText
                                primary={`Заказ ${formatDate(item.created_at)}`}
                                secondary={
                                    <List>
                                        <ListItem>
                                            <Chip
                                                label={getStatusName(item.status)}
                                                color={getStatusColor(item.status)}
                                            ></Chip>
                                        </ListItem>
                                        <ListItem>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                Стоимость: {item.total_price ?? 0}₽
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                Способ доставки: {getReceiveName(item.receive_kind)}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                }
                            />
                        </ListItem>
                    </ListItem>
                ))}

                {orderListLoading && <CircularProgress />}
            </List>
        </div>
    );
};
