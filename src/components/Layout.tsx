import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, Avatar, Dropdown, Space } from 'antd'
import { 
  HomeOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  RiseOutlined, 
  MessageOutlined,
  UserOutlined,
  LogoutOutlined 
} from '@ant-design/icons'
import { useStore } from '../stores/useStore'

const { Header, Content, Footer } = AntLayout

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页', link: '/' },
  { key: '/alumni', icon: <TeamOutlined />, label: '校友名录', link: '/alumni' },
  { key: '/news', icon: <FileTextOutlined />, label: '资讯中心', link: '/news' },
  { key: '/events', icon: <CalendarOutlined />, label: '活动管理', link: '/events' },
  { key: '/jobs', icon: <RiseOutlined />, label: '职业发展', link: '/jobs' },
  { key: '/forum', icon: <MessageOutlined />, label: '社区论坛', link: '/forum' },
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#001529'
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          🎓 校友网
        </div>
        
        <Space>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer', color: 'white' }}>
              <Avatar src={user?.avatar} icon={<UserOutlined />} />
              {user?.nickname || user?.email}
            </Space>
          </Dropdown>
        </Space>
      </Header>

      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: 'white',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ flex: 1, minWidth: 0 }}
            items={menuItems.map(item => ({
              ...item,
              onClick: () => navigate(item.link),
            }))}
          />
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          校友网 ©{new Date().getFullYear()} Created with React + Go
        </Footer>
      </AntLayout>
    </AntLayout>
  )
}
