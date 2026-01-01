// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://127.0.0.1:8000/', 
// });

// API.interceptors.request.use(config => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Django backend

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getSuperAdminDashboardData = async (accessToken) => {
  try {
    console.log('Attempting to fetch superadmin dashboard data...');
    const response = await axios.get(`${BASE_URL}/core/superadmin/dashboard/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Superadmin dashboard data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetching superadmin dashboard data failed:', error);
    throw error;
  }
};

export const getUserDashboard = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching user dashboard data failed:', error);
    throw error;
  }
};

