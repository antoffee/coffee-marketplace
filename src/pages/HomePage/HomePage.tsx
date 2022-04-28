import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
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
        void dispatch(fetchShopList({ sortBy: ShopListSortByEnum.ID, offset: 0, count: 10, order: SortOrderEnum.ASC }));
    }, [dispatch]);

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
        shownStores?.forEach((store) => fetchProductList({ count: 4, offset: 0, shopId: store.id }));
    }, [shownStores]);

    return (
        <div className={cx('home-page', 'page')} ref={tableEl}>
            {shownStores?.map((item, i) => (
                <React.Fragment key={item.id}>
                    <Button variant="text" onClick={() => navigate(`/shop/${item.id ?? ''}`)}>
                        <h2>{getShopAddress(item.address)}</h2>
                    </Button>
                    <SliderCarousel
                        onItemClick={(item) => navigate(`/product-details/${item.id ?? ''}`)}
                        items={productList?.find((prod) => prod.shopId === item.id)?.products ?? []}
                        key={i}
                    />
                </React.Fragment>
            ))}
        </div>
    );
};
