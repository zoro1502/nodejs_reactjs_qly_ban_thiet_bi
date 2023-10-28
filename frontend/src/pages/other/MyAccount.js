// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "antd/es/form/Form";
import { Auth_Service } from "../../services/shop/auth-service";
import { Form, Input, Select, Upload, message } from "antd";
import { onFieldsChange, uploadFile, validateMessages } from "../../services";
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { DEFAULT_IMG, timeDelay } from "../../helpers/constant";

const MyAccount = ( { location } ) =>
{
	const { pathname } = location;

	const [ files, setFiles ] = useState( [] );
	const [ form ] = useForm();
	const [ formPassword ] = useForm();
	const [ error, setError ] = useState( false );
	const dispatch = useDispatch();
	const [ user, setUser ] = useState( null );

	const [ genderConfig, setGenderConfig ] = useState( [
		{
			value: 'male',
			label: 'Male'
		},
		{
			value: 'female',
			label: 'Female'
		},
		{
			value: 'other',
			label: 'Other'
		}
	] );

	useEffect( () =>
	{

		profile();
		formPassword.setFieldValue( {
			password: null,
			retypeNewPassword: null
		} )
	}, [] );

	const profile = async () =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await Auth_Service.profile();

		if ( response.status == 'success' )
		{
			let file = [];
			file.push( {
				uid: file.length,
				name: response.data.avatar,
				status: 'done',
				url: response.data?.avatar || DEFAULT_IMG,
				default: true
			} );
			form.setFieldsValue( {
				name: response.data.name,
				email: response.data.email,
				phone: response.data.phone,
				gender: response.data.gender,
				birthDay: response.data.birthDay,
				image: file,
			} );
			setFiles( file );
			setUser( response.data )

		} else
		{
			message.error( response.message || 'error' );
		}
		dispatch( toggleShowLoading( false ) );
	}

	const submitForm = async ( e ) =>
	{
		let avatar = user.avatar;
		console.log(files);
		if ( !files[ 0 ].default )
		{
			const rs = await uploadFile( files[ 0 ] );
			if ( rs?.status === 'success' )
			{
				avatar = rs.data.destination;
			}
		}
		let formData = {...e, avatar: avatar};
		delete formData.image;
		const response = await Auth_Service.updateProfile( formData );
		if ( response.status == 'success' )
		{
			message.success( 'Update profile successfully!' );
		} else
		{
			message.error( response.message || 'error' );
		}
	}

	const checkPassword = ( newPass, retypePass ) =>
	{
		return newPass === retypePass;
	}

	const submitPassword = async ( e ) =>
	{
		dispatch(toggleShowLoading(true));
		if ( checkPassword( e.password, e.retypeNewPassword ) )
		{
			const response = await Auth_Service.updateProfile( { password: e.password } );
			if ( response.status == 'success' )
			{
				message.success( 'Change password successfully!' );
			} else
			{
				message.error( response.message || 'error' );
			}
		} else
		{
			setError( true );
			message.error( 'Password does not match!' );
		}
		dispatch(toggleShowLoading(false));

	}

	const normFile = ( e ) =>
	{
		if ( e?.fileList )
		{
			let fileChoose = e?.fileList.map( item => item.originFileObj );
			setFiles( fileChoose );
		}
		return e?.fileList;
	}

	return (
		<Fragment>
			<MetaTags>
				<title>Cake Shop | My Account</title>
				<meta
					name="description"
					content="Compare page of flone react minimalist eCommerce template."
				/>
			</MetaTags>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + "/" }>Home</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + pathname }>
				My Account
			</BreadcrumbsItem>
			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />
				<div className="myaccount-area pb-80 pt-100">
					<div className="container">
						<div className="row">
							<div className="ml-auto mr-auto col-lg-9">
								<div className="myaccount-wrapper">
									<Accordion defaultActiveKey="0">
										<Card className="single-my-account mb-20">
											<Card.Header className="panel-heading">
												<Accordion.Toggle variant="link" eventKey="0">
													<h3 className="panel-title">
														<span>1 .</span> Edit your account information{ " " }
													</h3>
												</Accordion.Toggle>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<div className="myaccount-info-wrapper">
														<div className="account-info-wrapper">
															<h4>My Account Information</h4>
															<h5>Your Personal Details</h5>
														</div>
														<Form form={ form }
															onFinish={ submitForm }
															onFieldsChange={ ( e ) => onFieldsChange( e, form ) }
															validateMessages={ validateMessages }
														>
															<div className="row mb-3">
																<div className="col-md-9">
																	<Form.Item name="name"
																		rules={ [ { required: true } ] }
																		className=' d-block'
																		label='Name'
																	>
																		<Input className='form-control mb-0' placeholder='Enter name' />
																	</Form.Item>

																	<Form.Item name="email"
																		rules={ [ { required: true } ] }
																		className=' d-block'
																		label='Email'
																	>
																		<Input className='form-control mb-0' placeholder='Enter email' />
																	</Form.Item>
																</div>
																<div className="col-md-3 h-100">
																	<Form.Item
																		label="Avatar"
																		name="image"
																		accept="images/**"
																		className='d-block'
																		valuePropName="fileList"
																		fileList={ files }
																		getValueFromEvent={ normFile }
																	>
																		<Upload action="/upload" className="w-100" listType="picture-card">
																			{ files.length < 1 && <div>
																				<PlusOutlined />
																				<div style={ { marginTop: 8 } }>Upload</div>
																			</div> }
																		</Upload>
																	</Form.Item>
																</div>
															</div>
															<div className="row mb-3">
																<div className="col-6">
																	<Form.Item name="phone"
																		rules={ [ { required: true } ] }
																		className=' d-block'
																		label='Phone'
																	>
																		<Input className='form-control mb-0' placeholder='Enter phone' />
																	</Form.Item>
																</div>
																<div className="col-3">
																	<Form.Item
																		name="gender"
																		label="Gender"
																		rules={ [ { required: true } ] }
																		className='d-block'
																	>
																		<Select
																			placeholder="Select gender"
																			style={ { width: '100%' } }
																			options={ genderConfig }
																		/>
																	</Form.Item>
																</div>
																<div className='col-3'>
																	<Form.Item name="birthDay" label="Birthday"
																		className='d-block'>
																		<Input type='date' className='form-control' placeholder='Enter birthday' />
																	</Form.Item>
																</div>
															</div>
															<div className="billing-back-btn">
																<div className="billing-btn">
																	<button type="submit">Continue</button>
																</div>
															</div>
														</Form>

													</div>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
										<Card className="single-my-account mb-20">
											<Card.Header className="panel-heading">
												<Accordion.Toggle variant="link" eventKey="1">
													<h3 className="panel-title">
														<span>2 .</span> Change your password
													</h3>
												</Accordion.Toggle>
											</Card.Header>
											<Accordion.Collapse eventKey="1">
												<Card.Body>
													<div className="myaccount-info-wrapper">
														<div className="account-info-wrapper">
															<h4>Change Password</h4>
															<h5>Your Password</h5>
														</div>
														<Form
															form={ formPassword }
															onFinish={ submitPassword }
															onFieldsChange={ ( e ) => onFieldsChange( e, formPassword ) }
															validateMessages={ validateMessages }
														>
															<div className="row">
																<div className="col-6">
																	<Form.Item name="password"
																		rules={ [ { required: true } ] }
																		className=' d-block'
																		label="New password"
																	>
																		<Input type="password" className='form-control mb-0' placeholder='Enter new password' />
																	</Form.Item>
																</div>
																<div className="col-6">
																	<Form.Item name="retypeNewPassword"
																		rules={ [ { required: true } ] }
																		className="d-block"
																		label="Confirm new password"
																	>
																		<Input type="password" className={ `form-control mb-0 ${ error == true ? "borderError" : "" }` } placeholder='Re-enter new password' onChange={ () => setError( false ) } />
																	</Form.Item>
																</div>
															</div>
															<div className="billing-back-btn">
																<div className="billing-btn">
																	<button type="submit">Continue</button>
																</div>
															</div>
														</Form>
													</div>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	);
};

MyAccount.propTypes = {
	location: PropTypes.object
};

export default MyAccount;
