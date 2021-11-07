import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://freecurrencyapi.net/api/v2/',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(config => {
    config.params.apikey = process.env.REACT_APP_API_KEY;
    return config;
})

export interface ICurrencyData {
    query: {
        base_currency: string;
        timestamp: number;
    },
    data: {
        [key: string]: number;
    }
}

interface ICurrencyApi {
    getLatest: (baseCurrency: string) => Promise<ICurrencyData>;
}

export const api: ICurrencyApi = {
    async getLatest (baseCurrency: string) {
        try {
            const response = await axiosInstance.get('/latest', {
                params: {
                    base_currency: baseCurrency
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
