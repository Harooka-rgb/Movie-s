import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Space, Tag } from 'antd';
import {
  PlayCircleFilled,
  StarFilled,
  ShareAltOutlined,
  PlaySquareOutlined
} from '@ant-design/icons';
import './watch-movie.css';
import { Bookmark } from 'lucide-react';
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../../constants';
import TrailerModal from '../../../components/trailer-modal/TrailerModal';

const { Title, Text } = Typography;

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

const WatchMovie = () => {
  const { id } = useParams();

  // состояние для загрузки деталей фильма
  const [movieData, setMovieData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    
    // Получаем основные данные о фильме и трейлеры параллельно
    Promise.all([
      fetch(`${API_BASE_URL}/movie/${id}${API_KEY}&language=ru-RU`).then(res => res.json()),
      fetch(`${API_BASE_URL}/movie/${id}/videos${API_KEY}`).then(res => res.json())
    ])
      .then(([movieData, videosData]) => {
        setMovieData(movieData);
        setVideos(videosData.results || []);
        setLoading(false);
      })
      .catch(() => {
        setMovieData(null);
        setVideos([]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="watch-container"><div className="watch-overlay" /><div className="watch-content"><Title style={{ color: '#fff' }}>Loading...</Title></div></div>;
  }

  if (!movieData) {
    return <div className="watch-container"><div className="watch-overlay" /><div className="watch-content"><Title style={{ color: '#fff' }}>Movie not found</Title></div></div>;
  }

  // маппинг полей
  const bgImage = movieData.backdrop_path ? `${IMAGE_BASE_URL}${movieData.backdrop_path}` : '';
  const genres = movieData.genres ? movieData.genres.map((g: any) => g.name) : [];
  const year = movieData.release_date ? movieData.release_date.slice(0, 4) : '';
  const duration = movieData.runtime ? `${movieData.runtime}м` : '';
  const rating = movieData.vote_average ? movieData.vote_average.toString() : '';
  const synopsis = movieData.overview || '';

  return (
    <div className="watch-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="watch-overlay"></div>

      <TrailerModal 
        visible={trailerModalOpen}
        videos={videos}
        onClose={() => setTrailerModalOpen(false)}
        title={movieData.title || movieData.name}
      />

      <div className="watch-content">
        {/* Genres and meta */}
        <div className="meta-info">
          {genres.map((genre: string) => <span key={genre}>{genre}</span>)}
          {year && <><div className="dot" /><span>{year}</span></>}
          {duration && <><div className="dot" /><span>{duration}</span></>}
          <div className="dot" />
          <span>{movieData.adult ? '18+' : '12+'}</span>
          <div className="dot" />
          <Space size={4}>
            <StarFilled style={{ color: '#52c41a' }} />
            <Text style={{ color: '#52c41a' }}>{rating}</Text>
          </Space>
        </div>

        {/* Rent tag */}
        <Tag color="processing" style={{ marginBottom: 20, borderRadius: 4 }}>
          Аренда эпизода
        </Tag>

        {/* Title and tagline */}
        <div style={{ marginBottom: 30 }}>
          <Title level={1} style={{ color: 'white', margin: 0, fontSize: '56px', textTransform: 'uppercase' }}>
            {movieData.title || movieData.name}
          </Title>
          {movieData.tagline && <Text className="subtitle">{movieData.tagline}</Text>}
        </div>

        {/* Action buttons */}
        <Space className="action-buttons" size="middle" wrap>
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleFilled />}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            Смотреть
          </Button>

          <Button ghost size="large" icon={<PlaySquareOutlined />} style={{ background: 'rgba(255,255,255,0.04)' }} onClick={() => setTrailerModalOpen(true)}>
            Трейлер
          </Button>

          <Button ghost size="large" style={{ background: 'rgba(255,255,255,0.04)' }}>
            Оценить
          </Button>

          <Button ghost size="large" icon={<ShareAltOutlined />} style={{ background: 'rgba(255,255,255,0.04)' }}>
            Поделиться
          </Button>

          <Button ghost size="large" icon={<Bookmark />} style={{ background: 'rgba(255,255,255,0.04)' }} />
        </Space>

        {synopsis && <div className="watch-synopsis">{synopsis}</div>}

        <div className="watch-extra">
          {rating && <div className="watch-badge">Рейтинг: {rating}</div>}
          {year && <div className="watch-badge">Год: {year}</div>}
          {duration && <div className="watch-badge">Длительность: {duration}</div>}
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;