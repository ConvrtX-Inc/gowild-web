import axios, { AxiosResponse } from 'axios';

const accessToken = sessionStorage.getItem('token');
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const USERS_URL = `${BASE_URL}/users`;
const STATUS_URL = `${BASE_URL}/statuses`;
const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
};

export const getAllUsers = async (): Promise<AxiosResponse> => {
  return axios.get(`${USERS_URL}?sort=created_date,ASC`, CONFIG);
};

export const getUsersByPage = async (limit: number, page: number): Promise<AxiosResponse> => {
  return axios.get(`${USERS_URL}?sort=updated_date,ASC&limit=${limit}&page=${page}`, CONFIG);
};

export const getStatusById = async (id: string): Promise<AxiosResponse> => {
  return axios.get(`${STATUS_URL}/${id}`, CONFIG);
};
