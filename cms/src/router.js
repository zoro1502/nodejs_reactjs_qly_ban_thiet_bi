import { CategoryForm } from "./components/Category/CategoryForm";
import { OrderForm } from "./components/Order/OrderForm";
import { ProductForm } from "./components/Products/ProductForm";
import { Permissions } from "./components/Settings/Permission/Permissions";
import { RoleForm } from "./components/Settings/Role/RoleForm";
import { Roles } from "./components/Settings/Role/Roles";
import { UserForm } from "./components/User/UserForm";
import { CategoryContainer } from "./pages/category/CategoryContainer";
import Dashboard from "./pages/dashboard/Dashboard";
import { OrderContainer } from "./pages/order/OrderContainer";
import { ProductContainer } from "./pages/products/ProductContainer";
import { ProfileContainer } from "./pages/profile/ProfileContainer";
import { UserContainer } from "./pages/user/UserContainer";

export const ROUTERS = [
	{
		path: '/dashboard',
		exact: true,
		title: 'Dashboard',
		redirectFrom: '/', 
		component: Dashboard
	},
	{
		path: '/product/list',
		exact: true,
		redirectFrom: '/product', 
		title: 'Danh sách sản phẩm',
		component: ProductContainer,
	},
	{
		path: '/product/create',
		exact: true,
		title: 'Thêm mới sản phẩm',
		redirectFrom: null, 
		component: ProductForm,
	},
	{
		path: '/product/edit/:id',
		exact: true,
		redirectFrom: null, 
		title: 'Chỉnh sửa sản phẩm',
		component: ProductForm,
	},
	{
		path: '/user/list',
		exact: true,
		redirectFrom: '/user', 
		title: 'User',
		component: UserContainer,
	},
	{
		path: '/user/create',
		exact: true,
		redirectFrom: '/user', 
		title: 'Tạo mới',
		component: UserForm,
	},
	{
		path: '/user/edit/:id',
		exact: true,
		redirectFrom: '/user', 
		title: 'Chỉnh sửa',
		component: UserForm,
	},
	{
		path: '/category/list',
		exact: true,
		redirectFrom: '/category', 
		title: 'Danh sách',
		component: CategoryContainer,
	},
	{
		path: '/category/create',
		exact: true,
		redirectFrom: '/category', 
		title: 'Tạo mới',
		component: CategoryForm,
	},
	{
		path: '/category/edit/:id',
		exact: true,
		redirectFrom: '/category', 
		title: 'Chỉnh sửa',
		component: CategoryForm,
	},
	{
		path: '/order/list',
		exact: true,
		redirectFrom: '/order', 
		title: 'Danh sách',
		component: OrderContainer,
	},
	{
		path: '/order/view/:id',
		exact: true,
		redirectFrom: '/order', 
		title: 'Chi tiết',
		component: OrderForm,
	},
	{
		path: '/order/edit/:id',
		exact: true,
		redirectFrom: '/order', 
		title: 'Chỉnh sửa',
		component: OrderForm,
	},
	{
		path: '/setting/permission/list',
		exact: true,
		redirectFrom: '/permission', 
		title: 'Danh sách',
		component: Permissions,
	},
	{
		path: '/setting/role/list',
		exact: true,
		redirectFrom: '/role', 
		title: 'Danh sách',
		component: Roles,
	},

	{
		path: '/setting/role/create',
		exact: true,
		redirectFrom: '/role', 
		title: 'Tạo mới',
		component: RoleForm,
	},

	{
		path: '/setting/role/edit/:id',
		exact: true,
		redirectFrom: '/role', 
		title: 'Chỉnh sửa',
		component: RoleForm,
	},

	{
		path: '/profile',
		exact: true,
		redirectFrom: '/role', 
		title: 'Profile',
		component: ProfileContainer,
	},
]