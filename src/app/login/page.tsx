'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulación de login (demo purposes)
    try {
      // Demo credentials
      if (formData.email === 'admin@blog.com' && formData.password === 'admin123') {
        // Simular delay de autenticación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Guardar token de demo en localStorage
        localStorage.setItem('blogAuth', JSON.stringify({
          user: { email: formData.email, name: 'Admin User' },
          token: 'demo-token-' + Date.now()
        }));
        
        // Redirigir al admin
        router.push('/admin');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>
            Accede a tu panel de administración del blog
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="admin@blog.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className={styles.demoInfo}>
          <h3>🎯 Credenciales de Demo</h3>
          <p><strong>Email:</strong> admin@blog.com</p>
          <p><strong>Contraseña:</strong> admin123</p>
        </div>

        <div className={styles.footer}>
          <p>¿No tienes cuenta? <span className={styles.demoText}>Esta es una demo</span></p>
          <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        </div>
      </div>

      <div className={styles.features}>
        <h2>¿Qué puedes hacer como administrador?</h2>
        <ul className={styles.featureList}>
          <li>🤖 Generar contenido automático con IA</li>
          <li>✍️ Escribir y publicar artículos personalizados</li>
          <li>📊 Ver estadísticas del contenido generado</li>
          <li>⚙️ Configurar la programación automática</li>
          <li>🔄 Gestionar posts existentes</li>
        </ul>
      </div>
    </div>
  );
}
