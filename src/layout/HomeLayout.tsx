import { Link, Outlet, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;
export default function HomeLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/">首页</Link>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <Link to="/test">测试</Link>,
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
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeys}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: 12,
                        padding: 12,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
