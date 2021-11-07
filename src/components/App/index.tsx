import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styles from './index.module.scss';
import Converter from '../Converter';
import {Link, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import ExchangeRates from "../ExchangeRates";
import {Menu, MenuItem} from "semantic-ui-react";

const App = () => {
    const location = useLocation();

    return (
        <div className={styles.main}>
            <Menu
                size={'large'}
                fixed={'top'}
                className={styles.header}>
                <MenuItem
                    active={'/' === location.pathname}
                    as={Link}
                    to={'/'}>
                    Converter
                </MenuItem>
                <MenuItem
                    as={Link}
                    active={'/rates' === location.pathname}
                    to={'/rates'}>
                    Exchange rates
                </MenuItem>
            </Menu>
            <Routes>
                <Route index element={<Converter />}/>
                <Route path={'rates'} element={<ExchangeRates />} />
                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Routes>
        </div>
    );
};

export default App;
