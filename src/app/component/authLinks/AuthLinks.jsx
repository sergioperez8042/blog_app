import React from 'react'
import styles from './authLinks.module.css'
import Link from 'next/link'

const AuthLinks = () => {
  const status = "noauthenticated"
  return (
    <>
      {
        status === "noauthenticated" ? 
        <Link href="/login" className={styles.link}>Login</Link>
      :
      <>
        <Link href="/write" className={styles.link}>Write</Link>
        <span className={styles.link} onClick={() => console.log("Logout clicked")}>Logout</span>
      </>
      }
    </>
  )
}

export default AuthLinks