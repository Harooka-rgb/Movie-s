import HomeBanner from "../../components/home-banner/HomeBanner"
import { Card, Rate, Typography } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TrailerModal from "../../components/trailer-modal/TrailerModal";
import './home.css';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IMAGE_BASE_URL, API_BASE_URL, API_KEY } from "../../constants"

const { Title, Text } = Typography;

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
}

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

interface HomeProps {
    movies: MovieData[];
}


const Home = (props: HomeProps) => {
    return (
        <div className="home-container">
            <HomeBanner/>
            <div className="movies-section">
              <Title level={2} className="section-title">📺 Популярные фильмы</Title>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={'auto'}
                navigation
                pagination={{ clickable: true }}
                className="movies-swiper"
              >
                {props.movies?.map(movie => (
                  <SwiperSlide key={movie.id} className="movie-slide">
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
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videos.length === 0 && !loadingVideos) {
      setLoadingVideos(true);
      fetch(`${API_BASE_URL}/movie/${movie.id}/videos${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setVideos(data.results || []);
          setTrailerModalOpen(true);
          setLoadingVideos(false);
        })
        .catch(() => {
          setLoadingVideos(false);
        });
    } else if (videos.length > 0) {
      setTrailerModalOpen(true);
    }
  };

  return (
    <>
      <TrailerModal 
        visible={trailerModalOpen}
        videos={videos}
        onClose={() => setTrailerModalOpen(false)}
        title={movie.title}
      />
      <Link to={`/watch/${movie.id}`} style={{ textDecoration: 'none' }} className="movie-card-link">
        <div className="movie-card-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="movie-poster-container">
            <img 
              alt={movie.title} 
              src={IMAGE_BASE_URL + movie.poster_path} 
              className="movie-poster"
            />
            
            <div className={`movie-overlay ${isHovered ? 'visible' : ''}`}>
              <div className="overlay-content">
                <PlayCircleFilled
                  onClick={handleTrailerClick}
                  className="trailer-btn"
                />
                <p className="trash-text">Нажми для трейлера</p>
              </div>
            </div>

            {movie.vote_average && (
              <div className="movie-rating">
                {movie.vote_average.toFixed(1)}
              </div>
            )}
          </div>

          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            
            <div className="movie-meta">
              <span className="meta-item">
                {movie.release_date?.slice(0, 4)}
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-item">
                {movie.original_language?.toUpperCase()}
              </span>
            </div>

            {movie.vote_average && (
              <div className="movie-rating-bar">
                <div 
                  className="rating-fill"
                  style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};