import React from 'react';
import styles from './page.module.css';

const WritePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Write a New Post</h1>
      <form className={styles.form}>
        <input 
          type="text" 
          placeholder="Title" 
          className={styles.input}
        />
        <select className={styles.select}>
          <option>Choose a category</option>
          <option>Technology</option>
          <option>Travel</option>
          <option>Food</option>
          <option>Fashion</option>
          <option>Culture</option>
        </select>
        <textarea 
          placeholder="Write your post here..." 
          className={styles.textarea}
          rows={10}
        />
        <button className={styles.button}>Publish</button>
      </form>
    </div>
  );
};

export default WritePage;
