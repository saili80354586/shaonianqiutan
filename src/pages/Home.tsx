import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button, Avatar, Row, Col, Card, message } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
  CalendarOutlined,
  RiseOutlined,
  MessageOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

interface UserInfo {
  id: number;
  username?: string;
  email: string;
  avatar?: string;
}

const featureCards = [
  {
    icon: '📰',
    title: '校友动态',
    text: '把校友新闻、行业观察和母校更新整理成更有阅读感的内容流。',
    path: '/news',
  },
  {
    icon: '🎉',
    title: '活动连接',
    text: '从年度聚会到行业沙龙，把见面这件事变得更自然、更轻松。',
    path: '/activities',
  },
  {
    icon: '💼',
    title: '职业机会',
    text: '让招聘、合作、内推和经验交流自然发生在校友网络里。',
    path: '/recruitment',
  },
];

const menuItems = [
  { key: 'home', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
  { key: 'alumni', icon: <TeamOutlined />, label: <Link to="/alumni">校友名录</Link> },
  { key: 'news', icon: <FileTextOutlined />, label: <Link to="/news">校友新闻</Link> },
  { key: 'activities', icon: <CalendarOutlined />, label: <Link to="/activities">活动报名</Link> },
  { key: 'recruitment', icon: <RiseOutlined />, label: <Link to="/recruitment">招聘信息</Link> },
  { key: 'forum', icon: <MessageOutlined />, label: <Link to="/forum">校友论坛</Link> },
  { key: 'donation', icon: <HeartOutlined />, label: <Link to="/donation">捐赠母校</Link> },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('已退出登录');
    navigate('/login');
  };

  return (
    <Layout className="site-shell">
      <Header className="lobster-nav">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div className="brand-mark">
              <div className="brand-orb">🦞</div>
              <div>
                <div className="brand-title">校友网</div>
                <div className="brand-subtitle">Alumni Network</div>
              </div>
            </div>

            <Menu
              className="lobster-menu"
              mode="horizontal"
              selectedKeys={['home']}
              items={menuItems}
              overflowedIndicator={<span style={{ color: '#fff' }}>···</span>}
            />
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar
                src={user.avatar}
                icon={<UserOutlined />}
                onClick={() => navigate('/profile')}
                style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.15)' }}
              />
              <span style={{ color: '#f7f4ee', fontWeight: 600 }}>{user.username || user.email}</span>
              <Button className="glass-button" icon={<LogoutOutlined />} onClick={handleLogout}>
                退出
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <Button className="glass-button" onClick={() => navigate('/login')}>登录</Button>
              <Button className="lobster-primary" type="primary" onClick={() => navigate('/register')}>注册</Button>
            </div>
          )}
        </div>
      </Header>

      <Content>
        <section className="hero-wrap">
          <div className="hero-grid">
            <div className="hero-panel">
              <div>
                <div className="hero-kicker">Connected · Curated · Contemporary</div>
                <div className="hero-title">
                  让校友关系<br />
                  从通讯录升级为<br />
                  <em>长期价值网络</em>
                </div>
                <div className="hero-description">
                  这不是一个只是能查人的系统，而是一个把校友动态、活动连接、职业机会与共同记忆重新组织起来的数字校友门户。
                  更清晰的内容层级，更现代的视觉表达，也更适合真正长期使用。
                </div>
                <div className="hero-actions">
                  <Button className="lobster-primary" type="primary" size="large" onClick={() => navigate('/alumni')}>
                    查看校友名录
                  </Button>
                  <Button className="glass-button" size="large" onClick={() => navigate('/activities')}>
                    浏览近期活动 <ArrowRightOutlined />
                  </Button>
                </div>
              </div>

              <div className="hero-metrics">
                <div className="metric-tile">
                  <div className="metric-value">3+</div>
                  <div className="metric-label">核心校友样本已录入</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-value">2</div>
                  <div className="metric-label">新闻内容已联通展示</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-value">3</div>
                  <div className="metric-label">活动场景已可联调</div>
                </div>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-side-card dark">
                <div className="editorial-label">Editorial Snapshot</div>
                <div className="editorial-title">把“信息堆叠”变成“内容体验”</div>
                <div className="editorial-text">
                  用更强的视觉层级、留白和叙事感，让新闻、活动和职业机会看起来像一个真正有温度的校友品牌，而不是传统后台页面。
                </div>
              </div>

              <div className="hero-side-card">
                <div className="editorial-label">What’s inside</div>
                <div className="editorial-title" style={{ color: '#102033' }}>新闻、活动、社区、职业</div>
                <div className="editorial-text">
                  面向校友真实使用场景组织信息，减少割裂导航，把浏览路径变得更自然。
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-header">
            <div>
              <div className="page-kicker" style={{ color: '#66758d' }}>Core Sections</div>
              <div className="section-title">更像品牌首页，而不只是功能入口</div>
            </div>
            <div className="section-copy">
              这版前台强调内容的气质与识别度：更杂志感的标题、更干净的留白，以及更适合校友门户的高级深色头图。
            </div>
          </div>

          <div className="content-panel">
            <div className="showcase-grid">
              {featureCards.map((item) => (
                <div key={item.title} className="showcase-card" onClick={() => navigate(item.path)} style={{ cursor: 'pointer' }}>
                  <div className="showcase-icon">{item.icon}</div>
                  <div className="showcase-title">{item.title}</div>
                  <div className="showcase-text">{item.text}</div>
                  <Button type="link" style={{ paddingLeft: 0, marginTop: 18 }}>
                    进入模块 <ArrowRightOutlined />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section" style={{ paddingBottom: 96 }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className="showcase-card" bordered={false}>
                <div className="editorial-label">Design Direction</div>
                <div className="editorial-title" style={{ color: '#102033' }}>深色英雄区 + 浅色内容层，是这一版的主视觉骨架</div>
                <Paragraph className="showcase-text" style={{ marginTop: 18 }}>
                  顶部采用深海蓝和微弱高光的组合，强化品牌氛围；内容区则回到轻盈明亮的阅读底色，兼顾信息密度和可读性。
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card className="showcase-card" bordered={false}>
                <div className="editorial-label">Next Step</div>
                <div className="showcase-title">继续统一新闻页、活动页与论坛页的审美</div>
                <div className="showcase-text">
                  让整站不再是“每个页面各写各的”，而是形成一套前台门户应有的视觉语言。
                </div>
              </Card>
            </Col>
          </Row>
        </section>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'transparent', color: '#65748b', paddingBottom: 36 }}>
        校友网 ©{new Date().getFullYear()} · 连接你我，共创未来
      </Footer>
    </Layout>
  );
};

export default Home;
