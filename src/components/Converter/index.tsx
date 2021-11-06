import React from 'react';
import {Button, Container, Dropdown, Icon, Input} from "semantic-ui-react";
import styles from './index.module.scss';

const currencyOptions: any = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
]

const Converter = () => {
    return (
        <section className={styles.main}>
            <Container as={'h1'} textAlign={'center'}>
                Currency converter
            </Container>
            <Input
                icon={'money'}
                label={'Amount'}
                fluid/>
            <Dropdown
                additionLabel={'add'}
                clearable
                label={'From'}
                placeholder='Select currency'
                fluid
                search
                selection
                options={currencyOptions}
            />
            <Button>
                <Icon name={'arrow up'} />
                <Icon name={'arrow down'} />
            </Button>
            <Dropdown
                clearable
                label={'From'}
                placeholder={'Select currency'}
                fluid
                search
                selection
                options={currencyOptions}
            />
            <Input label='Total' disabled/>
        </section>
    );
};

export default Converter;
