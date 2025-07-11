// Generador de contenido mock para desarrollo
export const mockContentGenerator = {
  ideas: {
    'Technology': [
      'Análisis de las principales características y mejoras',
      'Comparación con versiones anteriores',
      'Impacto en la productividad empresarial',
      'Casos de uso reales y ejemplos prácticos',
      'Guía de migración y mejores prácticas'
    ],
    'Travel': [
      'Destinos únicos y experiencias auténticas',
      'Consejos de viaje sostenible',
      'Presupuestos y planificación económica',
      'Cultura local y tradiciones',
      'Fotografía y documentación del viaje'
    ],
    'Food': [
      'Recetas tradicionales con twist moderno',
      'Ingredientes locales y de temporada',
      'Técnicas culinarias innovadoras',
      'Beneficios nutricionales y salud',
      'Maridajes y presentación'
    ],
    'Fashion': [
      'Tendencias actuales y futuras',
      'Moda sostenible y ética',
      'Estilos personales y expresión',
      'Historia y evolución del diseño',
      'Consejos de styling y combinaciones'
    ],
    'Culture': [
      'Tradiciones y su evolución moderna',
      'Arte contemporáneo y expresión',
      'Festivales y celebraciones',
      'Intercambio cultural y diversidad',
      'Impacto social y comunitario'
    ]
  },

  generateContent: (title, category, contentType) => {
    const timestamp = new Date().toLocaleString();
    
    if (contentType === 'ideas') {
      const categoryIdeas = mockContentGenerator.ideas[category] || mockContentGenerator.ideas['Technology'];
      return `Ideas para el artículo "${title}":

${categoryIdeas.map((idea, index) => `${index + 1}. ${idea}`).join('\n')}

Ángulos interesantes:
• Perspectiva técnica y práctica
• Casos de éxito y testimonios
• Comparativas y análisis de mercado
• Tendencias futuras y predicciones

Preguntas clave a responder:
• ¿Qué beneficios principales ofrece?
• ¿Cómo se compara con alternativas?
• ¿Cuál es el impacto real en los usuarios?
• ¿Qué desafíos presenta la implementación?

Tono sugerido: Informativo, accesible y orientado a resultados prácticos.

--- Generado el ${timestamp} ---`;
    }
    
    if (contentType === 'outline') {
      return `Esquema detallado para "${title}":

I. Introducción
   • Contexto y relevancia del tema
   • Objetivos del artículo
   • Qué aprenderá el lector

II. Desarrollo Principal
   • Características principales
   • Ventajas y beneficios
   • Casos prácticos de uso
   • Comparativas relevantes

III. Análisis Profundo
   • Aspectos técnicos importantes
   • Consideraciones de implementación
   • Mejores prácticas recomendadas

IV. Perspectivas Futuras
   • Tendencias emergentes
   • Evolución esperada
   • Oportunidades y desafíos

V. Conclusión
   • Resumen de puntos clave
   • Recomendaciones finales
   • Llamada a la acción

--- Generado el ${timestamp} ---`;
    }
    
    if (contentType === 'full') {
      return `${title}

Introducción

En el mundo actual de la tecnología, es fundamental mantenerse al día con las últimas innovaciones y desarrollos. Este artículo explora en profundidad el tema de "${title}", analizando sus características, beneficios y aplicaciones prácticas.

Desarrollo del Tema

Las principales características que destacan incluyen mejoras significativas en funcionalidad, rendimiento y experiencia del usuario. Estas actualizaciones representan un avance considerable en comparación con versiones anteriores.

Beneficios Clave

Los usuarios pueden esperar:
• Mayor eficiencia en los procesos
• Interfaz más intuitiva y fácil de usar
• Mejor integración con otras herramientas
• Rendimiento optimizado y mayor estabilidad

Casos de Uso Prácticos

En el ámbito empresarial, estas mejoras se traducen en:
- Reducción de tiempo en tareas rutinarias
- Mejor colaboración entre equipos
- Análisis más precisos y detallados
- Escalabilidad mejorada para el crecimiento

Consideraciones de Implementación

Para una adopción exitosa, es importante considerar:
• Planificación adecuada del proceso de migración
• Capacitación del equipo
• Evaluación de compatibilidad con sistemas existentes
• Estrategia de respaldo y recuperación

Conclusión

La evolución tecnológica continúa transformando la manera en que trabajamos y nos relacionamos con las herramientas digitales. Adoptar estas innovaciones de manera estratégica puede proporcionar ventajas competitivas significativas.

--- Generado el ${timestamp} ---`;
    }
    
    return 'Contenido generado exitosamente.';
  }
};
