'use client';
import React from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { PostStore } from '@/lib/postStore';

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  author: string;
  isAutoGenerated?: boolean;
  likes?: number;
  media?: {
    type: 'image' | 'video';
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };
}

// Función para obtener los posts desde PostStore
async function getPosts(): Promise<Post[]> {
  return await PostStore.getAllPosts();
}

// Función para obtener la imagen de categoría
function getCategoryImage(category: string): string {
  const categoryImages: { [key: string]: string } = {
    'Technology': '/style.png',
    'Travel': '/travel.png',
    'Food': '/food.png',
    'Fashion': '/fashion.png',
    'Culture': '/culture.png',
    'Coding': '/coding.png'
  };
  return categoryImages[category] || '/p1.jpeg';
}

// Función para formatear la fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Función para truncar el contenido
function truncateContent(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}

import { useEffect, useState } from 'react';

const CardList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts.length === 0 ? (
          <div className={styles.noPosts}>
            <p>No hay posts disponibles aún.</p>
            <p>¡Usa el admin dashboard para generar contenido!</p>
          </div>
        ) : (
          posts.slice(0, 6).map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.imageContainer}>
                {post.media && post.media.type === 'image' ? (
                  <Image 
                    src={post.media.url} 
                    alt={post.title}
                    fill 
                    className={styles.image} 
                  />
                ) : post.media && post.media.type === 'video' ? (
                  <video 
                    src={post.media.url} 
                    className={styles.video}
                    controls={false}
                    muted
                    playsInline
                  />
                ) : (
                  <Image 
                    src={getCategoryImage(post.category)} 
                    alt={post.category}
                    fill 
                    className={styles.image} 
                  />
                )}
              </div>
              <div className={styles.textContainer}>
                <div className={styles.detail}>
                  <span className={styles.date}>{formatDate(post.createdAt)} - </span>
                  <span className={styles.category}>{post.category.toUpperCase()}</span>
                  {post.isAutoGenerated && (
                    <span className={styles.aiTag}>🤖 AI</span>
                  )}
                </div>
                <Link href={`/posts/${post.id}`}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                </Link>
                <p className={styles.desc}>
                  {truncateContent(post.content)}
                </p>
                <div className={styles.postMeta}>
                  <span className={styles.author}>Por {post.author}</span>
                  <Link href={`/posts/${post.id}`} className={styles.link}>Read More</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination/>
    </div>
  );
};

export default CardList;
