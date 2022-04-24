import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { PRODUCT_MOCK } from 'mocks/products';
import { SHOPS_MOCK } from 'mocks/shops';

import { Catalog } from 'components/Catalog';
import { SliderCarousel } from 'components/SliderCarousel';
import { getShopAddress } from 'utils/getShopAddress';

import { HomePageProps } from './HomePage.types';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const MIN_SHOWN_STORES = 2;

export const HomePage: React.FC<HomePageProps> = () => {
    const navigate = useNavigate();
    const [shownStores, setShownStores] = useState(SHOPS_MOCK.slice(0, MIN_SHOWN_STORES));
    return (
        <div className={cx('home-page', 'page')}>
            {shownStores.map((item, i) => (
                <React.Fragment key={item.id}>
                    <Button variant="text" onClick={() => navigate(`/shop/${item.id ?? ''}`)}>
                        <h2>{getShopAddress(item.address)}</h2>
                    </Button>
                    <SliderCarousel
                        onItemClick={(item) => navigate(`/product-details/${item.id ?? ''}`)}
                        items={PRODUCT_MOCK}
                        key={i}
                    />
                </React.Fragment>
            ))}
            {shownStores.length < SHOPS_MOCK.length && (
                <Button onClick={() => setShownStores(SHOPS_MOCK)}>Показать больше магазинов</Button>
            )}
            <Typography variant="h4">Все товары</Typography>
            <Catalog
                items={[...PRODUCT_MOCK, ...PRODUCT_MOCK]}
                onItemClick={(item) => navigate(`/product-details/${item.id ?? ''}`)}
            />
        </div>
    );
};
