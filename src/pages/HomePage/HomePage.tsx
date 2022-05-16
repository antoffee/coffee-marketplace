import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { useEmergenceTracking } from 'hooks/useEmergenceTracking';
import { useInfiniteShopsLoading } from 'hooks/useInfiniteShopsLoading';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProductList } from 'store/reducers/productReducer';

import { SliderCarousel } from 'components/SliderCarousel';
import { getShopAddress } from 'utils/getShopAddress';

import { HomePageProps } from './HomePage.types';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const HomePage: React.FC<HomePageProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { shopList: shownStores } = useAppSelector((state) => state.shops);
    const { productList } = useAppSelector((state) => state.products);

    const { isVisible, visibilityRef } = useEmergenceTracking();

    useEffect(() => {
        shownStores?.forEach((store) => void dispatch(fetchProductList({ count: 4, offset: 0, shopId: store.id })));
    }, [dispatch, shownStores]);

    useInfiniteShopsLoading(isVisible);

    return (
        <div className={cx('home-page', 'page')}>
            <Typography variant="h2">Добро пожаловать</Typography>
            {shownStores?.map((store, i) => (
                <React.Fragment key={store.id}>
                    <Button variant="text" onClick={() => navigate(`/shop/${store.id ?? ''}`)}>
                        <h2>{getShopAddress(store.address)}</h2>
                    </Button>
                    {productList?.find((prod) => prod.shopId === store.id)?.products?.length ? (
                        <SliderCarousel
                            onItemClick={(item) =>
                                navigate(`/product-details/${item.id ?? '1'}?shopId=${store.id ?? '0'}`)
                            }
                            items={productList?.find((prod) => prod.shopId === store.id)?.products ?? []}
                            key={i}
                        />
                    ) : (
                        <Typography variant="body1">В данном магазине на данный момент нет товаров</Typography>
                    )}
                </React.Fragment>
            ))}
            <div ref={visibilityRef} />
        </div>
    );
};
