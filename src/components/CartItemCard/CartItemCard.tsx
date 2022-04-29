import React from 'react';
import {
    Avatar,
    FormControl,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { EMPTY_IMAGE } from 'shared/constants';
import { useAppDispatch } from 'store/hooks';
import { fetchChangeQty } from 'store/reducers/cartReducer';

import { CartItemCardProps } from './CartItemCard.types';

import styles from './CartItemCard.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, viewOnly }) => {
    const dispatch = useAppDispatch();
    return (
        <ListItem sx={{ bgcolor: 'background.paper' }} style={{ display: 'flex' }} className={cx('cart-item')}>
            <ListItemAvatar>
                <Avatar src={item.photo ?? EMPTY_IMAGE} />
            </ListItemAvatar>
            <ListItemText
                primary={item.name}
                secondary={
                    <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                            {item.category}
                        </Typography>
                        <Typography>
                            {(item.price ?? 0) * (item.qty ?? 0)}₽ ({item.price} ₽ х {item.qty} шт)
                        </Typography>
                    </React.Fragment>
                }
            />
            <FormControl>
                <InputLabel id={`qty-select__label-${item.id ?? 0}`}>Количество</InputLabel>

                <Select
                    sx={{ minWidth: '200px' }}
                    labelId={`qty-select__label-${item.id ?? 0}`}
                    label="Количество"
                    value={item.qty ?? 1}
                    readOnly={viewOnly}
                    disabled={viewOnly}
                    onChange={(e) => void dispatch(fetchChangeQty({ item, qty: +e.target.value }))}
                >
                    {Array.from({ length: item?.qty ?? 1 }, (_, index) => index + 1).map((qty) => (
                        <MenuItem key={qty} value={qty}>
                            {qty} шт
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ListItem>
    );
};
