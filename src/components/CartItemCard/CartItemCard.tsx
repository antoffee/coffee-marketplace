import React, { useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import {
    Avatar,
    Divider,
    FormControl,
    IconButton,
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

import { formatImgUrl } from 'utils/formatImgUrl';

import { CartItemCardProps } from './CartItemCard.types';

import styles from './CartItemCard.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CartItemCard: React.FC<CartItemCardProps> = ({ item: { price, product: item, qty }, viewOnly }) => {
    const dispatch = useAppDispatch();

    const imgUrl = useMemo(() => formatImgUrl(item.photo) ?? EMPTY_IMAGE, [item?.photo]);

    return (
        <ListItem sx={{ bgcolor: 'background.paper' }} style={{ display: 'flex' }} className={cx('cart-item')}>
            <ListItemAvatar>
                <Avatar src={imgUrl} />
            </ListItemAvatar>
            <ListItemText
                primary={item.name}
                secondary={
                    <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                            {item.category}
                        </Typography>
                        <Typography>
                            {price}₽ ({item.price} ₽ х {qty ?? 0} шт)
                        </Typography>
                    </React.Fragment>
                }
            />
            <Divider />
            {!viewOnly && (
                <FormControl>
                    <InputLabel id={`qty-select__label-${item.id ?? 0}`}>Количество</InputLabel>

                    <Select
                        MenuProps={{ style: { maxHeight: 500 } }}
                        sx={{ minWidth: '200px', mr: '10px' }}
                        labelId={`qty-select__label-${item.id ?? 0}`}
                        label="Количество"
                        value={qty ?? undefined}
                        readOnly={viewOnly}
                        disabled={viewOnly}
                        onChange={(e) => void dispatch(fetchChangeQty({ item, qty: +e.target.value }))}
                    >
                        {Array.from({ length: item?.availability ?? 1 }, (_, index) => index + 1).map((qty) => (
                            <MenuItem key={qty} value={qty}>
                                {qty} шт
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            {!viewOnly && (
                <IconButton onClick={() => void dispatch(fetchChangeQty({ item, qty: 0 }))}>
                    <Delete />
                </IconButton>
            )}
        </ListItem>
    );
};
