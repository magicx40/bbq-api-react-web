import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Menu, MenuProps, theme } from 'antd';
import UserMaleIcon from '@/assets/user_male.svg';
import { logout } from '@/api/auth';
import { logout as logoutReducer } from '@/store/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

const userMenu: MenuProps['items'] = [
    {
        key: '1',
        label: <span>退出登录</span>,
    },
];

export default function CommonLayout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const { username } = useSelector((store: any) => store.user);
    const dispatch = useDispatch();
    const items = [
        {
            key: '1',
            label: <Link to="/board-game-management">桌游管理</Link>,
        },
        {
            key: '2',
            label: <Link to="/python-learn">python学习</Link>,
        },
    ];
    const currentPath = useLocation().pathname;
    const selectedKeys: string[] = [];
    items.forEach(item => {
        if (item.label && item.label?.props) {
            const pathname = item.label?.props.to;
            if (pathname === currentPath) {
                selectedKeys.push(item.key);
            }
        }
    });

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            dispatch(logoutReducer());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <Header className="layout-header-wrapper">
                <div className="layout-header">
                    <h1 className="logo-vertical">桌游助手</h1>
                </div>
                <div className="layout-header-user">
                    <Dropdown menu={{ items: userMenu, onClick: handleLogout }}>
                        <div>
                            <Avatar
                                src={<img src={UserMaleIcon} alt="avatar" />}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ color: '#FFFFFF' }}>{username}</span>
                        </div>
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        selectedKeys={selectedKeys}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '12px' }}>
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 280,
                            overflow: 'scroll',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
