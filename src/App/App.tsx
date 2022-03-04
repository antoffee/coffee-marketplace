import React from 'react';
import { Logo } from 'assets';
import cnBind, { Argument } from 'classnames/bind';

import { Counter } from 'components/Counter';

import styles from './App.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    return (
        <div className={cx('App')}>
            <header className={cx('App-header')}>
                <Logo className={cx('App-logo')} />
                <Counter title="Counter" />
            </header>
        </div>
    );
};
