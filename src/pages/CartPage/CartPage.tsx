import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { OrderReceiveKindEnum, ShopListSortByEnum, SortOrderEnum } from 'client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCartProducts, fetchCreateOrder } from 'store/reducers/cartReducer';
import { fetchShopList } from 'store/reducers/shopsReducer';

import { CartItemCard } from 'components/CartItemCard';
import { getShopAddress } from 'utils/getShopAddress';

import { CartPageProps } from './CartPage.types';

import styles from './CartPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CartPage: React.FC<CartPageProps> = () => {
    const dispatch = useAppDispatch();
    const { cart, cartPrice, cartLoading, createOrderLoading, createdOrderId } = useAppSelector((state) => state.cart);
    const { shopList } = useAppSelector((state) => state.shops);
    const { userEmail } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    const [receiveKind, setReceiveKind] = useState<OrderReceiveKindEnum>();
    const [receiveShopId, setReceiveShopId] = useState<number>();

    useEffect(() => {
        void dispatch(fetchCartProducts());
    }, [dispatch]);

    useEffect(() => {
        void dispatch(fetchShopList({ count: 10, offset: 0, order: SortOrderEnum.ASC, sortBy: ShopListSortByEnum.ID }));
    }, [dispatch]);

    useEffect(() => {
        if (!userEmail) {
            navigate('/');
        }
    }, [navigate, userEmail]);

    return (
        <div className={cx('cart-page', 'page')}>
            {createOrderLoading ? (
                <CircularProgress />
            ) : createdOrderId ? (
                <Box>
                    <Typography variant="h1">Заказ успешно создан</Typography>
                    <Typography variant="caption">
                        Вы можете посмотреть информацию о нем <Link to={`/orders/${createdOrderId}`}>Здесь</Link>
                    </Typography>
                </Box>
            ) : (
                <Grid width={'100%'} container spacing={3}>
                    <Grid item xs={8}>
                        {cartLoading && <CircularProgress />}
                        {cart?.map((item) => (
                            <CartItemCard key={item.name} item={item} />
                        ))}
                    </Grid>
                    <Grid display={'flex'} flexDirection="column" alignItems={'flex-start'} item xs={4}>
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h5">К оплате: {cartPrice}₽</Typography>
                                <Typography variant="subtitle2">Товаров: {cart?.length} шт</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="select-label">Способ доставки</InputLabel>
                                    <Select<OrderReceiveKindEnum>
                                        onChange={(e) =>
                                            setReceiveKind(e.target.value as unknown as OrderReceiveKindEnum)
                                        }
                                        labelId="select-label"
                                        label="Способ доставки"
                                    >
                                        <MenuItem value={OrderReceiveKindEnum.DELIVERY}>Доставка</MenuItem>
                                        <MenuItem value={OrderReceiveKindEnum.TAKEAWAY}>Самовывоз</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-shop-label">Магазин для доставки</InputLabel>
                                    <Select<number>
                                        onChange={(e) => setReceiveShopId(+e.target.value)}
                                        labelId="select-shop-label"
                                        label="Магазин для доставки"
                                    >
                                        {shopList?.map((shop) => (
                                            <MenuItem key={shop.id} value={shop.id}>
                                                {getShopAddress(shop.address)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    disabled={!receiveKind || !receiveShopId}
                                    onClick={() => {
                                        if (receiveShopId)
                                            void dispatch(fetchCreateOrder({ shopId: receiveShopId, receiveKind }));
                                    }}
                                >
                                    Оформить заказ
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
