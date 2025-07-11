import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contáctanos</h1>
        <div className={styles.subtitle}>
          Estamos aquí para ayudarte y responder tus preguntas
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <h2>Información de contacto</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.icon}>📧</div>
              <h3>Email</h3>
              <p>info@sergioblog.com</p>
              <p>admin@sergioblog.com</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.icon}>🏢</div>
              <h3>Oficina</h3>
              <p>123 Tech Street</p>
              <p>Innovation City, IC 12345</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.icon}>📱</div>
              <h3>Teléfono</h3>
              <p>+1 (555) 123-4567</p>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Envíanos un mensaje</h2>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre completo</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="tu.email@ejemplo.com"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="subject">Asunto</label>
              <select id="subject" name="subject" required>
                <option value="">Selecciona un asunto</option>
                <option value="general">Consulta general</option>
                <option value="tech">Soporte técnico</option>
                <option value="content">Sugerencia de contenido</option>
                <option value="collaboration">Colaboración</option>
                <option value="other">Otro</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required 
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Enviar mensaje
            </button>
          </form>
        </div>

        <div className={styles.socialSection}>
          <h2>Síguenos en redes sociales</h2>
          <div className={styles.socialGrid}>
            <a href="https://facebook.com" className={styles.socialCard} target="_blank" rel="noopener noreferrer">
              <Image src="/facebook.png" alt="Facebook" width={30} height={30} />
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com" className={styles.socialCard} target="_blank" rel="noopener noreferrer">
              <Image src="/instagram.png" alt="Instagram" width={30} height={30} />
              <span>Instagram</span>
            </a>
            <a href="https://tiktok.com" className={styles.socialCard} target="_blank" rel="noopener noreferrer">
              <Image src="/tiktok.png" alt="TikTok" width={30} height={30} />
              <span>TikTok</span>
            </a>
            <a href="https://youtube.com" className={styles.socialCard} target="_blank" rel="noopener noreferrer">
              <Image src="/youtube.png" alt="YouTube" width={30} height={30} />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2>Preguntas frecuentes</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h3>¿Cómo funciona el contenido generado por IA?</h3>
              <p>Nuestro sistema utiliza inteligencia artificial avanzada para generar contenido relevante y actualizado todos los días a las 9:00 AM.</p>
            </div>
            <div className={styles.faqCard}>
              <h3>¿Puedo sugerir temas para el blog?</h3>
              <p>¡Por supuesto! Envíanos tus sugerencias através del formulario de contacto seleccionando &quot;Sugerencia de contenido&quot;.</p>
            </div>
            <div className={styles.faqCard}>
              <h3>¿Ofrecen servicios de colaboración?</h3>
              <p>Sí, estamos abiertos a colaboraciones. Contáctanos para discutir oportunidades de partnership.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
