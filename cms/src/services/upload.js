import axios  from 'axios';
import { message } from 'antd';


export const postImage =  (path, data) => {

	return  axios.post(`${process.env.REACT_APP_API}${path}`, data, {headers: { 'Accept': 'multipart/form-data' }})
		.then(response => response.data)
		.catch(error => {
			return error
		});
}

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append( 'file', file);

	return await postImage('upload/image', formData);
}