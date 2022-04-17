import React from 'react';
import { useNavigate } from 'react-router-dom';
import cnBind, { Argument } from 'classnames/bind';
import { CAROUSEL_MOCK } from 'mocks/products';
import { SHOPS_MOCK } from 'mocks/shops';

import { SliderCarousel } from 'components/SliderCarousel';

import { HomePageProps } from './HomePage.types';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const HomePage: React.FC<HomePageProps> = () => {
    const navigate = useNavigate();
    return (
        <div className={cx('home-page')}>
            {SHOPS_MOCK.map((item, i) => (
                <>
                    <h2>{item.name}</h2>
                    <SliderCarousel
                        onItemClick={(item) => navigate(`/product-details/${item.id}`)}
                        items={CAROUSEL_MOCK}
                        key={i}
                    />
                </>
            ))}
        </div>
    );
};
