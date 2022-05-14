/* eslint-disable */
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {},
});
let axiosCredentialInterceptorsId: number;

export const updateAxiosClientCredential = (accessToken?: string) => {
    try {
        instance.interceptors.request.eject(axiosCredentialInterceptorsId);
    } catch (error) {
        console.error('at axios in updateAxiosClientCredential', error);
    }

    axiosCredentialInterceptorsId = instance.interceptors.request.use((config) => {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    });
};

instance.interceptors.response.use((res) => {
    const { access_token: accessToken } = res.data;
    if (accessToken) {
        updateAxiosClientCredential(accessToken);
    }
    return res;
});

export default instance;
