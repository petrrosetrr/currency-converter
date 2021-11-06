import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, ICurrencyData} from "../api";
import {RootState} from "./store";
import {AxiosError} from "axios";
import localeCurrency from "locale-currency";

interface IConverterSlice {
    amount: number;
    loading: boolean;
    error: string | undefined;
    base: string;
    target: string;
    data: ICurrencyData | undefined;
}

const initialState: IConverterSlice = {
    amount: 10,
    loading: false,
    error: undefined,
    base: localeCurrency.getCurrency(window.navigator.language),
    target: localeCurrency.getCurrency(window.navigator.language) === 'USD' ? 'RUB' : 'USD',
    data: undefined,
}

export const fetchData = createAsyncThunk<ICurrencyData, void, {state: RootState, rejectValue: AxiosError}>(
    'app/fetchData',
    async (arg, {getState}) => {
        return await api.getLatest(getState().app.base);
    }
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBaseCurrency (state, action: PayloadAction<string>) {
            state.base = action.payload;
        },
        setTargetCurrency (state, action: PayloadAction<string>) {
            state.target = action.payload;
        },
        setData (state, action: PayloadAction<ICurrencyData>) {
            state.data = action.payload;
        }
    },
        extraReducers: (builder) => {
            builder
                .addCase(fetchData.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
                })
                .addCase(fetchData.pending, state => {
                    state.loading = true;
                    state.error = undefined;
                })
                .addCase(fetchData.rejected, (state, action) => {
                    state.loading = false;
                    console.log(action);
                })
        }
});

export const {setBaseCurrency, setTargetCurrency, setData} = appSlice.actions;
export default appSlice.reducer;
