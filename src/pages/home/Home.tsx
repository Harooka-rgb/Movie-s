import HomeBanner from "../../components/home-banner/HomeBanner"
import { Card, Rate, Typography, Space } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IMAGE_BASE_URL } from "../../constants"

const { Title, Text } = Typography;

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
}

interface HomeProps {
    movies: MovieData[];
}


const Home = (props: HomeProps) => {
    return (
        <div>
            <HomeBanner/>
            <div style={{ padding: '50px', background: 'var(--bg)' }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={'auto'}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true }}
          >
            {props.movies?.map(movie => (
              <SwiperSlide key={movie.id} style={{ width: 'auto' }}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
            
        </div>
    )
}
// callback function

export default Home


const MovieCard: React.FC<{ movie: MovieData }> = ({ movie }) => {
  return (
    <Link to={`/watch/${movie.id}`} style={{ textDecoration: 'none', color: 'var(--accent)' }}>
      <Card
        hoverable
        style={{ width: 320, borderRadius: 24, overflow: 'hidden', border: 'none', background: 'var(--card-bg)' }}
        bodyStyle={{ padding: '24px', background: 'var(--card-bg)' }}
        cover={
          <div style={{ position: 'relative' }}>
            {/* Основной постер */}
            <img alt={movie.title} src={IMAGE_BASE_URL + movie.poster_path} style={{ width: '100%', height: 350, objectFit: 'cover' }} />

            {/* Маленькое превью (Thumbnail) */}
            <img
              src={IMAGE_BASE_URL + movie.backdrop_path}
              style={{
                position: 'absolute',
                bottom: -20,
                left: 20,
                width: 80,
                height: 110,
                borderRadius: 8,
                border: '2px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            />

            {/* Кнопка Play */}
            <PlayCircleFilled
              style={{
                position: 'absolute',
                bottom: -20,
                right: 20,
                fontSize: 48,
                color: '#eb2f96',
                background: 'white',
                borderRadius: '50%'
              }}
            />
          </div>
        }
      >
        <div style={{ marginTop: 20  }}>
          <Title level={4} style={{ marginBottom: 4, color: 'var(--accent)' }}>{movie.title}</Title>
          <Rate disabled defaultValue={5} style={{ fontSize: 12, color: 'var(--accent)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ color: 'var(--accent)' }} >Release Date: </Text>
              <Text strong style={{ color: 'var(--accent)' }}>{movie.release_date}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>   
              <Text type="secondary" style={{ color: 'var(--accent)' }} >Lang: </Text>
              <Text strong style={{ color: 'var(--accent)' }}>{movie.original_language}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ color: 'var(--accent)' }} >Rating: </Text>
              <Text strong style={{ color: 'var(--accent)' }}>{movie.vote_average}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ color: 'var(--accent)' }} >Review: </Text>
              <Text strong style={{ color: 'var(--accent)' }}>{movie.vote_count}</Text>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};