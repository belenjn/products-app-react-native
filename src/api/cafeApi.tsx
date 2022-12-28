/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const baseURL: string = ' http://192.168.5.171:8080/api';

const cafeApi = axios.create({baseURL});

export default cafeApi;
