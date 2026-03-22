import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

interface RegisterForm {
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      await authAPI.register({
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      message.success('注册成功！请登录');
      navigate('/login');
    } catch (error: any) {
      message.error(error.message || '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel auth-copy-panel">
        <div className="page-kicker">Join The Network</div>
        <div className="auth-title">把你的校友身份，接入一张更长期的连接网络</div>
        <div className="auth-copy">注册后即可完善个人资料、加入校友活动、浏览机会与参与论坛交流。</div>
      </div>

      <Card className="auth-panel auth-form-panel" bordered={false}>
        <div className="page-kicker" style={{ color: '#66758d' }}>Register</div>
        <div className="auth-form-title">创建校友账号</div>

        <Form name="register" onFinish={onFinish} autoComplete="off" size="large" layout="vertical">
          <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="phone">
            <Input prefix={<PhoneOutlined />} placeholder="手机号（选填）" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少 6 个字符' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item name="confirmPassword" rules={[{ required: true, message: '请确认密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>

          <Form.Item name="agree" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('请同意用户协议') }]}>
            <Checkbox>我同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a></Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className="lobster-primary" type="primary" htmlType="submit" loading={loading} block size="large">
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', color: '#5d6a80' }}>
            已有账号？<Link to="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
