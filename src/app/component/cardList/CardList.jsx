import React from 'react'
import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Image from 'next/image'
import Link from 'next/link'

const CardList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        <div className={styles.post}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.detail}>
              <span className={styles.date}>11.02.2023 - </span>
              <span className={styles.category}>CULTURE</span>
            </div>
            <Link href="/posts/1">
              <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </Link>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem deleniti at quaerat molestias, dolores nisi. Esse, animi repellat? Nulla, perferendis veritatis.
            </p>
            <Link href="/posts/1" className={styles.link}>Read More</Link>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.detail}>
              <span className={styles.date}>11.02.2023 - </span>
              <span className={styles.category}>FOOD</span>
            </div>
            <Link href="/posts/2">
              <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </Link>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem deleniti at quaerat molestias, dolores nisi. Esse, animi repellat? Nulla, perferendis veritatis.
            </p>
            <Link href="/posts/2" className={styles.link}>Read More</Link>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="post" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.detail}>
              <span className={styles.date}>11.02.2023 - </span>
              <span className={styles.category}>FASHION</span>
            </div>
            <Link href="/posts/3">
              <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </Link>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem deleniti at quaerat molestias, dolores nisi. Esse, animi repellat? Nulla, perferendis veritatis.
            </p>
            <Link href="/posts/3" className={styles.link}>Read More</Link>
          </div>
        </div>
      </div>
      <Pagination/>
    </div>
  )
}

export default CardList
