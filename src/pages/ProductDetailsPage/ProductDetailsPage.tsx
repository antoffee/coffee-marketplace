import React, { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { EMPTY_IMAGE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProductDetails } from 'store/reducers/productReducer';

import { ProductDetailsPageProps } from './ProductDetailsPage.types';

import styles from './ProductDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
    const params = useParams<{ id: string }>();
    const [query] = useSearchParams();
    const shopId = useMemo(() => Number(query.get('shop')), [query]);
    const dispatch = useAppDispatch();
    const {
        productDetails: product,
        productDetailsLoading,
        productDetailsError,
    } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (params.id && !productDetailsError && shopId) {
            void dispatch(fetchProductDetails({ productId: +params.id, shopId }));
        }
    }, [dispatch, params.id, productDetailsError, shopId]);

    return (
        <div className={cx('product-details-page', 'page')}>
            {productDetailsLoading ? (
                <CircularProgress />
            ) : (
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
            )}
        </div>
    );
};
