import React, { useState, useEffect } from 'react';
import { Input, Card, Empty, Spin, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../constants';
import './search-bar.css';

interface SearchMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`${API_BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(searchValue)}&language=ru-RU`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results?.slice(0, 8) || []);
          setIsOpen(true);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Input
          placeholder="Поиск фильмов..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => searchValue && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="search-input"
          size="large"
        />
      </div>

      {isOpen && (
        <div className="search-results">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Spin />
            </div>
          ) : results.length > 0 ? (
            <div className="results-grid">
              {results.map(movie => (
                <Link
                  key={movie.id}
                  to={`/watch/${movie.id}`}
                  onClick={() => {
                    setSearchValue('');
                    setIsOpen(false);
                  }}
                  className="result-item"
                >
                  {movie.poster_path ? (
                    <img
                      src={IMAGE_BASE_URL + movie.poster_path}
                      alt={movie.title}
                      className="result-poster"
                    />
                  ) : (
                    <div className="result-poster-placeholder">Нет постера</div>
                  )}
                  <div className="result-info">
                    <p className="result-title">{movie.title}</p>
                    {movie.vote_average > 0 && (
                      <p className="result-rating">⭐ {movie.vote_average.toFixed(1)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : searchValue.trim() ? (
            <div style={{ padding: '20px' }}>
              <Empty description="Фильмы не найдены" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
