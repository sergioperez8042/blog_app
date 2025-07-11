import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, category, contentType } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Título y categoría son requeridos' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: 'No se pudo generar contenido' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: generatedContent,
      success: true
    });

  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
