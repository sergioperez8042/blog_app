import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={50}/>
          <h1 className={styles.logoText}>SergioBlog</h1>
        </div>
        <p className={styles.desc}>
          SergioBlog es tu plataforma de contenido inteligente que combina la creatividad humana con el poder de la inteligencia artificial. Generamos contenido diario sobre tecnología, viajes, gastronomía, moda y cultura para mantenerte siempre informado con las últimas tendencias y desarrollos.
        </p>
        <div className={styles.icons}>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="/facebook.png" alt="facebook" width={18} height={18}/>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.png" alt="instagram" width={18} height={18}/>
          </Link>
          <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <Image src="/tiktok.png" alt="tiktok" width={18} height={18}/>
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src="/youtube.png" alt="youtube" width={18} height={18}/>
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/blog/Technology">Technology</Link>
          <Link href="/blog/Fashion">Fashion</Link>
          <Link href="/blog/Travel">Travel</Link>
          <Link href="/blog/Food">Food</Link>
          <Link href="/blog/Culture">Culture</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link>
          <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
