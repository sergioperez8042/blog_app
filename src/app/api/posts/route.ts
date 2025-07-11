import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  author: string;
}

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json');

// Crear archivo de posts si no existe
async function ensurePostsFile() {
  try {
    await readFile(POSTS_FILE, 'utf8');
  } catch (error) {
    // Si el archivo no existe, crear uno vacío
    const dataDir = path.dirname(POSTS_FILE);
    await writeFile(dataDir, '', { flag: 'a' }).catch(() => {});
    await writeFile(POSTS_FILE, JSON.stringify([]));
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensurePostsFile();
    const { title, category, content } = await request.json();

    if (!title || !category || !content) {
      return NextResponse.json(
        { error: 'Título, categoría y contenido son requeridos' },
        { status: 400 }
      );
    }

    // Leer posts existentes
    const postsData = await readFile(POSTS_FILE, 'utf8');
    const posts: Post[] = JSON.parse(postsData);

    // Crear nuevo post
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      category,
      content,
      createdAt: new Date().toISOString(),
      author: 'Admin' // Puedes cambiar esto por el usuario actual
    };

    // Agregar el nuevo post
    posts.unshift(newPost);

    // Guardar posts actualizados
    await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

    return NextResponse.json({
      message: 'Post creado exitosamente',
      post: newPost,
      success: true
    });

  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensurePostsFile();
    const postsData = await readFile(POSTS_FILE, 'utf8');
    const posts: Post[] = JSON.parse(postsData);

    return NextResponse.json({
      posts,
      success: true
    });

  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
