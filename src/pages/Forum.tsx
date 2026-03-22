import React, { useEffect, useState } from 'react';
import { List, Tag, Button, Space, message, Empty } from 'antd';
import { MessageOutlined, EyeOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { forumAPI } from '../services/api';

interface ForumTopic {
  id: number;
  title: string;
  content: string;
  author?: {
    email?: string;
    profile?: { nickname?: string };
  };
  created_at: string;
  view_count: number;
  comment_count: number;
  category: string;
  is_top: boolean;
  is_locked: boolean;
}

const Forum: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTopics();
  }, [page]);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await forumAPI.getTopics(page, 20);
      if (res.code === 0) {
        setTopics(res.data?.list || []);
        setTotal(res.data?.total || 0);
      } else {
        message.error(res.message || '获取帖子列表失败');
      }
    } catch (error: any) {
      console.error('Error fetching topics:', error);
      message.error(error.message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      交流讨论: 'blue',
      资源共享: 'green',
      问答互助: 'orange',
      活动召集: 'purple',
      灌水区: 'default',
    };
    return colors[category] || 'default';
  };

  return (
    <div className="editorial-page">
      <div className="page-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <div className="page-kicker">Forum</div>
            <div className="page-title">让校友论坛看起来像高质量交流社区，而不是留言板</div>
            <div className="page-description">
              把帖子做得更像有观点、有上下文、有节奏的讨论入口，减少信息堆叠感，提升阅读与参与意愿。
            </div>
          </div>
          <Button className="lobster-primary" type="primary" icon={<PlusOutlined />} onClick={() => message.info('发帖功能开发中...')}>
            发布新帖
          </Button>
        </div>
      </div>

      <div className="content-panel" style={{ marginTop: 28 }}>
        {topics.length === 0 && !loading ? (
          <Empty description="暂无帖子" />
        ) : (
          <List
            itemLayout="vertical"
            loading={loading}
            dataSource={topics}
            pagination={{
              current: page,
              total,
              pageSize: 20,
              onChange: setPage,
              showSizeChanger: false,
              showTotal: (count) => `共 ${count} 个主题`,
            }}
            renderItem={(item) => (
              <List.Item key={item.id} className="news-card" style={{ padding: '24px 8px' }}>
                <Space wrap style={{ marginBottom: 12 }}>
                  {item.is_top && <Tag color="red">置顶</Tag>}
                  {item.is_locked && <Tag color="default">锁定</Tag>}
                  <Tag color={getCategoryColor(item.category)}>{item.category}</Tag>
                </Space>

                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 34, lineHeight: 1, color: '#102033', cursor: 'pointer' }} onClick={() => message.info('帖子详情功能开发中...')}>
                  {item.title}
                </div>

                <div className="news-meta" style={{ marginTop: 12 }}>
                  <span><ClockCircleOutlined /> {new Date(item.created_at).toLocaleString()}</span>
                  <span><EyeOutlined /> {item.view_count}</span>
                  <span><MessageOutlined /> {item.comment_count}</span>
                  <span>作者：{item.author?.profile?.nickname || item.author?.email || '匿名校友'}</span>
                </div>

                <div style={{ marginTop: 16, color: '#5a6880', lineHeight: 1.9 }}>{item.content}</div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Forum;
