import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Sistema de IA Híbrido Avanzado
class HybridAIGenerator {
  private openai: OpenAI | null;

  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }) : null;
  }

  async generateContent(title: string, category: string, contentType: string, options: any = {}) {
    const generators = [
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
      } catch (error: any) {
        console.log(`🔄 Generator ${generator.name} failed:`, error.message);
        continue;
      }
    }

    throw new Error('Todos los generadores fallaron');
  }

  async tryStandardOpenAI(title: string, category: string, contentType: string, options: any) {
    if (!this.openai) {
      console.log('❌ OpenAI no disponible (sin API key)');
      return null;
    }

    try {
      console.log('🚀 Intentando con OpenAI...');
      const prompt = this.buildAdvancedPrompt(title, category, contentType, options);
      
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
        max_tokens: options.maxTokens || 1200,
        temperature: options.temperature || 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('Respuesta vacía de OpenAI');

      console.log('✅ Contenido generado con OpenAI');
      return {
        content,
        source: 'openai',
        model: options.model || "gpt-3.5-turbo",
        confidence: 0.9
      };

    } catch (error: any) {
      console.log('❌ Error OpenAI:', error.code || error.message);
      throw error;
    }
  }

  async tryLocalAI(title: string, category: string, contentType: string, options: any) {
    try {
      console.log('🏠 Intentando con IA Local (Ollama)...');
      
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'llama2',
          prompt: this.buildAdvancedPrompt(title, category, contentType, options),
          stream: false
        }),
        signal: AbortSignal.timeout(30000) // 30s timeout
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Contenido generado con IA Local');
        return {
          content: data.response,
          source: 'local',
          model: 'llama2',
          confidence: 0.7
        };
      }
    } catch (error: any) {
      console.log('❌ IA Local no disponible:', error.message);
      return null;
    }
    return null;
  }

  useMockGenerator(title: string, category: string, contentType: string, options: any) {
    console.log('🎭 Usando generador Mock inteligente...');
    
    const templates = {
      ideas: this.generateSmartIdeas(title, category, options),
      outline: this.generateSmartOutline(title, category, options),
      full: this.generateSmartArticle(title, category, options)
    };

    const content = templates[contentType as keyof typeof templates] || templates.full;
    
    console.log('✅ Contenido generado con Mock IA');
    return {
      content: content + '\n\n🤖 Generado con IA Mock Inteligente',
      source: 'mock',
      model: 'internal-smart',
      confidence: 0.6
    };
  }

  buildAdvancedPrompt(title: string, category: string, contentType: string, options: any) {
    const basePrompts = {
      ideas: `Como experto en ${category}, genera 7 ideas innovadoras y específicas para un artículo sobre "${title}". 
      Incluye perspectivas únicas, casos de uso reales y ángulos poco explorados.`,
      
      outline: `Crea un esquema profesional y detallado para un artículo sobre "${title}" en ${category}. 
      Estructura: Introducción impactante, 4-5 secciones principales con subsecciones, conclusión memorable.`,
      
      full: `Redacta un artículo completo y profesional sobre "${title}" para la categoría ${category}. 
      Requisitos: 800-1000 palabras, introducción compelling, desarrollo con ejemplos concretos, 
      subtítulos claros, conclusión actionable.`
    };

    let prompt = basePrompts[contentType as keyof typeof basePrompts] || basePrompts.full;

    // Personalización avanzada
    if (options.targetAudience) {
      prompt += `\n\n👥 Audiencia: ${options.targetAudience}`;
    }

    if (options.tone) {
      prompt += `\n\n🎯 Tono: ${options.tone}`;
    }

    if (options.context) {
      prompt += `\n\n📝 Contexto adicional: ${options.context}`;
    }

    if (options.keywords) {
      prompt += `\n\n🔍 Palabras clave a incluir: ${options.keywords.join(', ')}`;
    }

    return prompt;
  }

  getSystemPrompt(category: string, style?: string) {
    const categoryExpertise: Record<string, string> = {
      Technology: "Eres un CTO experimentado que explica tecnología compleja de forma accesible, con enfoque en ROI y aplicaciones prácticas.",
      Travel: "Eres un travel blogger profesional con 10+ años de experiencia, especializado en experiencias auténticas y consejos prácticos.",
      Food: "Eres un chef michelin y food critic que combina técnica culinaria avanzada con narrativas gastronómicas envolventes.",
      Fashion: "Eres un fashion director con background en Vogue, experto en tendencias, sostenibilidad y expresión personal a través del estilo.",
      Culture: "Eres un antropólogo cultural PhD con especialización en estudios contemporáneos y análisis de fenómenos sociales."
    };

    const styleGuides: Record<string, string> = {
      professional: "Mantén autoridad técnica, usa datos y estadísticas, estructura clara con bullet points.",
      casual: "Tono conversacional, usa analogías cotidianas, incluye humor sutil, conecta emocionalmente.",
      academic: "Enfoque analítico profundo, referencias implícitas, terminología precisa, argumentación estructurada.",
      creative: "Narrativa envolvente, metáforas innovadoras, estructura no lineal, lenguaje evocativo."
    };

    const basePrompt = "Eres un escritor de contenido premium que crea artículos que generan engagement y valor real para los lectores.";
    
    return [
      basePrompt,
      categoryExpertise[category] || categoryExpertise.Technology,
      styleGuides[style || 'professional'] || styleGuides.professional
    ].join(' ');
  }

  // Generadores Mock Inteligentes
  generateSmartIdeas(title: string, category: string, options: any) {
    const smartIdeas = this.getCategorySpecificIdeas(title, category);
    const trends = this.getCurrentTrends(category);
    const angles = this.getUniqueAngles(title, category);

    return `💡 Ideas innovadoras para "${title}":

🎯 Ideas principales:
${smartIdeas.map((idea, i) => `${i + 1}. ${idea}`).join('\n')}

📈 Conecta con tendencias actuales:
${trends.map(trend => `• ${trend}`).join('\n')}

🔄 Ángulos únicos:
${angles.map(angle => `• ${angle}`).join('\n')}

🎨 Formatos sugeridos:
• Tutorial paso a paso
• Caso de estudio real
• Comparativa exhaustiva
• Predicción de futuro
• Behind the scenes

📊 Métricas de éxito esperadas:
• Engagement: Alto (comentarios + shares)
• SEO: Potencial de ranking alto
• Valor: Actionable insights`;
  }

  generateSmartOutline(title: string, category: string, options: any) {
    const sections = this.generateDynamicSections(title, category);
    
    return `📋 Esquema estratégico para "${title}":

🚀 I. HOOK INICIAL (100-150 palabras)
   • Estadística impactante o pregunta provocativa
   • Promise de valor claro
   • Preview de insights clave

💎 II. CONTEXTO Y RELEVANCIA
   • Estado actual del tema
   • Por qué importa ahora
   • Audiencia objetivo

${sections.map((section, i) => `🔍 ${this.toRoman(i + 3)}. ${section.title}
   ${section.points.map(point => `• ${point}`).join('\n   ')}`).join('\n\n')}

🎯 CONCLUSIÓN ACTIONABLE
   • Síntesis de valor
   • Next steps concretos
   • Call to action específico

📈 ELEMENTOS DE ENGAGEMENT:
   • 3-4 subtítulos H2 optimizados
   • Listas y bullet points
   • Quotes destacables
   • CTA intermedio`;
  }

  generateSmartArticle(title: string, category: string, options: any) {
    const hook = this.generateHook(title, category);
    const content = this.generateDynamicContent(title, category);
    const conclusion = this.generateConclusion(title, category);

    return `${title}

${hook}

${content}

${conclusion}

---
📊 Métricas estimadas: 800+ palabras | Tiempo de lectura: 4-5 min | SEO Score: Alto
🤖 Generado con IA Híbrida Inteligente - ${new Date().toLocaleString()}`;
  }

  // Métodos auxiliares
  getCategorySpecificIdeas(title: string, category: string): string[] {
    const ideaTemplates: Record<string, string[]> = {
      Technology: [
        `Implementación práctica de ${title} en empresas reales`,
        `ROI y métricas de éxito con ${title}`,
        `Comparativa técnica: ${title} vs alternativas`,
        `Roadmap de adopción de ${title} paso a paso`,
        `Casos de fracaso y lecciones aprendidas con ${title}`,
        `Futuro y evolución esperada de ${title}`,
        `Integration challenges y soluciones para ${title}`
      ],
      Travel: [
        `Experiencias únicas e inesperadas en ${title}`,
        `Presupuesto real y tips de ahorro para ${title}`,
        `Cultura local y etiqueta en ${title}`,
        `Fotografía y documentación de ${title}`,
        `Sostenibilidad y turismo responsable en ${title}`,
        `Hidden gems y secretos locales de ${title}`,
        `Planning perfecto para ${title}`
      ]
    };

    return ideaTemplates[category] || ideaTemplates.Technology;
  }

  getCurrentTrends(category: string): string[] {
    const trends: Record<string, string[]> = {
      Technology: ['IA Generativa', 'Sostenibilidad Tech', 'Remote Work Tools', 'Cybersecurity'],
      Travel: ['Viaje Sostenible', 'Digital Nomads', 'Experiencias Locales', 'Slow Travel'],
      Food: ['Plant-based', 'Fermentación', 'Zero Waste', 'Fusion Cuisine'],
      Fashion: ['Moda Circular', 'Tech Wearables', 'Vintage Revival', 'Personalización'],
      Culture: ['NFTs Arte', 'Metaverso Social', 'Activism Cultural', 'Gen Z Trends']
    };

    return trends[category] || trends.Technology;
  }

  getUniqueAngles(title: string, category: string): string[] {
    return [
      `Perspectiva histórica de ${title}`,
      `Impacto psicológico y social`,
      `Análisis económico profundo`,
      `Visión global vs local`,
      `Demografías específicas y ${title}`,
      `Intersección con otras industrias`
    ];
  }

  generateDynamicSections(title: string, category: string) {
    return [
      {
        title: "ANÁLISIS PROFUNDO",
        points: ["Características clave", "Beneficios diferenciadores", "Limitaciones realistas"]
      },
      {
        title: "IMPLEMENTACIÓN PRÁCTICA", 
        points: ["Pasos concretos", "Recursos necesarios", "Timeline realista"]
      },
      {
        title: "CASOS DE ÉXITO",
        points: ["Ejemplos reales", "Métricas de impacto", "Lecciones extraíbles"]
      },
      {
        title: "PERSPECTIVA FUTURA",
        points: ["Tendencias emergentes", "Predicciones experto", "Oportunidades"]
      }
    ];
  }

  generateHook(title: string, category: string): string {
    const hooks = [
      `¿Sabías que ${title} está transformando completamente la industria de ${category.toLowerCase()}? En los últimos 12 meses, hemos visto cambios revolucionarios que están redefiniendo las reglas del juego.`,
      `Imagina poder dominar ${title} y convertirte en referente en ${category.toLowerCase()}. Este artículo te muestra exactamente cómo hacerlo, con estrategias probadas y insights exclusivos.`,
      `${title} no es solo una tendencia - es el futuro de ${category.toLowerCase()}. Y quienes no se adapten ahora, quedarán obsoletos en menos de 2 años.`
    ];

    return hooks[Math.floor(Math.random() * hooks.length)];
  }

  generateDynamicContent(title: string, category: string): string {
    return `## El Panorama Actual

En el ecosistema actual de ${category.toLowerCase()}, ${title} emerge como un elemento transformador que está redefiniendo las mejores prácticas y estableciendo nuevos estándares de excelencia.

## Análisis Profundo

### Características Fundamentales

Las principales características que distinguen a ${title} incluyen:

• **Innovación técnica**: Representando un salto cualitativo significativo
• **Accesibilidad mejorada**: Democratizando el acceso a funcionalidades avanzadas  
• **Escalabilidad**: Adaptándose a diferentes necesidades y contextos
• **Sostenibilidad**: Considerando el impacto a largo plazo

### Implementación Estratégica

Para una adopción exitosa de ${title}, los expertos recomiendan:

1. **Evaluación inicial**: Análisis de compatibilidad con sistemas existentes
2. **Planificación faseada**: Implementación gradual para minimizar riesgos
3. **Capacitación especializada**: Desarrollo de competencias internas
4. **Métricas de seguimiento**: KPIs específicos para medir el impacto

## Casos de Éxito Documentados

Organizaciones líderes han reportado mejoras significativas:

- **Eficiencia operativa**: Incrementos del 35-50% en productividad
- **Satisfacción del usuario**: Mejoras consistentes en experiencia
- **ROI comprobado**: Retorno de inversión en períodos de 6-12 meses

## Perspectivas Futuras

Los analistas predicen que ${title} evolucionará hacia:

• Mayor integración con tecnologías emergentes
• Personalización avanzada basada en IA
• Estándares industriales más rigurosos
• Ecosistemas colaborativos expandidos`;
  }

  generateConclusion(title: string, category: string): string {
    return `## Conclusión Estratégica

${title} representa más que una simple evolución - es una revolución que está transformando fundamentalmente el panorama de ${category.toLowerCase()}.

### Takeaways Clave:

✅ **Acción inmediata**: Comenzar la exploración e implementación ahora
✅ **Inversión inteligente**: Los beneficios superan significativamente los costos
✅ **Ventaja competitiva**: Early adopters obtendrán posicionamiento privilegiado

### Próximos Pasos Recomendados:

1. Realiza una auditoría de tus necesidades actuales
2. Desarrolla un roadmap de implementación
3. Invierte en capacitación especializada
4. Establece métricas de seguimiento

El futuro pertenece a quienes abrazan la innovación estratégicamente. ¿Estás listo para liderar en la era de ${title}?`;
  }

  toRoman(num: number): string {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romans[num - 1] || num.toString();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, category, contentType, options = {} } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Título y categoría son requeridos' },
        { status: 400 }
      );
    }

    console.log(`🎯 Generando contenido: "${title}" (${category}) - ${contentType}`);

    const hybridGenerator = new HybridAIGenerator();
    const result = await hybridGenerator.generateContent(title, category, contentType, options);

    console.log(`✅ Contenido generado exitosamente con: ${result.source} (confianza: ${result.confidence})`);

    return NextResponse.json({
      content: result.content,
      success: true,
      source: result.source,
      model: result.model,
      confidence: result.confidence,
      generatedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Error generating content:', error);
    return NextResponse.json(
      { error: `Error del servidor: ${error.message}` },
      { status: 500 }
    );
  }
}
