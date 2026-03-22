import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Upload, Avatar, Row, Col, Select } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { profileAPI } from '../services/api';

const { Option } = Select;

interface UserProfile {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  graduationYear?: number;
  major?: string;
  company?: string;
  position?: string;
  location?: string;
  phone?: string;
  wechat?: string;
  bio?: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<UserProfile>();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await profileAPI.getProfile();
      if (res.code === 0) {
        const profileData = {
          id: res.data?.id,
          email: res.data?.email,
          name: res.data?.profile?.nickname,
          graduationYear: res.data?.profile?.graduation,
          major: res.data?.profile?.major,
          company: res.data?.profile?.company,
          position: res.data?.profile?.position,
          location: res.data?.profile?.city,
          phone: res.data?.phone,
          wechat: res.data?.profile?.wechat,
          bio: res.data?.profile?.intro,
          avatar: res.data?.profile?.avatar,
        };
        setUser(profileData);
        form.setFieldsValue(profileData);
      } else {
        message.error(res.message || '获取个人资料失败');
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        nickname: values.name,
        graduation: values.graduationYear,
        major: values.major,
        city: values.location,
        company: values.company,
        position: values.position,
        wechat: values.wechat,
        intro: values.bio,
      };
      const res = await profileAPI.updateProfile(payload);
      if (res.code === 0) {
        message.success('资料更新成功！');
        fetchUserProfile();
      } else {
        message.error(res.message || '更新失败');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const res = await profileAPI.uploadAvatar(file);
      if (res.code === 0) {
        message.success('头像上传成功！');
        fetchUserProfile();
      } else {
        message.error(res.message || '上传失败');
      }
    } catch (error: any) {
      message.error(error.message || '网络错误');
    }
  };

  return (
    <div className="editorial-page">
      <div className="page-hero light">
        <div className="page-kicker">Profile</div>
        <div className="page-title">把你的校友身份整理成一张更完整的个人名片</div>
        <div className="page-description">
          你的专业、毕业年份、所在城市与职业经历，都会决定别人怎样认识你。让资料页看起来更像一张可信又体面的校友简介。
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              uploadAvatar(file);
              return false;
            }}
            accept="image/*"
          >
            <Avatar src={user?.avatar} icon={<UserOutlined />} size={128} style={{ cursor: 'pointer', marginBottom: 12, background: 'linear-gradient(135deg,#38bdf8,#1d4ed8)' }} />
            <div>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </div>
          </Upload>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user || undefined}>
          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}><Input placeholder="请输入您的姓名" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="graduationYear" label="毕业年份"><Select placeholder="请选择毕业年份"><Option value={2024}>2024</Option><Option value={2023}>2023</Option><Option value={2022}>2022</Option><Option value={2021}>2021</Option><Option value={2020}>2020</Option><Option value={2019}>2019</Option><Option value={2018}>2018</Option></Select></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="major" label="专业"><Input placeholder="请输入专业" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="location" label="所在地"><Input placeholder="例如：北京、上海、深圳" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="company" label="工作单位"><Input placeholder="请输入公司名称" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="position" label="职位"><Input placeholder="请输入职位" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="phone" label="手机号"><Input placeholder="请输入手机号" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="wechat" label="微信号"><Input placeholder="请输入微信号" /></Form.Item></Col>
          </Row>

          <Form.Item name="bio" label="个人简介"><Input.TextArea rows={5} placeholder="介绍一下自己吧..." showCount maxLength={500} /></Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button className="lobster-primary" type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />} size="large">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
