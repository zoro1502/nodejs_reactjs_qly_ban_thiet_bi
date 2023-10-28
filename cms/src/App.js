// @ts-nocheck
// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// -- Redux Actions
import { logoutUser } from "../src/redux/actions/auth";

// -- Third Party Libs

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";
import 'antd/dist/antd.css'
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Layout/Loading";

// const PrivateRoute = ( { dispatch, component, ...rest } ) =>
// {
// 	if ( !isAuthenticated( JSON.parse( localStorage.getItem( "authenticated" ) ) ) )
// 	{
// 		dispatch( logoutUser() );
// 		return ( <Redirect to="/login" /> )
// 	} else
// 	{
// 		return (
// 			<Route { ...rest } render={ props => ( React.createElement( component, props ) ) } />
// 		);
// 	}
// };

const App = ( props ) =>
{
	return (
		<BrowserRouter>
			<Loading />
			<Switch>
				<Route path="/login" exact component={ Login } />
				<Route path="/error" exact component={ ErrorPage } />
				{/* <Route path="/register" exact component={ Register } /> */}
				<Route path="/" exact render={ () => <Redirect to="/dashboard" /> } />
				<Route path="/product" exact render={ () => <Redirect to="/product/list" /> } />
				<Route path="/user" exact render={ () => <Redirect to="/user/list" /> } />
				<Route path="/category" exact render={ () => <Redirect to="/category/list" /> } />
				<Route path="/order" exact render={ () => <Redirect to="/order/list" /> } />
				<Route path="/" render={ ( props ) => <Layout { ...props } /> } />
				<Route path='**' exact={ true } component={ ErrorPage } />
			</Switch>
		</BrowserRouter>
	);
}

const mapStateToProps = state => ( {
	isAuthenticated: state.auth.isAuthenticated,
} );

export default connect( mapStateToProps )( App );
