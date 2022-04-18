import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import cnBind, { Argument } from 'classnames/bind';
import { Product } from 'types/product';

import { SliderCarouselProps } from './SliderCarousel.types';

import styles from './SliderCarousel.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

type CarouselItemProps = Product & { onClick: () => void };

const Item = ({ name: title, description, photo: imgUrl, onClick }: CarouselItemProps) => {
    return (
        <Card onClick={onClick} elevation={0} variant="outlined" className={cx('slider-carousel-item')}>
            <CardMedia
                component={'img'}
                image={imgUrl ?? 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'}
            />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export const SliderCarousel: React.FC<SliderCarouselProps> = ({ items, onItemClick }) => {
    return (
        <Carousel
            cycleNavigation={false}
            navButtonsAlwaysVisible
            autoPlay={false}
            className={cx('slider-carousel')}
            indicators
        >
            {items.map((item, i) => (
                <Item key={i} {...item} onClick={() => onItemClick(item)} />
            ))}
        </Carousel>
    );
};