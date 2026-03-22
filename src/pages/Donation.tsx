import React, { useState } from 'react';
import { Form, Input, Button, Space, message, Statistic, Row, Col, List, Checkbox, Tag } from 'antd';
import { DollarOutlined, UserOutlined } from '@ant-design/icons';
import { donationAPI } from '../services/api';

interface DonationForm {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  message?: string;
  isAnonymous: boolean;
}

const Donation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const donationStats = {
    totalAmount: 1258000,
    totalDonors: 342,
    projects: 12,
  };

  const onFinish = async (values: DonationForm) => {
    setLoading(true);
    try {
      const res = await donationAPI.create({
        project_id: 1,
        amount: Number(values.amount),
        donor_name: values.donorName,
        donor_email: values.donorEmail,
        donor_phone: values.donorPhone,
        message: values.message,
        is_anonymous: values.isAnonymous,
      });

      if (res.code === 0) {
        message.success('捐赠请求已提交！');
        form.resetFields();
      } else {
        message.error(res.message || '捐赠失败，请稍后重试');
      }
    } catch (error: any) {
      console.error('Error submitting donation:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [100, 500, 1000, 5000, 10000];

  return (
    <div className="editorial-page">
      <div className="page-hero">
        <div className="page-kicker">Giving Back</div>
        <div className="page-title">把支持母校，变成一件更有仪式感的事</div>
        <div className="page-description">
          你的每一份捐赠，都会转化成奖学金、科研支持和校园建设的一部分。好的捐赠页，不该只有表单，而应当让支持这件事本身显得郑重而温暖。
        </div>
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: 28 }}>
        <Col xs={24} lg={16}>
          <div className="content-panel">
            <div className="section-title" style={{ fontSize: 42, marginBottom: 12 }}>支持奖学金专项基金</div>
            <div className="section-copy" style={{ maxWidth: '100%', marginBottom: 24 }}>
              所有款项使用公开透明，定期公示。我们希望让更多优秀学生与困难学生，都能得到更实在的帮助。
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ amount: 500, isAnonymous: false }}>
              <Form.Item label="捐赠金额" required>
                <Space wrap size="small" style={{ marginBottom: 12 }}>
                  {presetAmounts.map((amount) => (
                    <Button key={amount} type={form.getFieldValue('amount') === amount ? 'primary' : 'default'} onClick={() => form.setFieldValue('amount', amount)}>
                      ¥{amount.toLocaleString()}
                    </Button>
                  ))}
                </Space>
                <Form.Item name="amount" noStyle rules={[{ required: true, message: '请输入捐赠金额' }, { type: 'number', min: 1, message: '金额至少为 1 元' }]}>
                  <Input type="number" prefix={<DollarOutlined />} placeholder="自定义金额" addonAfter="元" style={{ width: 220 }} />
                </Form.Item>
              </Form.Item>

              <Form.Item name="donorName" label="捐赠人姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input prefix={<UserOutlined />} placeholder="请输入您的姓名" />
              </Form.Item>

              <Form.Item name="donorEmail" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
                <Input placeholder="用于接收捐赠证书和收据" />
              </Form.Item>

              <Form.Item name="donorPhone" label="手机号">
                <Input placeholder="选填，用于联系确认" />
              </Form.Item>

              <Form.Item name="message" label="寄语">
                <Input.TextArea rows={4} placeholder="写下您对母校的祝福或对学弟学妹的鼓励..." showCount maxLength={500} />
              </Form.Item>

              <Form.Item name="isAnonymous" valuePropName="checked">
                <Checkbox>匿名捐赠（不在捐赠榜单显示）</Checkbox>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Space>
                  <Button className="lobster-primary" type="primary" htmlType="submit" loading={loading} size="large">确认捐赠</Button>
                  <Button size="large">取消</Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className="content-panel" style={{ marginBottom: 24 }}>
            <div className="page-kicker" style={{ color: '#66758d' }}>Impact</div>
            <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
              <Col span={24}>
                <Statistic title="累计捐赠总额" value={donationStats.totalAmount} prefix="¥" valueStyle={{ color: '#1d4ed8' }} />
              </Col>
              <Col span={12}><Statistic title="捐赠人数" value={donationStats.totalDonors} suffix="人" /></Col>
              <Col span={12}><Statistic title="资助项目" value={donationStats.projects} suffix="个" /></Col>
            </Row>
          </div>

          <div className="content-panel">
            <div className="page-kicker" style={{ color: '#66758d', marginBottom: 12 }}>Recognition</div>
            <List
              dataSource={[
                { name: '张三', amount: 50000, year: '2015 届' },
                { name: '李四', amount: 30000, year: '2010 届' },
                { name: '王五', amount: 20000, year: '2008 届' },
                { name: '赵六', amount: 15000, year: '2012 届' },
                { name: '匿名', amount: 10000, year: '2018 届' },
              ]}
              renderItem={(item, index) => (
                <List.Item>
                  <Space direction="vertical" size={2} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700 }}>{index + 1}. {item.name}</div>
                      <Tag color={index < 3 ? 'gold' : 'default'}>{item.year}</Tag>
                    </div>
                    <div style={{ color: '#1d4ed8', fontWeight: 700 }}>¥{item.amount.toLocaleString()}</div>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Donation;
