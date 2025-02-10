import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';


const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const login = async (name: string, email: string) => {
  const response = await apiClient.post('/auth/login', { name, email });
  return response.data;
};


export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};


export const fetchBreeds = async () => {
  const response = await apiClient.get('/dogs/breeds');
  return response.data;
};


export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}

export const searchDogs = async (params: DogSearchParams) => {
  const response = await apiClient.get('/dogs/search', { params });
  return response.data;
};


export const fetchDogs = async (dogIds: string[]) => {
  const response = await apiClient.post('/dogs', dogIds);
  return response.data;
};


export const matchDogs = async (dogIds: string[]) => {
  const response = await apiClient.post('/dogs/match', dogIds);
  return response.data;
};
