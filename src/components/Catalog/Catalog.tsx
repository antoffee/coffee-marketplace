import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { EMPTY_IMAGE } from 'shared/constants';

import { createUUID } from 'utils/createUUID';
import { formatImgUrl } from 'utils/formatImgUrl';

import { CatalogItemProps, CatalogProps } from './Catalog.types';

import styles from './Catalog.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const CatalogItemCard = ({ item, onClick }: CatalogItemProps) => (
    <Card className={cx('catalog-item')} onClick={onClick}>
        <CardMedia component={'img'} image={formatImgUrl(item.photo) ?? EMPTY_IMAGE}></CardMedia>
        <CardContent>
            <Typography variant="h6">{item.name}</Typography>
        </CardContent>
    </Card>
);

export const Catalog: React.FC<CatalogProps> = ({ items, onItemClick }) => {
    return (
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
            {items.map((item) => (
                <Grid xs={1} key={createUUID()} item>
                    <CatalogItemCard item={item} onClick={() => onItemClick(item)} />
                </Grid>
            ))}
        </Grid>
    );
};
