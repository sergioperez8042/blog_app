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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quae dolor, optio voluptatibus magnam iure esse tempora beatae. A suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="facebook" width={18} height={18}/>
          <Image src="/instagram.png" alt="instagram" width={18} height={18}/>
          <Image src="/tiktok.png" alt="tiktok" width={18} height={18}/>
          <Image src="/youtube.png" alt="youtube" width={18} height={18}/>
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
          <Link href="/blog?cat=style">Style</Link>
          <Link href="/blog?cat=fashion">Fashion</Link>
          <Link href="/blog?cat=coding">Coding</Link>
          <Link href="/blog?cat=travel">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="#">Facebook</Link>
          <Link href="#">Instagram</Link>
          <Link href="#">TikTok</Link>
          <Link href="#">YouTube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
