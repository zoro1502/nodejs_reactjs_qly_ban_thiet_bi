// @ts-nocheck
import { toggleShowLoading } from "../redux/actions/common";
import { getMethod} from "./apiService";
import { buildFilter, timeDelay } from "./common";

export const DASHBOARD_SERVICE = {
	getByFilter: async (params, setData, dispatch) => {
		try {
			let filters = buildFilter(params);
			dispatch(toggleShowLoading(true))
			const response = await getMethod('/admin/statistical', filters);
			await timeDelay(2000);
			if (response?.status === 'success') {
				setData(response?.data);
	
			} else {
				setData(null);
			}
			dispatch(toggleShowLoading(false))
		} catch (error) {
			console.log(error);
			setData(null);
			dispatch(toggleShowLoading(false))
	
		}
	}
}