import React, { useState, useEffect } from 'react';
import { Typography, Space, Button } from 'antd';
import { PlayCircleFilled, PlusOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../constants';
import './home-banner.css';

const { Title, Text, Paragraph } = Typography;

interface BannerMovie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

const HomeBanner = () => {
  const navigate = useNavigate();
  const [bannerMovie, setBannerMovie] = useState<BannerMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем популярный фильм для баннера
    fetch(`${API_BASE_URL}/trending/movie/week${API_KEY}&language=ru-RU`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setBannerMovie(data.results[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleWatch = () => {
    if (bannerMovie) {
      navigate(`/watch/${bannerMovie.id}`);
    }
  };

  if (loading || !bannerMovie) {
    return (
      <div className="hero-banner" style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      }}>
        <div className="banner-overlay" />
        <div className="banner-content" style={{ opacity: 0.5 }}>
          <p style={{ color: '#888' }}>Загрузка...</p>
        </div>
      </div>
    );
  }

  const bgImage = bannerMovie.backdrop_path 
    ? `${IMAGE_BASE_URL}${bannerMovie.backdrop_path}` 
    : '';
  const year = bannerMovie.release_date?.slice(0, 4) || '';

  return (
    <div className="hero-banner" style={{
      backgroundImage: `url('${bgImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="banner-overlay" />
      <div className="banner-particle" />
      
      <div className="banner-content">
        <div className="banner-badge">НОВОЕ</div>

        {/* Рейтинг и метаданные */}
        <div className="banner-meta" style={{ marginTop: 10 }}>
          <Space size={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <StarFilled style={{ color: '#fadb14', fontSize: 16 }} />
              <Text strong style={{ color: 'white', fontSize: 14 }}>{bannerMovie.vote_average.toFixed(1)}</Text>
            </div>
            <Text style={{ color: '#aaa', fontSize: 13 }}>📅 {year}</Text>
          </Space>
        </div>

        {/* Заголовок */}
        <Title className="banner-title">{bannerMovie.title}</Title>

        {/* Описание */}
        <Paragraph className="banner-desc">
          {bannerMovie.overview?.substring(0, 150)}...
        </Paragraph>

        {/* Кнопки */}
        <Space size="large" className="banner-buttons">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<PlayCircleFilled style={{ fontSize: 18 }} />}
            className="btn-watch"
            onClick={handleWatch}
          >
            СМОТРЕТЬ
          </Button>
          <Button
            ghost
            shape="round"
            size="large"
            icon={<PlusOutlined />}
            className="btn-add"
          >
            В СПИСОК
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HomeBanner;