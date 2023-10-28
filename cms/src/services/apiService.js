import { getItem, timeDelay } from './common';
import axios  from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
})

if (localStorage.getItem('access_token')) {
	axiosClient.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('access_token');
}
axiosClient.interceptors.response.use(
	(response) => {
	   // Any status code that lie within the range of 2xx cause this function to trigger
	   // Do something with response data
	   let data = response.data;
	   if ((data && data.code === 'LG0401')) {
		   localStorage.clear();
		   window.location.href = `/login`;
	   } else if(data.code === 'LG0403') {
		   window.location.href = `/login`;
	   }
	   return response.data;
   },
	(error) => {
	   console.log('error--------> ', error);
	   if (error?.response?.status === 401 && error?.response?.data?.statusCode === 401) {
		   localStorage.clear();
		   window.location.href = `/login`;
	   }

	   let dataError = error.response?.data || null;
	   if ((dataError && dataError.code === 'LG0401')) {
		   localStorage.clear();
		   window.location.href = `/login`;
	   } else if(dataError.code === 'LG0403') {
		   window.location.href = `/login`;
	   }
	   // Any status codes that falls outside the range of 2xx cause this function to trigger
	   // Do something with response error
	   return Promise.reject(error.response?.data)
   }
)


export const postMethod =  (path, data) => {
	return  axiosClient.post(`${process.env.REACT_APP_API}${path}`, data)
		.then(response => response)
		.catch(error => {
			
			return error
		});
}

export const getMethod =  async (path, params) => {
	return await axiosClient.get(`${process.env.REACT_APP_API}${path}`, { params: params})
		.then(response => {
			return response;
		})
		
}

export const putMethod =  (path, data) => {
	return  axiosClient.put(`${process.env.REACT_APP_API}${path}`, data)
		.then(response => response)
		
}

export const deleteMethod =  (path) => {
	return  axiosClient.delete(`${process.env.REACT_APP_API}${path}`)
		.then(response => response)
		.catch(error => {
			let dataError = error?.response?.data || null;
			if(dataError) {
				if(dataError.code === 'LG0401') {
					window.location.href = '/login';
				}
				if(dataError.code === 'LG0403') {
					window.location.href = '/403';
				}
			}
			return dataError || {message: 'Error'};
		});
}