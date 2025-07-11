'use client';

import React, { useState, useEffect } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthLinks: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación al cargar
    const authData = localStorage.getItem('blogAuth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setIsAuthenticated(true);
        setUser(parsed.user);
      } catch (error) {
        localStorage.removeItem('blogAuth');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('blogAuth');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };
  
  return (
    <div className={styles.authContainer}>
      {!isAuthenticated ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <div className={styles.authenticatedLinks}>
          <Link href="/admin" className={styles.link}>
            Admin
          </Link>
          <div className={styles.userMenu}>
            <span className={styles.userName}>
              👤 {user?.name || 'Admin'}
            </span>
            <button 
              className={styles.logoutButton} 
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLinks;
        </div>
      )}
    </div>
  );
};

export default AuthLinks;