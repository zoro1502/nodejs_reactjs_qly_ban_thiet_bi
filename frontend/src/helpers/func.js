export const customNumber = (number, valueCustom) => {
	// return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + valueCustom;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫';

}