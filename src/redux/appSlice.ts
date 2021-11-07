import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, ICurrencyData} from "../api";
import {RootState, AppDispatch} from './store';
import localeCurrency from "locale-currency";

interface IConverterSlice {
    amount: string;
    loading: boolean;
    error: string | null;
    targetCurrency: string;
    data: ICurrencyData | null;
}

const initialState: IConverterSlice = {
    amount: '10.23',
    loading: false,
    error: null,
    targetCurrency: localeCurrency.getCurrency(window.navigator.language) === 'USD' ? 'RUB' : 'USD',
    data: null,
}

export const fetchBaseCurrency = createAsyncThunk<ICurrencyData, string, {state: RootState, dispatch: AppDispatch}>(
    'app/fetchBaseCurrency',
    async (arg) => {
        const data = await api.getLatest(arg);
        data.data[arg] = 1;
        return data;
    }
);

export const switchCurrencies = createAsyncThunk<unknown, void, {state: RootState, dispatch: AppDispatch}>(
    'app/fetchData',
    async (arg, {getState, dispatch}) => {
        const {targetCurrency, data} = getState().app;
        const baseCurrency = data?.query.base_currency;
        if (baseCurrency) {
            await dispatch(fetchBaseCurrency(targetCurrency));
            dispatch(setTargetCurrency(baseCurrency));
        }
    }
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTargetCurrency (state, action: PayloadAction<string>) {
            state.targetCurrency = action.payload;
        },
        setAmount (state, {payload}: PayloadAction<string>) {
            if (payload.match(/^[0-9]*[.]?[0-9]*$/g)) {
                state.amount = payload;
            }
        }
    },
        extraReducers: (builder) => {
            builder
                .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(fetchBaseCurrency.pending, state => {
                    state.loading = true;
                })
                .addCase(fetchBaseCurrency.rejected, (state, {error}) => {
                    state.loading = false;
                    state.error = error.message || 'Something went wrong :(';
                })
        }
});

export const {setTargetCurrency, setAmount} = appSlice.actions;
export default appSlice.reducer;
