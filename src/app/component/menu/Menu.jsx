import React from 'react'
import styles from './menu.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>What's hot</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <div className={styles.items}>
        <Link href="/posts/1" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category}>Travel</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/posts/2" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category}>Culture</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/posts/3" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category}>Food</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
      </div>
      
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editor's Pick</h1>
      <div className={styles.items}>
        <Link href="/posts/4" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category}>Style</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/posts/5" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category}>Fashion</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Menu
