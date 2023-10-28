// @ts-nocheck
import axios from 'axios'
import { WEB_VALUE, timeDelay } from '../helpers/constant';

const axiosClient = axios.create({
	baseURL: WEB_VALUE.API,
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(),
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
		   window.location.href = `/auth`;
	   } else if(data.code === 'LG0403') {
		   window.location.href = `/auth`;
	   }
	   return response.data;
   },
	(error) => {
	   console.log('error--------> ', error);
	   if (error?.response?.status === 401 && error?.response?.data?.statusCode === 401) {
		   localStorage.clear();
		   window.location.href = `/auth`;
	   }

	   let dataError = error.response?.data || null;
	   if ((dataError && dataError.code === 'LG0401')) {
		   localStorage.clear();
		   window.location.href = `/auth`;
	   } else if(dataError.code === 'LG0403') {
		   window.location.href = `/auth`;
	   }
	   // Any status codes that falls outside the range of 2xx cause this function to trigger
	   // Do something with response error
	   return Promise.reject(error.response?.data)
   }
)

export const postMethod =  async (path, data) => {
	await timeDelay(1000)
	return  await axiosClient.post(`${WEB_VALUE.API}/${path}`, data)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: error.message || 'Invalid!'
			}
		});
}

export const getMethod =  async (path, params) => {
	await timeDelay(1000)
	return await axiosClient.get(`${WEB_VALUE.API}/${path}`, {params: params})
		.then(response => {
			
			return response;
		})
		.catch(error => {
			return {
				status: 'error',
				message: error.message || 'Invalid!'
			}
		});
}

export const putMethod = async (path, data) => {
	await timeDelay(1000)
	return await axiosClient.put(`${WEB_VALUE.API}/${path}`, data)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: error.message || 'Invalid!'
			}
		});
}

export const deleteMethod = async (path) => {
	await timeDelay(1000)
	return await axiosClient.delete(`${WEB_VALUE.API}/${path}`)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: error.message || 'Invalid!'
			}
		});
}


export const postImage =  (path, data) => {

	return  axios.post(`${WEB_VALUE.API}/${path}`, data, {headers: { 'Accept': 'multipart/form-data' }})
		.then(response => response.data)
		.catch(error => {
		});
}

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append( 'file', file);

	return await postImage('upload/image', formData);
}