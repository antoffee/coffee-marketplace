import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchShopDetails, fetchShopProducts } from 'store/reducers/shopsReducer';

import { Catalog } from 'components/Catalog';
import { getShopAddress } from 'utils/getShopAddress';

import { ShopPageProps } from './ShopPage.types';

import styles from './ShopPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ShopPage: React.FC<ShopPageProps> = () => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { shopDetails, shopDetailsLoading, shopProducts } = useAppSelector((state) => state.shops);

    useEffect(() => {
        if (params.id) {
            void dispatch(fetchShopDetails(+params.id));
            void dispatch(fetchShopProducts({ shopId: +params.id, count: 100, offset: 0 }));
        }
    }, [dispatch, params.id]);

    return (
        <div className={cx('home-page', 'page')}>
            {shopDetails?.address && (
                <>
                    <Typography  variant="h3">{getShopAddress(shopDetails?.address)}</Typography>
                    <Catalog
                        items={shopProducts ?? []}
                        onItemClick={(item) => navigate(`/product-details/${item.id ?? '1'}?shopId=${params.id ?? '0'}`)}
                    />
                </>
            )}
            {shopDetailsLoading && <CircularProgress />}
        </div>
    );
};
