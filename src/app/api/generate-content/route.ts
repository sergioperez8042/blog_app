import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Generador de contenido mock para desarrollo/respaldo
const mockContentGenerator = {
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

  generateContent: (title: string, category: string, contentType: string) => {
    const timestamp = new Date().toLocaleString();
    
    if (contentType === 'ideas') {
      const categoryIdeas = mockContentGenerator.ideas[category as keyof typeof mockContentGenerator.ideas] || mockContentGenerator.ideas['Technology'];
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

--- Generado con IA Mock el ${timestamp} ---`;
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

--- Generado con IA Mock el ${timestamp} ---`;
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

--- Generado con IA Mock el ${timestamp} ---`;
    }
    
    return 'Contenido generado exitosamente.';
  }
};

export async function POST(request: NextRequest) {
  try {
    const { title, category, contentType } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Título y categoría son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si OpenAI está disponible
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not configured, using mock generator');
      const mockContent = mockContentGenerator.generateContent(title, category, contentType);
      return NextResponse.json({
        content: mockContent,
        success: true,
        usedMock: true
      });
    }

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      let prompt = '';
      
      if (contentType === 'full') {
        prompt = `Escribe un artículo completo de blog sobre "${title}" en la categoría ${category}. 
        El artículo debe tener:
        - Una introducción atractiva
        - Desarrollo del tema con varios párrafos
        - Conclusión
        - Tono profesional pero accesible
        - Aproximadamente 500-800 palabras`;
      } else if (contentType === 'outline') {
        prompt = `Crea un esquema detallado para un artículo de blog sobre "${title}" en la categoría ${category}. 
        Incluye:
        - Introducción
        - 3-5 puntos principales
        - Conclusión
        - Sugerencias de subtemas`;
      } else {
        prompt = `Genera ideas y sugerencias para un artículo sobre "${title}" en la categoría ${category}. 
        Incluye:
        - 3-5 ideas principales
        - Ángulos interesantes
        - Preguntas que podrían responderse
        - Tono sugerido`;
      }

      console.log('Generating content with OpenAI...');

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Eres un escritor experto de blogs que crea contenido de alta calidad, informativo y atractivo."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const generatedContent = completion.choices[0]?.message?.content;

      if (!generatedContent) {
        throw new Error('No content generated from OpenAI');
      }

      console.log('Content generated successfully with OpenAI');
      return NextResponse.json({
        content: generatedContent,
        success: true,
        usedMock: false
      });

    } catch (openaiError: any) {
      console.log('OpenAI error, falling back to mock generator:', openaiError.message);
      
      // Si hay error de cuota o cualquier otro error de OpenAI, usar mock
      const mockContent = mockContentGenerator.generateContent(title, category, contentType);
      return NextResponse.json({
        content: mockContent + '\n\n⚠️ Nota: Contenido generado con IA Mock (OpenAI no disponible)',
        success: true,
        usedMock: true,
        openaiError: openaiError.code || 'unknown'
      });
    }

  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
