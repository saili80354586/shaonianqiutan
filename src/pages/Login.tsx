import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const res = await authAPI.login(values);
      const payload = res.data || {};
      localStorage.setItem('token', payload.token || '');
      localStorage.setItem('user', JSON.stringify({ id: payload.user_id, email: payload.email }));
      message.success('登录成功！');
      navigate('/');
    } catch (error: any) {
      message.error(error.message || '登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel auth-copy-panel">
        <div className="page-kicker">Welcome Back</div>
        <div className="auth-title">重新回到属于校友的数字客厅</div>
        <div className="auth-copy">继续浏览校友动态、参与活动、连接机会，让校友关系真正沉淀成长期网络。</div>
      </div>

      <Card className="auth-panel auth-form-panel" bordered={false}>
        <div className="page-kicker" style={{ color: '#66758d' }}>Login</div>
        <div className="auth-form-title">登录校友网</div>

        <Form name="login" onFinish={onFinish} autoComplete="off" size="large" layout="vertical">
          <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button className="lobster-primary" type="primary" htmlType="submit" loading={loading} block size="large">
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', color: '#5d6a80' }}>
            还没有账号？<Link to="/register">立即注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
