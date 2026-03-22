import React, { useEffect, useState } from 'react';
import { List, Tag, Button, Space, message, Select } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { recruitmentAPI } from '../services/api';

const { Option } = Select;

interface JobItem {
  id: number;
  title: string;
  company: string;
  position: string;
  city: string;
  salary_min?: number;
  salary_max?: number;
  type: string;
  description: string;
  requirements?: string;
  publisher?: {
    email?: string;
    profile?: { nickname?: string };
  };
  created_at: string;
}

const Recruitment: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchJobs();
  }, [typeFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await recruitmentAPI.getList({
        page: 1,
        pageSize: 20,
        type: typeFilter !== 'all' ? typeFilter : undefined,
      });
      if (res.code === 0) {
        setJobs(res.data?.list || []);
      } else {
        message.error(res.message || '获取招聘信息失败');
      }
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      全职: 'blue',
      兼职: 'green',
      实习: 'orange',
      远程: 'purple',
    };
    return colors[type] || 'default';
  };

  const formatSalary = (item: JobItem) => {
    if (!item.salary_min && !item.salary_max) return '薪资面议';
    return `¥${item.salary_min || 0} - ¥${item.salary_max || 0}`;
  };

  return (
    <div className="editorial-page">
      <div className="page-hero light">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <div className="page-kicker">Career</div>
            <div className="page-title">把校友招聘区做得更像高质量机会集市</div>
            <div className="page-description">
              不只是职位堆叠，而是让机会本身更清楚、可信，也更适合被认真浏览和分享。
            </div>
          </div>
          <Button className="lobster-primary" type="primary" onClick={() => message.info('发布招聘功能开发中...')}>
            发布招聘
          </Button>
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        <div className="directory-filters" style={{ marginBottom: 24 }}>
          <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 180 }}>
            <Option value="all">全部类型</Option>
            <Option value="全职">全职</Option>
            <Option value="兼职">兼职</Option>
            <Option value="实习">实习</Option>
            <Option value="远程">远程</Option>
          </Select>
        </div>

        <List
          itemLayout="vertical"
          loading={loading}
          dataSource={jobs}
          renderItem={(item) => (
            <List.Item key={item.id} className="news-card" style={{ padding: '24px 8px' }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <Space wrap>
                  <Tag color={getTypeColor(item.type)}>{item.type}</Tag>
                  <div className="news-meta">
                    <span><EnvironmentOutlined /> {item.city || '城市待定'}</span>
                    <span><ClockCircleOutlined /> {new Date(item.created_at).toLocaleDateString()}</span>
                    <span>发布者：{item.publisher?.profile?.nickname || item.publisher?.email || '校友企业'}</span>
                  </div>
                </Space>

                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 34, lineHeight: 1, color: '#102033' }}>
                  {item.title}
                </div>

                <div style={{ fontSize: 18, fontWeight: 700, color: '#1d4ed8' }}>
                  {item.company || '未填写公司'} · {formatSalary(item)}
                </div>

                <div style={{ color: '#5a6880', lineHeight: 1.9 }}>{item.description}</div>
                {item.requirements && <div style={{ color: '#627086' }}>要求：{item.requirements}</div>}

                <Space>
                  <Button className="lobster-primary" type="primary" onClick={() => message.info('申请职位功能开发中...')}>申请职位</Button>
                  <Button onClick={() => message.info('分享功能开发中...')}>分享</Button>
                </Space>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Recruitment;
