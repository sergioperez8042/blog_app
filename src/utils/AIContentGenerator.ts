import OpenAI from 'openai';

// Interfaces para tipos
interface GenerationOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  context?: string;
  targetAudience?: string;
  tone?: string;
  style?: string;
  wordCount?: number;
}

interface GenerationResult {
  content: string;
  source: string;
  model: string;
  confidence?: number;
}

type ContentType = 'ideas' | 'outline' | 'full';
type Category = 'Technology' | 'Travel' | 'Food' | 'Fashion' | 'Culture' | 'Coding';

export class AIContentGenerator {
  private openai: OpenAI | null;

  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }) : null;
  }

  async generateContent(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions = {}
  ): Promise<GenerationResult> {
    const generators = [
      this.tryFineTunedModel.bind(this),
      this.tryStandardOpenAI.bind(this),
      this.tryLocalAI.bind(this),
      this.useMockGenerator.bind(this)
    ];

    for (const generator of generators) {
      try {
        const result = await generator(title, category, contentType, options);
        if (result) {
          return result;
        }
      } catch (error) {
        console.log(`Generator failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        continue;
      }
    }

    throw new Error('Todos los generadores fallaron');
  }

  async tryFineTunedModel(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions
  ): Promise<GenerationResult | null> {
    // TODO: Implementar fine-tuned model
    // if (this.fineTunedModelId) {
    //   return await this.generateWithFineTuned(title, category, contentType);
    // }
    return null;
  }

  async tryStandardOpenAI(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions
  ): Promise<GenerationResult | null> {
    if (!this.openai) return null;

    const prompt = this.buildPrompt(title, category, contentType, options);
    
    const completion = await this.openai.chat.completions.create({
      model: options.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: this.getSystemPrompt(category, options.style)
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    });

    return {
      content: completion.choices[0]?.message?.content || '',
      source: 'openai',
      model: options.model || "gpt-3.5-turbo"
    };
  }

  async tryLocalAI(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions
  ): Promise<GenerationResult | null> {
    try {
      // Intenta conectar con Ollama local
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'llama2',
          prompt: this.buildPrompt(title, category, contentType, options),
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          content: data.response,
          source: 'local',
          model: 'llama2'
        };
      }
    } catch (error) {
      // Ollama no está disponible
      return null;
    }
    return null;
  }

  useMockGenerator(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions
  ): GenerationResult {
    const templates = {
      ideas: this.generateIdeas(title, category),
      outline: this.generateOutline(title, category),
      full: this.generateFullArticle(title, category, options)
    };

    return {
      content: templates[contentType] || templates.full,
      source: 'mock',
      model: 'internal'
    };
  }

  buildPrompt(
    title: string, 
    category: string, 
    contentType: ContentType, 
    options: GenerationOptions
  ): string {
    const basePrompts = {
      ideas: `Genera 5 ideas creativas para un artículo sobre "${title}" en la categoría ${category}.`,
      outline: `Crea un esquema detallado para un artículo sobre "${title}" en la categoría ${category}.`,
      full: `Escribe un artículo completo sobre "${title}" en la categoría ${category}.`
    };

    let prompt = basePrompts[contentType] || basePrompts.full;

    // Agregar contexto adicional si se proporciona
    if (options.context) {
      prompt += `\n\nContexto adicional: ${options.context}`;
    }

    if (options.targetAudience) {
      prompt += `\n\nAudiencia objetivo: ${options.targetAudience}`;
    }

    if (options.tone) {
      prompt += `\n\nTono: ${options.tone}`;
    }

    return prompt;
  }

  getSystemPrompt(category: string, style?: string): string {
    const basePrompt = "Eres un escritor experto de blogs que crea contenido de alta calidad, informativo y atractivo.";
    
    const categoryPrompts: Record<string, string> = {
      Technology: "Especialízate en tecnología, explicando conceptos complejos de manera accesible.",
      Travel: "Eres un experto en viajes que inspira y guía a los lectores.",
      Food: "Eres un chef y food blogger que combina técnica culinaria con storytelling.",
      Fashion: "Eres un experto en moda que entiende tendencias y estilo personal.",
      Culture: "Eres un antropólogo cultural que explora tradiciones y expresiones artísticas."
    };

    const stylePrompts: Record<string, string> = {
      professional: "Mantén un tono profesional y autoritative.",
      casual: "Usa un tono conversacional y amigable.",
      academic: "Adopta un enfoque académico con referencias y análisis profundo.",
      creative: "Sé creativo y usa metáforas y narrativas engaging."
    };

    return [
      basePrompt,
      categoryPrompts[category] || "",
      style ? stylePrompts[style] || "" : ""
    ].filter(Boolean).join(" ");
  }

  generateIdeas(title: string, category: string): string {
    const ideas = [
      `Análisis profundo de "${title}"`,
      `Guía práctica para implementar "${title}"`,
      `Beneficios y desafíos de "${title}"`,
      `Comparación de "${title}" con alternativas`,
      `Futuro y tendencias de "${title}"`
    ];

    return `Ideas para "${title}":\n\n${ideas.map((idea, i) => `${i + 1}. ${idea}`).join('\n')}`;
  }

  generateOutline(title: string, category: string): string {
    return `Esquema para "${title}":

I. Introducción
   • Importancia del tema
   • Objetivos del artículo

II. Desarrollo
   • Características principales
   • Beneficios y ventajas
   • Casos de uso prácticos

III. Análisis
   • Comparativas
   • Mejores prácticas
   • Consideraciones importantes

IV. Conclusión
   • Resumen de puntos clave
   • Recomendaciones
   • Próximos pasos`;
  }

  generateFullArticle(title: string, category: string, options: GenerationOptions): string {
    const wordCount = options.wordCount || 500;
    
    return `${title}

Introducción

${title} representa una evolución significativa en el campo de ${category.toLowerCase()}. Este artículo examina en detalle sus características, beneficios y aplicaciones prácticas.

Desarrollo

Las principales características incluyen:
• Funcionalidad mejorada
• Mejor experiencia de usuario
• Integración optimizada
• Rendimiento superior

Beneficios Clave

Los usuarios pueden esperar:
- Mayor eficiencia operativa
- Reducción de costos
- Mejor productividad
- Resultados más precisos

Casos de Uso

En el mundo real, ${title} se aplica en:
• Empresas medianas y grandes
• Startups en crecimiento
• Organizaciones sin fines de lucro
• Instituciones educativas

Conclusión

${title} ofrece oportunidades significativas para mejorar procesos y resultados. Su adopción estratégica puede proporcionar ventajas competitivas importantes.

---
Generado con IA Híbrida - ${new Date().toLocaleString()}`;
  }

  // Métodos para entrenamiento y mejora continua
  async learnFromFeedback(originalContent: string, editedContent: string, rating: number): Promise<void> {
    // TODO: Implementar sistema de aprendizaje
    // Guardar feedback para entrenar modelos futuros
    console.log('Feedback recibido:', { originalContent, editedContent, rating });
  }

  async analyzePerformance(): Promise<{
    bestPerformingCategory: string;
    averageRating: number;
    recommendedImprovements: string[];
  }> {
    // TODO: Analizar qué tipo de contenido funciona mejor
    return {
      bestPerformingCategory: 'Technology',
      averageRating: 4.2,
      recommendedImprovements: ['Más ejemplos prácticos', 'Mejor estructura']
    };
  }
}
