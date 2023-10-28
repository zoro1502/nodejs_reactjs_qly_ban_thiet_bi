import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import
{
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../redux/actions/auth";

import loginImage from "../../assets/loginImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { VALIDATE_FORM } from "../../services/common";
import { Form, Input, message } from "antd";
import { AUTH_SERVICE } from "../../services/authService";
import { toggleShowLoading } from "../../redux/actions/common";

const Login = ( props ) =>
{

	const [ form ] = useForm();
	const dispatch = useDispatch();

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await AUTH_SERVICE.login(e, dispatch);

		if(response?.status == 'success') {
			localStorage.setItem('access_token', response.data?.token_info?.access_token);
			localStorage.setItem('full_name', response.data?.user?.name);
			localStorage.setItem('email', response.data?.user?.email);
			localStorage.setItem('avatar', response.data?.user?.avatar);
			window.location.href = '/';
		} else {
			message.error(response?.message || 'error');
		}
		dispatch( toggleShowLoading( false ) );
	}

	return (
		<div className="auth-page">
			<Container className="col-12">
				<Row className="d-flex align-items-center" style={ { background: "#F7F8FB" } }>
					<Col xs={ 12 } lg={ 6 } className="left-column">
						<Widget className="widget-auth widget-p-lg">
							<div className="d-flex align-items-center justify-content-between py-3">
								<p className="auth-header mb-0">Login</p>
							</div>

							<Form
								className='p-3'
								name='nest-messages form'
								form={ form }
								onFinish={ submitForm }
								validateMessages={ VALIDATE_FORM }
							>
								<div className='mb-3 form-group'>
									<Form.Item name="username" label="Email/Username"
										rules={ [ { required: true } ] }
										className=' d-block'>
										<Input className='form-control' style={{height: '40px', borderRadius: '10px'}} placeholder='Enter Email/Username' />
									</Form.Item>
									<Form.Item name="password" label="Password"
										rules={ [ { required: true } ] }
										className=' d-block'>
										<Input.Password className='form-control ' style={{height: '40px', borderRadius: '10px'}} placeholder='Enter password' />
									</Form.Item>
								</div>
								<div className="bg-widget d-flex justify-content-center">
									<Button className="rounded-pill my-3" type="submit" color="secondary-red">Login</Button>
								</div>
							</Form>
						</Widget>
					</Col>
					<Col xs={ 0 } lg={ 6 } className="right-column">
						<div>
							<img src={ loginImage } alt="Error page" />
						</div>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	)
}


Login.propTypes = {
	dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ( state )
{
	return {
		isFetching: state.auth.isFetching,
		isAuthenticated: state.auth.isAuthenticated,
		errorMessage: state.auth.errorMessage,
	};
}

export default withRouter( connect( mapStateToProps )( Login ) );
