import axios from 'axios';
import config from '../Components/config.json'
import {toast} from "react-toastify";

axios.defaults.baseURL = config.api;

const setBearer = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

axios.interceptors.response.use((res) => res, function (error) {
    const expectedErrors =
        error &&
        error.response.data.statusCode >= 400 &&
        error.response.data.statusCode < 500;
    if (!expectedErrors) {
        toast.error(`Something was wrong. Try it later. Error HTTP: ${error.response.data.statusCode}`)
    }
    return Promise.reject(error)
})

const getToken = async () => {
    try {
        const result = await axios.get('/auth/anonymous?platform=subscriptions');
        setBearer(result.data.token);
    } catch (error) {
        toast.error(`Something was wrong. Try it later.`)
    }
};

const getCourses = async () => {
    try {
        await getToken();
        const result = await axios.get('/core/preview-courses');
        return result.data;
    } catch (error) {
        toast.error(`Expected error! Error HTTP: ${error.response.data.statusCode}`)
    }
};

const getById = async (id) => {
    try {
        await getToken();
        const result = await axios.get(`/core/preview-courses/${id}`);
        return result.data;
    } catch (error) {
        toast.error(`Expected error! Error HTTP: ${error.response.data.statusCode}`)
    }
};

export {getCourses, getById};