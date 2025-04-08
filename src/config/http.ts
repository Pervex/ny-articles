import axios, { AxiosInstance } from 'axios';
import { showToast } from '../providers/ToastProvider';
import { API_TIME_OUT } from '../utils/constants';

const http = () => {
  const headers = { 'Content-Type': 'application/json' };
  const getAxiosInstance: AxiosInstance = axios.create({
    timeout: API_TIME_OUT,
    headers,
  });
  getAxiosInstance.interceptors.response.use((response) => response, (errors) => {
    showToast(errors?.message || 'An error occurred while fetching the articles!');
    throw new Error(errors?.message || 'An error occurred while fetching the articles!');
  });

  return getAxiosInstance;
};

export default http;
