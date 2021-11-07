import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styles from './index.module.scss';
import Converter from '../Converter';
import {Navigate, Route, Routes} from 'react-router-dom';
import ExchangeRates from "../ExchangeRates";

const App = () => {
    return (
        <div className={styles.main}>
            <Routes>
                <Route index element={<Converter />}/>
                <Route path={'rates'} element={<ExchangeRates />} />
                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Routes>
        </div>
    );
};

export default App;
