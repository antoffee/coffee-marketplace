import React from 'react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store';
import { decrement, increment } from 'store/actions/counter';

import { ICounterProps } from './Counter.types';

import styles from './Counter.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Counter: React.FC<ICounterProps> = ({ title }) => {
    const value = useAppSelector((state) => state.counter.value);

    const dispatch = useAppDispatch();

    return (
        <div className={cx('container')}>
            <h1>{title}</h1>
            <h2>test</h2>
            <div className={cx('counter')}>
                <button className={cx('control')} onClick={() => dispatch(decrement())}>
                    Dec
                </button>
                <h2>{value}</h2>
                <button className={cx('control')} onClick={() => dispatch(increment())}>
                    Inc
                </button>
            </div>
        </div>
    );
};
