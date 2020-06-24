// 导入你开发的业务组件
import userList from './userList';
// 配置你的左侧菜单列表（注意目前只支持到三级菜单，三级以上的菜单会被忽略）
export default [
    {
        icon: 'el-icon-user-solid',
        title: '用户列表demo',
        component: userList,
        path: 'demo'
    },
    {
        icon: 'el-icon-location',
        title: '菜单1',
        component: userList,
        path: 'menu1'
    },
    {
        icon: 'el-icon-menu',
        title: '菜单2',
        component: userList,
        children: [
            {
                icon: 'el-icon-video-camera-solid',
                title: '菜单2-1',
                component: userList,
                path: 'menu2/cMenu1'
            },
            {
                icon: 'el-icon-s-promotion',
                title: '菜单2-2',
                component: userList,
                children: [
                    {
                        title: '菜单2-2-1',
                        component: userList,
                        path: 'menu2/cMenu2/ccMenu1'
                    },
                    {
                        title: '菜单2-2-2',
                        path: 'menu2/cMenu2/ccMenu2',
                        component: userList
                    }
                ]
            }
        ]
    },
    {
        icon: 'el-icon-s-opportunity',
        title: '菜单3',
        component: userList,
        path: 'menu3'
        // defaultActive: true
    },
    {
        icon: 'el-icon-document',
        title: '菜单4',
        component: userList,
        path: 'menu4'
    },
    {
        icon: 'el-icon-setting',
        title: '菜单5',
        component: userList,
        path: 'menu5'
    }
];
