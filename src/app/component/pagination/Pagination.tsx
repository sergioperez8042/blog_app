import React from 'react';
import styles from './pagination.module.css';

const Pagination: React.FC = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Previous</button>
      <button className={styles.button}>Next</button>
    </div>
  );
};

export default Pagination;
