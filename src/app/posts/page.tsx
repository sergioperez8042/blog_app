'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  author: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading Posts...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
      {posts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>No posts available yet.</p>
          <p>Create your first post using the AI-powered writer!</p>
        </div>
      ) : (
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.postMeta}>
                <span className={styles.author}>By {post.author}</span>
                <span className={styles.date}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.postContent}>
                <p>{post.content.substring(0, 200)}...</p>
              </div>
              <div className={styles.postFooter}>
                <button className={styles.readMore}>Read More</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
