export const SIDE_BARS = [
	{
		path: '/dashboard',
		icon: 'eva eva-home-outline',
		title: 'Dashboard', 
	},
	{
		path: '/user',
		icon: 'eva eva-people',
		title: 'User',
		children: [
			{
				path: '/user/list',
				title: 'Danh sách ',
				icon: '',
			},
			{
				path: '/user/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/product',
		icon: 'eva eva-list',
		title: 'Product',
		children: [
			{
				path: '/product/list',
				title: 'Danh sách',
				icon: '',
			},
			{
				path: '/product/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/category',
		icon: 'eva eva-star',
		title: 'Category',
		children: [
			{
				path: '/category/list',
				title: 'Danh sách ',
				icon: '',
			},
			{
				path: '/category/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/order',
		icon: 'eva eva-grid',
		title: 'Order',
		children: [
			{
				path: '/order/list',
				title: 'Danh sách',
				icon: '',
			},
		]
	},
	{
		path: '/setting',
		icon: 'eva eva-settings',
		title: 'Setting',
		children: [
			{
				path: '/setting/role/list',
				title: 'Roles',
				icon: '',
			},
			{
				path: '/setting/permission/list',
				icon: '',
				title: 'Permissions',
			},
		]
	}
]