import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useInfiniteShopsLoading } from 'hooks/useInfiniteShopsLoading';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectDeliveryShop } from 'store/reducers/cartReducer';

import { getShopAddress } from 'utils/getShopAddress';

import { ShopSelectProps } from './ShopSelect.types';

export const ShopSelect: React.FC<ShopSelectProps> = ({
    readOnly,
    disabled,
    fullWidth,
    label = 'Магазин для доставки',
}) => {
    const dispatch = useAppDispatch();
    const { selectedShopId } = useAppSelector((state) => state.cart);
    const [isEndVisible, setIsEndVisible] = useState(false);
    const { shopList } = useAppSelector((state) => state.shops);

    useInfiniteShopsLoading(isEndVisible);
    return (
        <FormControl margin="dense" fullWidth={fullWidth}>
            <InputLabel id="select-shop-label">{label}</InputLabel>
            <Select<number>
                value={selectedShopId}
                onChange={(e) => dispatch(selectDeliveryShop(+e.target.value))}
                labelId="select-shopa-label"
                label={label}
                readOnly={readOnly}
                disabled={disabled}
                MenuProps={{
                    PaperProps: {
                        className: 'growing-list',
                        style: {
                            maxHeight: Math.min(300, (shopList?.length ?? 0) * 36 + 16),
                            transition: 'all linear 300ms',
                        },
                        onScroll: (event) => {
                            setIsEndVisible(
                                Math.abs(
                                    (event.target as Element).scrollHeight -
                                        (event.target as Element).clientHeight -
                                        (event.target as Element).scrollTop,
                                ) < 1,
                            );
                        },
                    },
                }}
            >
                {shopList?.map((shop) => (
                    <MenuItem key={shop.id} value={shop.id}>
                        {getShopAddress(shop.address)}
                    </MenuItem>
                ))}
                <MenuItem>
                    <div />
                </MenuItem>
            </Select>
        </FormControl>
    );
};
