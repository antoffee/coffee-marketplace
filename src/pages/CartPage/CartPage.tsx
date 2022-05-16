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
import { OrderReceiveKindEnum } from 'client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCartProducts, fetchCreateOrder } from 'store/reducers/cartReducer';

import { CartItemCard } from 'components/CartItemCard';
import { ShopSelect } from 'components/ShopSelect';

import { CartPageProps } from './CartPage.types';

import styles from './CartPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CartPage: React.FC<CartPageProps> = () => {
    const dispatch = useAppDispatch();
    const { cart, cartPrice, cartLoading, createOrderLoading, createdOrderId, selectedShopId } = useAppSelector(
        (state) => state.cart,
    );
    const { shopList } = useAppSelector((state) => state.shops);
    const { userEmail } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    // const [isEndVisible, setIsEndVisible] = useState(false);
    const [receiveKind, setReceiveKind] = useState<OrderReceiveKindEnum>(OrderReceiveKindEnum._);
    // const [receiveShopId, setReceiveShopId] = useState<number>();

    const id = selectedShopId ?? shopList?.[0]?.id;

    useEffect(() => {
        if (id) {
            void dispatch(fetchCartProducts(id));
        }
    }, [dispatch, id]);

    // useInfiniteShopsLoading(isEndVisible);

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
                            <CartItemCard key={item.product?.id} item={item} />
                        ))}
                        {!cartLoading && !cart?.length && <Typography variant="h2">Корзина пуста</Typography>}
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
                                        readOnly={!cart?.length}
                                        disabled={!cart?.length}
                                        MenuProps={{ style: { maxHeight: 500 } }}
                                        defaultValue={OrderReceiveKindEnum._}
                                    >
                                        {/* <MenuItem value={OrderReceiveKindEnum.DELIVERY}>Доставка</MenuItem> */}
                                        <MenuItem value={OrderReceiveKindEnum._}>Самовывоз</MenuItem>
                                    </Select>
                                </FormControl>

                                <ShopSelect fullWidth readOnly={!cart?.length} disabled={!cart?.length} />
                                <Button
                                    disabled={!receiveKind || !selectedShopId || !cart?.length}
                                    onClick={() => {
                                        if (selectedShopId)
                                            void dispatch(fetchCreateOrder({ shopId: selectedShopId, receiveKind }));
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
