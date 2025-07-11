import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sobre SergioBlog</h1>
        <div className={styles.subtitle}>
          Tu fuente de contenido inteligente y actualizado
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <h2>¿Quiénes somos?</h2>
          <p>
            SergioBlog es una plataforma de contenido innovadora que combina la creatividad humana 
            con el poder de la inteligencia artificial. Nuestro objetivo es proporcionar contenido 
            relevante, actualizado y de calidad sobre los temas que más te interesan.
          </p>
        </div>

        <div className={styles.section}>
          <h2>¿Qué hacemos?</h2>
          <p>
            Creamos contenido diario sobre tecnología, viajes, gastronomía, moda y cultura. 
            Nuestro sistema inteligente genera automáticamente artículos cada día a las 9:00 AM, 
            asegurando que siempre tengas algo nuevo e interesante que leer.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Nuestra misión</h2>
          <p>
            Democratizar el acceso a contenido de calidad, utilizando tecnología de vanguardia 
            para mantenerte informado sobre las últimas tendencias y desarrollos en múltiples 
            áreas de interés.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Categorías que cubrimos</h2>
          <div className={styles.categories}>
            <div className={styles.categoryCard}>
              <Image src="/style.png" alt="Technology" width={40} height={40} />
              <h3>Tecnología</h3>
              <p>Últimas tendencias en IA, desarrollo web, ciberseguridad y más</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/travel.png" alt="Travel" width={40} height={40} />
              <h3>Viajes</h3>
              <p>Destinos, consejos de viaje y experiencias únicas</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/food.png" alt="Food" width={40} height={40} />
              <h3>Gastronomía</h3>
              <p>Recetas, tendencias culinarias y cultura gastronómica</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/fashion.png" alt="Fashion" width={40} height={40} />
              <h3>Moda</h3>
              <p>Tendencias, sostenibilidad y estilo personal</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/culture.png" alt="Culture" width={40} height={40} />
              <h3>Cultura</h3>
              <p>Arte, entretenimiento y fenómenos culturales</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Tecnología</h2>
          <p>
            Utilizamos inteligencia artificial avanzada para generar contenido relevante y 
            actualizado. Nuestro sistema combina múltiples fuentes de conocimiento para 
            crear artículos informativos y atractivos.
          </p>
        </div>
      </div>
    </div>
  );
}
