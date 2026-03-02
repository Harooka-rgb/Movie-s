import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>О нас</h1>
      <p>
        Добро пожаловать на мой сайт, который сделан с помощью React и TypeScript!
      </p>
      <div className="about-card">
        <h2>Наша задача</h2>
        <p>
          это сделать удобный, и красивый сайт для просмотра фильмов, и сериалов
        </p>
      </div>
    </div>
  );
};

export default About;
