import axios, { AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';
import history from '@/utils/history'

const service = axios.create();

service.interceptors.request.use((config) => {
    const BearerToken = localStorage.getItem('token');
    if (BearerToken) {
        config.headers.Authorization = `Bearer ${BearerToken}`;
    }
    return config;
}, (err: AxiosError) => {
    return Promise.reject(err);
});

service.interceptors.response.use((res: AxiosResponse) => {
    return res.data;
}, (err: AxiosError) => {
    if (err.status === 401) {
        history.push('/login');
    }
    message.error(err.message);
    return Promise.reject(err);
});

export default service;