import React, { useEffect, useState } from 'react';
import { Input, Select, Button, message, Avatar, Tag, Row, Col, Card, Space, Empty } from 'antd';
import { SearchOutlined, FilterOutlined, EnvironmentOutlined, RiseOutlined } from '@ant-design/icons';
import { alumniAPI } from '../services/api';

const { Option } = Select;

interface Alumni {
  id: number;
  nickname: string;
  graduation: number;
  major: string;
  company?: string;
  position?: string;
  city?: string;
  avatar?: string;
}

const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [majorFilter, setMajorFilter] = useState<string>('all');

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await alumniAPI.getList({
        page: 1,
        pageSize: 50,
        keyword: searchText || undefined,
        major: majorFilter !== 'all' ? majorFilter : undefined,
        graduationYear: yearFilter !== 'all' ? Number(yearFilter) : undefined,
      });

      if (res.code === 0) {
        setAlumni(res.data?.list || []);
      } else {
        message.error(res.message || '获取校友名录失败');
      }
    } catch (error: any) {
      console.error('Error fetching alumni:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editorial-page">
      <div className="page-hero light">
        <div className="page-kicker">Directory</div>
        <div className="page-title">让校友名录更像一张有温度的人脉地图</div>
        <div className="page-description">
          不只是名字和电话，而是把专业、城市、公司与职业方向组织成一张更容易浏览与建立连接的关系网络。
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        <div className="directory-filters">
          <Input
            placeholder="搜索姓名、公司、职位"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />

          <Select value={yearFilter} onChange={setYearFilter}>
            <Option value="all">全部年份</Option>
            <Option value="2024">2024 届</Option>
            <Option value="2023">2023 届</Option>
            <Option value="2022">2022 届</Option>
            <Option value="2021">2021 届</Option>
            <Option value="2020">2020 届</Option>
            <Option value="2019">2019 届</Option>
          </Select>

          <Select value={majorFilter} onChange={setMajorFilter}>
            <Option value="all">全部专业</Option>
            <Option value="计算机科学">计算机科学</Option>
            <Option value="软件工程">软件工程</Option>
            <Option value="人工智能">人工智能</Option>
            <Option value="数据科学">数据科学</Option>
          </Select>

          <Button className="lobster-primary" type="primary" icon={<FilterOutlined />} onClick={fetchAlumni}>
            筛选
          </Button>
        </div>

        {alumni.length === 0 && !loading ? (
          <Empty description="暂无校友数据" />
        ) : (
          <Row gutter={[20, 20]}>
            {alumni.map((item) => (
              <Col xs={24} md={12} xl={8} key={item.id}>
                <Card className="directory-card" loading={loading} bordered={false}>
                  <Space align="start" size={16}>
                    <Avatar size={56} src={item.avatar} style={{ background: 'linear-gradient(135deg,#38bdf8,#1d4ed8)' }}>
                      {item.nickname?.[0] || '校'}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#102033' }}>{item.nickname || '未命名校友'}</div>
                      <div style={{ color: '#627086', marginTop: 4 }}>{item.major || '未填写专业'} · {item.graduation || '未知'} 届</div>
                    </div>
                  </Space>

                  <div className="directory-meta">
                    <span><RiseOutlined /> {item.company || '未填写工作单位'}</span>
                    <span>{item.position || '未填写职位'}</span>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    {item.city ? <Tag color="blue"><EnvironmentOutlined /> {item.city}</Tag> : <Tag>未填写所在地</Tag>}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
