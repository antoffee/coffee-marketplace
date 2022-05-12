import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { ShopListSortByEnum, SortOrderEnum } from 'client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProductList } from 'store/reducers/productReducer';
import { fetchShopList } from 'store/reducers/shopsReducer';

import { SliderCarousel } from 'components/SliderCarousel';
import { getShopAddress } from 'utils/getShopAddress';

import { HomePageProps } from './HomePage.types';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const MIN_SHOWN_STORES = 2;

export const HomePage: React.FC<HomePageProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const tableEl = useRef<HTMLDivElement>(null);
    const { shopList: shownStores } = useAppSelector((state) => state.shops);
    const { productList } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (!shownStores) {
            void dispatch(
                fetchShopList({ sortBy: ShopListSortByEnum.ID, offset: 0, count: 10, order: SortOrderEnum.ASC }),
            );
        }
    }, [dispatch, shownStores]);

    const [distanceBottom, setDistanceBottom] = useState(0);
    // hasMore should come from the place where you do the data fetching
    // for example, it could be a prop passed from the parent component
    // or come from some store
    const scrollListener = useCallback(() => {
        if (tableEl?.current) {
            const bottom = tableEl?.current?.scrollHeight - tableEl?.current?.clientHeight;
            // if you want to change distanceBottom every time new data is loaded
            // don't use the if statement
            if (!distanceBottom) {
                // calculate distanceBottom that works for you
                setDistanceBottom(Math.round((bottom / 100) * 20));
            }
            if (tableEl.current.scrollTop > bottom - distanceBottom) {
                fetchShopList({
                    count: MIN_SHOWN_STORES,
                    offset: shownStores?.length ?? 0,
                    order: SortOrderEnum.ASC,
                    sortBy: ShopListSortByEnum.ID,
                });
            }
        }
    }, [distanceBottom, shownStores?.length]);

    useLayoutEffect(() => {
        const tableRef = tableEl.current;
        tableRef?.addEventListener('scroll', scrollListener);
        return () => {
            tableRef?.removeEventListener('scroll', scrollListener);
        };
    }, [scrollListener]);

    useEffect(() => {
        shownStores?.forEach((store) => void dispatch(fetchProductList({ count: 4, offset: 0, shopId: store.id })));
    }, [dispatch, shownStores]);

    return (
        <div className={cx('home-page', 'page')} ref={tableEl}>
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
        </div>
    );
};
