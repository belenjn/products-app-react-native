/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL: string = 'http://192.168.5.171:8080/api';

const cafeApi = axios.create({baseURL});

//middelware

cafeApi.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default cafeApi;
