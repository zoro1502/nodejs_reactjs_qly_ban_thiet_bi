import * as moment from 'moment';
export const customNumber = ( number, formatValue, type ) =>
{
	return number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, formatValue ) + type;
}

export const customDate = ( date, formatValue ) =>
{
	return moment( date ).format( formatValue );
}

export const toSlug = ( str, space = '-' ) =>
{
	// Chuyển hết sang chữ thường
	if ( str )
	{
		str = str.toLowerCase();

		// xóa dấu
		str = str
			.normalize( 'NFD' ) // chuyển chuỗi sang unicode tổ hợp
			.replace( /[\u0300-\u036f]/g, '' ); // xóa các ký tự dấu sau khi tách tổ hợp

		// Thay ký tự đĐ
		str = str.replace( /[đĐ]/g, 'd' );

		// Xóa ký tự đặc biệt
		str = str.replace( /([^0-9a-z-\s])/g, '' );

		// Xóa khoảng trắng thay bằng ký tự -
		str = str.replace( /(\s+)/g, space );

		// Xóa ký tự - liên tiếp
		str = str.replace( /-+/g, space );

		// xóa phần dư - ở đầu & cuối
		str = str.replace( /^-+|-+$/g, '' );
	}


	// return
	return str;
}