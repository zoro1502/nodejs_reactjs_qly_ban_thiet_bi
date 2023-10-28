import defaultUser from '../assets/img/default-avatar.png';

export const DEFAULT_IMG = defaultUser;
export const WEB_VALUE = {
	API: `${process.env.REACT_APP_API}`,
	PUBLIC_URL: `${process.env.REACT_APP_PUBLIC_URL}`
}

export const timeDelay = async (delay) => {
	return new Promise(res => setTimeout(res, delay))
}

export const REGEX_EMAIL = /^[a-z][a-z0-9_\.]{0,31}[a-z0-9]{0,}@[a-z0-9\-]{2,}(\.[a-z0-9\-]{2,}){1,4}$/;
export const REGEX_PHONE = /^[0-9]+$/;
