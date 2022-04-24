import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { EMPTY_IMAGE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProductDetails } from 'store/reducers/productReducer';

import { ProductDetailsPageProps } from './ProductDetailsPage.types';

import styles from './ProductDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {
        productDetails: product,
        productDetailsLoading,
        productDetailsError,
    } = useAppSelector((state) => state.products);
    // const product = PRODUCT_MOCK.find((item) => `${item.id ?? ''}` === params.id);

    useEffect(() => {
        if (!productDetailsLoading && product?.id !== params.id && !productDetailsError) {
            void dispatch(fetchProductDetails(`${params.id ?? ''}`));
        }
    }, [dispatch, params.id, product?.id, productDetailsError, productDetailsLoading]);

    return (
        <div className={cx('product-details-page', 'page')}>
            <Grid container columns={2} spacing={3}>
                <Grid item xs={1}>
                    <Card variant="elevation" raised={false}>
                        <Typography variant="h2">{product?.name}</Typography>
                        <CardMedia component={'img'} image={product?.photo ?? EMPTY_IMAGE} />
                        <CardContent>
                            <Typography variant="body1">{product?.category}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1">Цена: {product?.price}</Typography>
                </Grid>
            </Grid>
        </div>
    );
};
