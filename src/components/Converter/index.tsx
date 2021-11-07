import React, {ChangeEvent, useMemo} from 'react';
import {Button, Container, Dropdown, Icon, Input, Label} from 'semantic-ui-react';
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setAmount, fetchBaseCurrency, setTargetCurrency, switchCurrencies} from '../../redux/appSlice';
import AppContainer from "../AppContainer";

const Converter = () => {
    const dispatch = useAppDispatch();
    const {amount, data, loading, error, targetCurrency} = useAppSelector(state => state.app);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setAmount(e.target.value));
    }
    const options = useMemo(() => {
        if (data?.data) {
            return Object.keys(data.data).map((currency, index) => ({
                key: currency,
                value: currency,
                text: currency,
            }))
        } else {
            return [];
        }
    }, [data]);

    return (
        <AppContainer className={styles.main}>
            <Container as={'h1'} textAlign={'center'}>
                Currency converter
            </Container>
            <Input
                value={amount}
                onChange={inputHandler}
                icon={'money'}
                label={'Amount'}
                fluid/>
            <Dropdown
                placeholder={'Select base currency'}
                fluid
                search
                selection
                value={data?.query.base_currency}
                options={options}
                disabled={loading}
                onChange={(e, {value}) => dispatch(fetchBaseCurrency(value as string))}
            >
            </Dropdown>
            <Button onClick={() => dispatch(switchCurrencies())}>
                <Icon name={'arrow up'} />
                <Icon name={'arrow down'} />
            </Button>
            <Dropdown
                placeholder={'Select target currency'}
                fluid
                search
                selection
                value={targetCurrency}
                options={options}
                disabled={loading}
                onChange={(e, {value}) => dispatch(setTargetCurrency(value as string))}
            />
            <Label size={'big'} color={'teal'}>
                {'Total: '}
                {
                    data?.data[targetCurrency] && amount ? ((data?.data[targetCurrency]) * parseFloat(amount)).toFixed(2) : ''
                }
            </Label>
        </AppContainer>
    );
};

export default Converter;
