import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import './index.scss';
import UserLogin from '@/assets/user_login.svg';
import { useForm } from 'antd/es/form/Form';
import { login } from '@/api/auth';
import { pick } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/utils/local';
import { login as loginReducer } from '@/store/features/userSlice';
import { useDispatch } from 'react-redux';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function Login() {
    const [form] = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        form.setFieldsValue({ ...values });
        login(pick(form.getFieldsValue(), ['username', 'password']))
            .then((res: any) => {
                console.log('登录信息', res);
                if (res.code === 200) {
                    setToken(res.data.accessToken);
                    dispatch(loginReducer(res.data));
                    navigate('/');
                }
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] =
        errorInfo => {
            console.log('Failed:', errorInfo);
        };

    return (
        <div className="login-page">
            <div className="login-desc">
                <img src={UserLogin} alt="login" />
                <h2>办公助手后台管理系统</h2>
                <p>做给自己最好的办公助手</p>
            </div>
            <div className="login-form">
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="form-title">登录</div>
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
