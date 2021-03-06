import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Card, CardMedia, CircularProgress, Grid, MenuItem, Select, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { EMPTY_IMAGE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchChangeQty } from 'store/reducers/cartReducer';
import { fetchProductDetails, fetchProductList } from 'store/reducers/productReducer';

import { Catalog } from 'components/Catalog';
import { formatImgUrl } from 'utils/formatImgUrl';

import { ProductDetailsPageProps } from './ProductDetailsPage.types';

import styles from './ProductDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
    const params = useParams<{ id: string }>();
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const shopId = useMemo(() => Number(query.get('shopId')), [query]);
    const dispatch = useAppDispatch();
    const {
        productDetails: product,
        productDetailsLoading,
        productDetailsError,
        productList,
    } = useAppSelector((state) => state.products);

    const { userEmail } = useAppSelector((state) => state.profile);

    const [selectedQty, setSelectedQty] = useState(1);

    useEffect(() => {
        if (params.id && !productDetailsError && shopId) {
            void dispatch(fetchProductDetails({ productId: +params.id, shopId }));
        }
    }, [dispatch, params.id, productDetailsError, shopId]);

    useEffect(() => {
        if (!productList?.find((item) => item.shopId === shopId)?.products) {
            void dispatch(fetchProductList({ count: 10, offset: 0, shopId }));
        }
    }, [dispatch, productList, shopId]);

    return (
        <div className={cx('product-details-page', 'page')}>
            {productDetailsLoading ? (
                <CircularProgress />
            ) : (
                <Grid container columns={{ sm: 2 }} spacing={3}>
                    <Grid item xs={1}>
                        <Card variant="elevation" raised={false}>
                            <CardMedia
                                sx={{
                                    maxHeight: 400,
                                    objectFit: 'contain',
                                }}
                                component={'img'}
                                image={formatImgUrl(product?.photo) ?? EMPTY_IMAGE}
                            />
                        </Card>
                    </Grid>
                    <Grid display={'flex'} flexDirection="column" alignItems={'flex-start'} item xs={1}>
                        <Typography variant="h2">{product?.name}</Typography>
                        <Typography variant="body1">??????????????????: {product?.category}</Typography>
                        {product?.description && (
                            <Typography variant="body1">????????????????: {product?.description}</Typography>
                        )}
                        <Typography variant="body1">????????: {product?.price}???</Typography>
                        {!!userEmail && (
                            <>
                                {product?.availability ? (
                                    <>
                                        <Select<number>
                                            MenuProps={{ style: { maxHeight: 500 } }}
                                            inputMode="numeric"
                                            defaultValue={1}
                                            maxRows={10}
                                            onChange={(e) => setSelectedQty(+e.target.value)}
                                        >
                                            {Array.from({ length: product?.availability }, (_, index) => index + 1).map(
                                                (qty) => (
                                                    <MenuItem key={qty} value={qty}>
                                                        {qty} ????
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                        <Button
                                            onClick={() =>
                                                void dispatch(fetchChangeQty({ item: product, qty: selectedQty }))
                                            }
                                        >
                                            ???????????????? ?? ??????????????
                                        </Button>
                                    </>
                                ) : (
                                    <Typography color="red">???????????? ?????????? ???????????????? ?????????????????????? ?? ??????????????</Typography>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            )}
            <Typography margin="24px 0" textAlign={'start'}>
                ?????? ?????????? ???????? ??????????????????
            </Typography>
            <Catalog
                items={productList?.find((item) => item.shopId === shopId)?.products ?? []}
                onItemClick={(item) => navigate(`/product-details/${item.id ?? '1'}?shopId=${shopId ?? '0'}`)}
            />
        </div>
    );
};
