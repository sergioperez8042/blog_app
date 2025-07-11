'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

interface FormData {
  title: string;
  category: string;
  content: string;
}

const WritePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    content: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateContent = async (contentType: 'full' | 'outline' | 'ideas') => {
    if (!formData.title || !formData.category) {
      alert('Por favor, ingresa un título y selecciona una categoría');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          contentType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar contenido');
      }

      setFormData(prev => ({
        ...prev,
        content: data.content
      }));

      // Mostrar mensaje si se usó el generador mock
      if (data.usedMock) {
        alert('⚠️ Contenido generado con IA Mock (OpenAI no disponible temporalmente)');
      }

    } catch (error) {
      console.error('Error:', error);
      alert(`Error al generar contenido: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.content) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el post');
      }

      const data = await response.json();
      alert('Post guardado exitosamente!');
      
      // Limpiar el formulario
      setFormData({
        title: '',
        category: '',
        content: ''
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el post. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Write a New Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title"
          placeholder="Title" 
          className={styles.input}
          value={formData.title}
          onChange={handleInputChange}
        />
        <select 
          name="category"
          className={styles.select}
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Choose a category</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Fashion">Fashion</option>
          <option value="Culture">Culture</option>
        </select>
        
        <div className={styles.aiTools}>
          <h3>AI Content Generator</h3>
          <div className={styles.aiButtons}>
            <button 
              type="button"
              className={styles.aiButton}
              onClick={() => generateContent('ideas')}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generando...' : 'Generar Ideas'}
            </button>
            <button 
              type="button"
              className={styles.aiButton}
              onClick={() => generateContent('outline')}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generando...' : 'Crear Esquema'}
            </button>
            <button 
              type="button"
              className={styles.aiButton}
              onClick={() => generateContent('full')}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generando...' : 'Artículo Completo'}
            </button>
          </div>
        </div>

        <textarea 
          name="content"
          placeholder="Write your post here... or use AI tools above to generate content" 
          className={styles.textarea}
          rows={15}
          value={formData.content}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>Publish</button>
      </form>
    </div>
  );
};

export default WritePage;
