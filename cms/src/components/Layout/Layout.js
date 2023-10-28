// -- React and related libs
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";


// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";

// -- Component Styles
// @ts-ignore
import s from "./Layout.module.scss";
import { ROUTERS } from "../../router";
import IconsPage from "../../pages/uielements/icons/IconsPage";
import ForbiddenPage from "../../pages/error/403";

const Layout = ( props ) =>
{
	return (
		<div className={ s.root }>
			<div className={ s.wrap }>
				<Header />
				<Sidebar />
				<main className={ s.content }>
					{props.location.pathname !== '/403' && <Breadcrumbs url={ props.location.pathname } />}
					<Switch>
						{

							ROUTERS.map( ( { path, exact, title, redirectFrom, component: Component } ) =>
							{
								return (
									<Route
										key={ title }
										path={ path }
										exact={ exact }
										render={ prop => <Component { ...prop } /> }
									/>

								)
							} )
						}
						<Route path="/product" exact render={ () => <Redirect to="/product/list" /> } />
						<Route path="/template/ui-elements/icons" component={IconsPage}/>
						<Route path="/403" exact component={ForbiddenPage}/>
					</Switch>
				</main>
			</div>
		</div>

	);
}

export default Layout;
