import React, { useEffect, useState } from 'react';
import { List, Typography, Tag, Button, Space, message } from 'antd';
import { EyeOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { newsAPI } from '../services/api';

const { Paragraph } = Typography;

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  author?: {
    email?: string;
    profile?: {
      nickname?: string;
    };
  };
  created_at: string;
  category: string;
  view_count: number;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await newsAPI.getList(page, 10);
      if (res.code === 0) {
        setNews(res.data?.list || []);
        setTotal(res.data?.total || 0);
      } else {
        message.error(res.message || '获取新闻失败');
      }
    } catch (error: any) {
      console.error('Error fetching news:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      母校动态: 'blue',
      校友成就: 'green',
      活动公告: 'orange',
      行业资讯: 'purple',
    };
    return colors[category] || 'default';
  };

  return (
    <div className="editorial-page">
      <div className="page-hero">
        <div className="page-kicker">Newsroom</div>
        <div className="page-title">把校友新闻做成值得停留的内容流</div>
        <div className="page-description">
          不只是“按时间倒序的资讯列表”，而是带着气质、层级和阅读欲望的校友内容界面。
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        <List
          itemLayout="vertical"
          loading={loading}
          dataSource={news}
          pagination={{
            current: page,
            total,
            pageSize: 10,
            onChange: setPage,
            showSizeChanger: false,
          }}
          renderItem={(item) => (
            <List.Item key={item.id} className="news-card" style={{ padding: '24px 8px' }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <Space wrap>
                  <Tag color={getCategoryColor(item.category)}>{item.category}</Tag>
                  <div className="news-meta">
                    <span><CalendarOutlined /> {new Date(item.created_at).toLocaleDateString()}</span>
                    <span><EyeOutlined /> {item.view_count}</span>
                    <span>作者：{item.author?.profile?.nickname || item.author?.email || '校友网编辑部'}</span>
                  </div>
                </Space>

                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '36px',
                    lineHeight: 1,
                    color: '#102033',
                    cursor: 'pointer',
                  }}
                  onClick={() => message.info('新闻详情功能待完善')}
                >
                  {item.title}
                </div>

                <Paragraph style={{ margin: 0, color: '#5a6880', lineHeight: 1.9, fontSize: 15 }}>
                  {item.summary || item.content?.slice(0, 120)}
                </Paragraph>

                <Button type="link" onClick={() => message.info('新闻详情功能待完善')} style={{ paddingLeft: 0, width: 'fit-content' }}>
                  阅读全文 <ArrowRightOutlined />
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default News;
