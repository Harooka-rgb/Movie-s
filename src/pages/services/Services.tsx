import React from 'react';
import { Button } from 'antd';
import './services.css';

const items = [
  { title: 'Выбор фильмов', desc: 'Выбирайте новые и культовые фильмы' },
  { title: 'Персональные рекомендации', desc: 'Контент подобранный под ваш даам' },
  { title: 'Оффлайн просмотр', desc: 'Скачивайте фильмы и смотрите без интернета.' },
  { title: 'А, А, К, Д, Б.', desc: 'удобний интрефейс и т п' },
];

const Services = () => {
  return (
    <div className="service-container">
      <h1>Наши услуги</h1>
      <div className="services-list">
        {items.map((s, idx) => (
          <div key={idx} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <Button type="primary">Смотреть</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

