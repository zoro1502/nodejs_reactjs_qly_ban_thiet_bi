import { Tab } from "react-bootstrap";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ORDER_SERVICE, onFieldsChange, validateMessages } from "../../services";
import { Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { Auth_Service } from "../../services/shop/auth-service";
import { toggleShowLoading } from "../../redux/actions/common";
import TextArea from "antd/es/input/TextArea";
import { REGEX_EMAIL, REGEX_PHONE, timeDelay } from "../../helpers/constant";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";

export const CheckoutForm = ( props ) =>
{
	const [ form ] = useForm();

	const {addToast} = useToasts();

	const dispatch = useDispatch();


	useEffect(() => {
		if(props.submit) {
			form.submit();
			props.setSubmit(false)
		}
	}, [props.submit])

	const submitForm = async ( e ) =>
	{
		dispatch(toggleShowLoading(true));
		if(props.cartItem?.length > 0) {
			let products = props.cartItem.reduce((newProd, item) => {
				newProd.push({
					quantity: item.quantity,
					id: item.id
				});
				return newProd
			}, []);
			try {
				const response = await ORDER_SERVICE.create({...e, products: products});
				await timeDelay(1000);
				if(response?.status === 'success') {
					message.success('Checkout successfully!');
					if(response?.data?.link) {
						window.open(response?.data?.link, '_blank');
					}
					dispatch(deleteAllFromCart(addToast));
				} else {
					message.error(response?.message || 'error');
				}
			} catch (error) {
				message.error(error?.message || 'error');
			}

		} 
		
		dispatch(toggleShowLoading(false));
	}

	return (
		<Form
			className='p-3'
			name='form'
			form={ form }
			onFinish={ submitForm }
			onFieldsChange={ ( e ) => onFieldsChange( e, form ) }
			validateMessages={ validateMessages }
		>
			<Form.Item name="receiver_name" label="Full Name"
				rules={ [ { required: true, } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter full name' />
			</Form.Item>

			<Form.Item name="receiver_email" label="Email"
				rules={ [ { required: true,  type:'email' } ] }
				className=' d-block'>
				<Input type="email" className=' mb-0' placeholder='Enter email' />
			</Form.Item>

			<Form.Item name="receiver_phone" label="Phone"
				rules={ [ { required: true, pattern: REGEX_PHONE } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter phone' />
			</Form.Item>

			<Form.Item name="receiver_address" label="Address"
				rules={ [ { required: true } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter address' />
			</Form.Item>

			<Form.Item name="note" label="Note"
				className=' d-block'>
				<TextArea rows={ 5 } className=' mb-0' placeholder='Enter note' />
			</Form.Item>
		</Form>
	);
}