import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import styles from './index.module.scss';
import Converter from '../Converter';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import ExchangeRates from "../ExchangeRates";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchData, setBaseCurrency, setTargetCurrency} from "../../redux/appSlice";
import localeCurrency from 'locale-currency';

const App = () => {
    const data = useAppSelector(state => state.app.data);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // console.log(localeCurrency.getLocales());
        dispatch(fetchData());
    }, []);

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
