import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;
export default function HomeLayout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
            label: <Link to="/board-game-management">桌游管理</Link>,
        },
    ];
    const currentPath = useLocation().pathname;
    const defaultSelectedKeys: string[] = [];
    items.forEach(item => {
        if (item.label && item.label?.props) {
            const pathname = item.label?.props.to;
            if (pathname === currentPath) {
                defaultSelectedKeys.push(item.key);
            }
        }
    });
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="logo-vertical">桌游设计助理</h1>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={defaultSelectedKeys}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '12px' }}>
                    <Content
                        style={{
                            padding: 12,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
