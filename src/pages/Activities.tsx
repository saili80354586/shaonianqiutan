import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Tag, Button, Space, message, Modal, Form, Input, DatePicker, Empty } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { activityAPI } from '../services/api';

const { Paragraph } = Typography;

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  location: string;
  organizer?: {
    email?: string;
    profile?: {
      nickname?: string;
    };
  };
  start_time: string;
  end_time: string;
  max_capacity: number;
  current_num: number;
  status: number;
  type?: string;
}

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await activityAPI.getList({ page: 1, pageSize: 20 });
      if (data.code === 0) {
        setActivities(data.data?.list || []);
      } else {
        message.error(data.message || '获取活动列表失败');
      }
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: number) => {
    try {
      const data = await activityAPI.register(eventId);
      if (data.code === 0) {
        message.success('报名成功！');
        fetchActivities();
      } else {
        message.error(data.message || '报名失败');
      }
    } catch (error: any) {
      message.error(error.message || '网络错误');
    }
  };

  const getStatusColor = (status: number) => {
    const colors: Record<number, string> = {
      1: 'blue',
      2: 'green',
      3: 'gray',
      4: 'red',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: number) => {
    const texts: Record<number, string> = {
      1: '报名中',
      2: '进行中',
      3: '已结束',
      4: '已取消',
    };
    return texts[status] || '未知';
  };

  const handleCreateEvent = async (values: any) => {
    try {
      const eventData = {
        title: values.title,
        description: values.description,
        location: values.location,
        address: values.address || '',
        type: values.type || '校友聚会',
        start_time: dayjs(values.timeRange[0]).toISOString(),
        end_time: dayjs(values.timeRange[1]).toISOString(),
        max_capacity: parseInt(values.maxParticipants, 10) || 0,
      };

      const data = await activityAPI.create(eventData);
      if (data.code === 0) {
        message.success('活动发布成功！');
        form.resetFields();
        setIsModalVisible(false);
        fetchActivities();
      } else {
        message.error(data.message || '发布失败');
      }
    } catch (error: any) {
      message.error(error.message || '网络错误');
    }
  };

  return (
    <div className="editorial-page">
      <div className="page-hero light">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <div className="page-kicker">Events</div>
            <div className="page-title">把线下重逢和线上组织，做得更像一场被期待的相遇</div>
            <div className="page-description">
              从校友聚会到主题沙龙，活动页不该只是一个报名表，而应该有节奏、有温度，也更容易让人愿意点击参与。
            </div>
          </div>
          <Button className="lobster-primary" type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            发布活动
          </Button>
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        {activities.length === 0 && !loading ? (
          <Empty description="暂无活动" />
        ) : (
          <List
            grid={{ gutter: 22, column: 2 }}
            loading={loading}
            dataSource={activities}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className="activity-card"
                  hoverable
                  title={<div style={{ fontWeight: 700, fontSize: 20 }}>{item.title}</div>}
                  extra={<Tag color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>}
                >
                  <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <div className="activity-meta">
                      <span><CalendarOutlined /> {dayjs(item.start_time).format('YYYY-MM-DD HH:mm')} - {dayjs(item.end_time).format('HH:mm')}</span>
                    </div>
                    <div className="activity-meta">
                      <span><EnvironmentOutlined /> {item.location}</span>
                      <span><UserOutlined /> 组织者：{item.organizer?.profile?.nickname || item.organizer?.email || '未知'}</span>
                    </div>
                    <div style={{ color: '#5c6980', fontWeight: 600 }}>
                      已报名：{item.current_num}/{item.max_capacity || '∞'} 人
                    </div>
                    <Paragraph style={{ marginBottom: 0, color: '#5a6880', lineHeight: 1.9 }} ellipsis={{ rows: 3 }}>
                      {item.description}
                    </Paragraph>

                    {item.status === 1 && (item.max_capacity === 0 || item.current_num < item.max_capacity) && (
                      <Button className="lobster-primary" type="primary" block onClick={() => handleRegister(item.id)}>
                        立即报名
                      </Button>
                    )}
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>

      <Modal
        className="lobster-modal"
        title="发布新活动"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={640}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateEvent}
          initialValues={{
            type: '校友聚会',
            maxParticipants: 100,
          }}
        >
          <Form.Item name="title" label="活动标题" rules={[{ required: true, message: '请输入活动标题' }]}>
            <Input placeholder="例如：2026 校友春季交流会" />
          </Form.Item>

          <Form.Item name="type" label="活动类型" rules={[{ required: true, message: '请选择活动类型' }]}>
            <Input placeholder="例如：校友聚会、行业沙龙、职业分享等" />
          </Form.Item>

          <Form.Item name="description" label="活动描述" rules={[{ required: true, message: '请输入活动描述' }]}>
            <Input.TextArea rows={4} placeholder="请详细描述活动内容与安排" />
          </Form.Item>

          <Form.Item name="location" label="活动地点" rules={[{ required: true, message: '请输入活动地点' }]}>
            <Input placeholder="例如：上海张江" />
          </Form.Item>

          <Form.Item name="address" label="详细地址">
            <Input placeholder="例如：张江高科技园区示例路 1 号" />
          </Form.Item>

          <Form.Item name="timeRange" label="活动时间" rules={[{ required: true, message: '请选择活动时间' }]}>
            <DatePicker.RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="maxParticipants" label="最大参与人数（0 表示不限制）" rules={[{ required: true, message: '请输入最大人数' }]}>
            <Input type="number" placeholder="例如：100" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button className="lobster-primary" type="primary" htmlType="submit">发布活动</Button>
              <Button onClick={() => setIsModalVisible(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Activities;
