// Loading.js
import React from 'react';
import { FaFilm, FaVideo, FaPlay, FaRegStar } from 'react-icons/fa';
 

const Loading = () => {
  return (
    <div className='pt-14 sm:pt-16 ' style={styles.loaderContainer}>
      <FaFilm style={{ ...styles.icon, ...styles.animation1 }} />
      <FaVideo style={{ ...styles.icon, ...styles.animation2 }} />
      <FaPlay style={{ ...styles.icon, ...styles.animation3 }} />
      <FaRegStar style={{ ...styles.icon, ...styles.animation4 }} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
   
  },
  icon: {
    fontSize: '3rem',
    color: '#61dafb',
    margin: '0 10px',
  },
  animation1: {
    animation: 'spin 1s linear infinite',
  },
  animation2: {
    animation: 'spin 1s linear infinite 0.2s',
  },
  animation3: {
    animation: 'spin 1s linear infinite 0.4s',
  },
  animation4: {
    animation: 'spin 1s linear infinite 0.6s',
  },
};

export default Loading;
