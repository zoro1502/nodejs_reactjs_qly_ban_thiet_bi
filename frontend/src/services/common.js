export const getItem = ( key ) =>
{
	return localStorage.getItem( key ) || null;
}

export const setItem = ( key, value ) =>
{
	localStorage.setItem( key, value );
}

export const removeItem = ( key ) =>
{
	localStorage.removeItem( key );
}

export const buildFilter = ( values ) =>
{
	delete values.total;
	delete values.total_page;
	let params = {};
	if ( values )
	{
		let arrCondition = Object.entries( values );

		params = arrCondition.reduce( ( param, item ) =>
		{
			if ( item[ 1 ] != null )
			{
				param = { ...param, ...buildItemParam( item[ 0 ], item[ 1 ], param ) }
			}
			return param;
		}, {} );
	}
	return params;
}

export const buildItemParam = ( key, value, params ) =>
{
	if ( key == 'page' && !value )
	{
		params[ 'page' ] = value;
	} else if ( value )
	{
		params[ `${ key }` ] = value;
	}
	return params;
}

export const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
		regexp: '${label} is invalid!'
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

export const resetForm = ( form ) =>
{
	form.resetFields();
}

export const onFieldsChange = ( e, form, ee = null ) =>
{
	if ( e.length > 0 )
	{
		let value = typeof e[ 0 ].value === 'string' ? e[ 0 ].value : e[ 0 ].value;
		if ( e[ 0 ].name[ 0 ] === 'name' && value != '' )
		{
			// let slug = toSlug( value );
			form.setFieldsValue( { slug: value } );
		}
		let fieldValue = {
			[ String( e[ 0 ].name[ 0 ] ) ]: value
		}
		form.setFieldsValue( fieldValue );
	}
}