import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Menu, MenuProps, theme } from 'antd';
import UserMaleIcon from '@/assets/user_male.svg';
import { logout } from '@/api/auth';
import { logout as logoutReducer } from '@/store/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from 'antd/es/layout/layout';
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
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="layout-header">
                    <img
                        className="site-logo-small"
                        src="/logo-small.png"
                        alt="logo"
                    />
                    <h1 className="layout-header-title">办公助手</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={items}
                />
            </Sider>
            <Layout>
                <div>
                    <Header style={{ background: colorBgContainer }}>
                        <div className="layout-header-user">
                            <Dropdown
                                menu={{
                                    items: userMenu,
                                    onClick: handleLogout,
                                }}
                            >
                                <div>
                                    <Avatar
                                        src={
                                            <img
                                                src={UserMaleIcon}
                                                alt="avatar"
                                            />
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <span>{username}</span>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '12px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright © 2024 Mr.Han
                    </Footer>
                </div>
            </Layout>
        </Layout>
    );
}
