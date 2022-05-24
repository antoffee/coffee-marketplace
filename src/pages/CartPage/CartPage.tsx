import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AddCircleOutlined } from '@mui/icons-material';
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
import { AddressAddDTO, OrderReceiveKindEnum } from 'client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCartProducts, fetchCreateOrder } from 'store/reducers/cartReducer';
import { fetchAddDelivery, fetchDeliveryList } from 'store/reducers/profileReducer';

import { AddDeliveryAddressPopup } from 'components/AddDeliveryAddressPopup';
import { CartItemCard } from 'components/CartItemCard';
import { ShopSelect } from 'components/ShopSelect';
import { getDeliveryAddress } from 'utils/getDeliveryAddress';

import { CartPageProps } from './CartPage.types';

import styles from './CartPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CartPage: React.FC<CartPageProps> = () => {
    const dispatch = useAppDispatch();
    const { cart, cartPrice, cartLoading, createOrderLoading, createdOrderId, selectedShopId } = useAppSelector(
        (state) => state.cart,
    );
    const { shopList } = useAppSelector((state) => state.shops);
    const { userEmail, deliveryAddresses } = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    const [receiveKind, setReceiveKind] = useState<OrderReceiveKindEnum>(OrderReceiveKindEnum.TAKEAWAY);
    const [deliveryAddressID, setDeliveryAddressID] = useState<string>();
    const id = selectedShopId ?? shopList?.[0]?.id;

    const [addDeliveryPopupOpened, setAddDeliveryPopupOpened] = useState(false);

    useEffect(() => {
        if (id) {
            void dispatch(fetchCartProducts(id));
            void dispatch(fetchDeliveryList());
        }
    }, [dispatch, id]);

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
                <Grid width={'100%'} container columns={{ xs: 1, sm: 2, md: 2 }} spacing={3}>
                    <Grid item xs={1} sm={1.3} md={1.3}>
                        {cartLoading && <CircularProgress />}
                        {cart?.map((item) => (
                            <CartItemCard key={item.product?.id} item={item} />
                        ))}
                        {!cartLoading && !cart?.length && <Typography variant="h2">Корзина пуста</Typography>}
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
                                        defaultValue={OrderReceiveKindEnum.TAKEAWAY}
                                    >
                                        <MenuItem value={OrderReceiveKindEnum.DELIVERY}>Доставка</MenuItem>
                                        <MenuItem value={OrderReceiveKindEnum.TAKEAWAY}>Самовывоз</MenuItem>
                                    </Select>
                                </FormControl>

                                {receiveKind === OrderReceiveKindEnum.TAKEAWAY && (
                                    <ShopSelect fullWidth readOnly={!cart?.length} disabled={!cart?.length} />
                                )}
                                {receiveKind === OrderReceiveKindEnum.DELIVERY && (
                                    <>
                                        {!!deliveryAddresses?.length && (
                                            <FormControl margin="dense" fullWidth>
                                                <InputLabel id="select-delivery-label">Адрес доставки</InputLabel>
                                                <Select<OrderReceiveKindEnum>
                                                    onChange={(e) => setDeliveryAddressID(e.target.value)}
                                                    labelId="select-delivery-label"
                                                    label="Адрес доставки"
                                                    readOnly={!cart?.length}
                                                    disabled={!cart?.length}
                                                    MenuProps={{ style: { maxHeight: 500 } }}
                                                >
                                                    {deliveryAddresses?.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {getDeliveryAddress(item)}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                        <ShopSelect
                                            label="Магазин для заказа"
                                            fullWidth
                                            readOnly={!cart?.length}
                                            disabled={!cart?.length}
                                        />

                                        <Button fullWidth onClick={() => setAddDeliveryPopupOpened(true)}>
                                            Добавить адрес <AddCircleOutlined />
                                        </Button>
                                    </>
                                )}
                                <Button
                                    fullWidth
                                    disabled={
                                        !receiveKind ||
                                        (receiveKind === OrderReceiveKindEnum.TAKEAWAY && !selectedShopId) ||
                                        (receiveKind === OrderReceiveKindEnum.DELIVERY && !deliveryAddressID) ||
                                        !cart?.length
                                    }
                                    onClick={() => {
                                        if (selectedShopId)
                                            void dispatch(
                                                fetchCreateOrder({
                                                    shopId: selectedShopId,
                                                    receiveKind,
                                                    deliveryAddressId:
                                                        deliveryAddressID &&
                                                        receiveKind === OrderReceiveKindEnum.DELIVERY
                                                            ? +deliveryAddressID
                                                            : undefined,
                                                }),
                                            );
                                    }}
                                >
                                    Оформить заказ
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
            <AddDeliveryAddressPopup
                onCloseClick={() => setAddDeliveryPopupOpened(false)}
                opened={addDeliveryPopupOpened}
                onSubmit={(values) =>
                    void dispatch(fetchAddDelivery(values as AddressAddDTO)).then(() =>
                        setAddDeliveryPopupOpened(false),
                    )
                }
            />
        </div>
    );
};
