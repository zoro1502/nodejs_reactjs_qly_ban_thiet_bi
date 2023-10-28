// @ts-nocheck
import { Form, Input, Select, Switch,message } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from 'react';
import Widget from '../../Widget/Widget';
import { useForm } from 'antd/lib/form/Form';
import { toSlug } from '../../../helpers/common/common';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ROLE_SERVICE, getPermissions, submitFormData } from '../../../services/rolePermissionService';
import { RESPONSE_API, VALIDATE_FORM } from '../../../services/common';
export const RoleForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ permissions, setPermissions ] = useState( [] );
	const [ data, setData ] = useState( null );
	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();
	const [ id, setId ] = useState( null );

	useEffect( () =>
	{
		getListPermissions();
	}, [] );

	useEffect( () =>
	{
		if ( params.id )
		{
			setId( Number( params.id ) );
			getData( Number( params.id ) );
		}
	}, [ params.id ] );


	useEffect( () =>
	{
		if ( data )
		{
			let permission = data.permissions.reduce( (per, item) =>
			{
				if ( item )
				{
					per.push(item.id);
				}
				return per;
			}, [] );
			let formValue = {
				name: data.name,
				guard_name: data.guard_name,
				description: data.description,
				permissions: permission,
			};
			form.setFieldsValue( formValue )
		}
	}, [ data ] );

	const getListPermissions = async () =>
	{
		const result = await getPermissions( { page: 1, page_size: 100 });
		if ( result )
		{
			let permissionList = result.permissions.reduce( ( newPer, item ) =>
			{
				if ( item )
				{
					newPer.push( {
						value: item.id,
						label: item.guard_name
					} )
				}
				return newPer;
			}, [] );
			setPermissions( permissionList );
		}
	}
	

	const getData = async ( id ) =>
	{
		const rs = await ROLE_SERVICE.showData( id, dispatch );
		if ( rs )
		{
			setData( rs );
		} else
		{
			setData( null );
		}
	}

	const submitForm = async ( e ) =>
	{
		const response = await submitFormData( id, e, dispatch, history );
		await RESPONSE_API(response, message, id, history, 'setting/role');
	}

	const resetForm = () =>
	{
		form.resetFields();
	}

	const onFieldsChange = ( e ) =>
	{
		if ( e.length > 0 )
		{
			let value = typeof e[ 0 ].value == 'string' ? e[ 0 ].value : e[ 0 ].value;
			if ( e[ 0 ].name[ 0 ] === 'name' && value != '' )
			{
				let guard_name = toSlug( value, '_' ).replace(/[0-9]/g, '');

				form.setFieldsValue( { guard_name: guard_name.toUpperCase() } );
			}
			let fieldValue = {
				[ String( e[ 0 ].name[ 0 ] ) ]: value
			}
			form.setFieldsValue( fieldValue );
		}
	}

	return (
		<div className="w-75 mx-auto">
			<Widget>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ onFieldsChange }
					validateMessages={ VALIDATE_FORM }
				>
					<div className='mb-3'>

						<Form.Item name="name" label="Name"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter name' />
						</Form.Item>
						<Form.Item name="guard_name" label="Guard name"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter guard name' />
						</Form.Item>
						<Form.Item name="description" label="Description"
							className=' d-block'>
							<Input.TextArea className='form-control' placeholder='Enter description' cols={12} rows={4} />
						</Form.Item>

						<Form.Item name="permissions" label="Permissions"
							rules={ [ { required: true } ] } className='d-block'>
							<Select
								placeholder="Select permission"
								showSearch
								mode="multiple"
								filterOption={ ( input, option ) => ( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }

								style={ { width: '100%' } }
								options={ permissions }
							/>
						</Form.Item>
					</div>

					<div className='d-flex justify-content-center'>
						<button type="submit" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
							{ !id && 'Create' || 'Update' }
						</button>

						{ !id && <button type="button" className="btn btn-secondary text-center" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ resetForm }>
							Reset
						</button> }
					</div>
				</Form>
			</Widget >
		</div>

	)
}