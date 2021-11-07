import React from 'react';
import {useAppSelector} from "../../redux/store";
import styles from './index.module.scss';
import {Container, Dimmer, List, Loader, Segment} from "semantic-ui-react";
import CurrencyFlagImage from "react-currency-flags";
import AppContainer from "../AppContainer";

const ExchangeRates = () => {
    const {data} = useAppSelector(state => state.app);

    return (
        <AppContainer className={styles.main}>
            <Container as={'h1'} textAlign={'center'}>
                Exchange rates
            </Container>
            {

            }
            <Container textAlign={'center'}>Base currency: {data?.query.base_currency}</Container>
            <Segment as={List} animated size={'large'} divided relaxed className={styles.list}>
                {
                    data ? Object.keys(data.data).map(currency =>
                        <List.Item key={currency}>
                            <List.Content floated={'right'}>{data.data[currency]}</List.Content>
                            <List.Icon verticalAlign={"middle"}><CurrencyFlagImage currency={currency} /></List.Icon>
                            <List.Content>{currency}</List.Content>
                        </List.Item>)
                        :
                        <Dimmer active inverted fixed>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                }

            </Segment>
        </AppContainer>
    );
};

export default ExchangeRates;
