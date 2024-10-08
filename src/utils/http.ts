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
}, (err: AxiosError<{ message: string }>) => {
    if (err.status === 401 && history.location.pathname !== '/login') {
        history.push('/login');
    }
    message.error(err.response?.data?.message || '请求失败');
    return Promise.reject(err);
});

export default service;