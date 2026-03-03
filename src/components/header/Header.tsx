import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, NavLink } from "react-router-dom";
import SearchBar from '../search/SearchBar';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  // Меню элементтери ёзуу
const menuItems = [
    { key: '1', label: <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Главное</NavLink> },
    { key: '2', label: <NavLink to="/services" style={{ color: 'white', textDecoration: 'none' }}>Услуги</NavLink>},
    { key: '3', label: <NavLink to="/about" style={{ color: 'white', textDecoration: 'none' }}>О нас</NavLink> },
    { key: '4', label: <NavLink to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Контакты</NavLink> },
  ];

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      backgroundColor: 'var(--bg)',
      padding: '0 20px',
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }}>
      {/* Логотип бөлүгү */}
      <div className="logo" style={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
        <div style={{
          width: 44, height: 28, background: 'var(--accent)', borderRadius: '4px', marginRight: '12px'
        }} />
        <Text strong style={{ fontSize: '18px', color: '#fff' }}>NETFLIX</Text>
      </div>

      {/* Меню (Ортодо) */}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={menuItems}
        style={{ flex: 1, minWidth: 0, justifyContent: 'center', borderBottom: 'none', backgroundColor: 'var(--bg)' }}
      />

      {/* Поисковик */}
      <div style={{ minWidth: '250px' }}>
        <SearchBar />
      </div>

      {/* Оң жактагы баскычтар жана Профиль */}
      <Space size="middle">
        <Button type="text" style={{ color: '#fff' }}>Вход</Button>
        <Button type="primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}>Регистрация</Button>
        <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }} />
      </Space>
    </Header>
  );
};

export default AppHeader;