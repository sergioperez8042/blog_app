import { NextRequest, NextResponse } from 'next/server';
import { PostStore } from '@/lib/postStore';

// Endpoint para dar like a un post
export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { error: 'ID del post es requerido' },
        { status: 400 }
      );
    }

    const success = PostStore.likePost(postId);
    
    if (success) {
      const post = PostStore.getPostById(postId);
      return NextResponse.json({ 
        success: true, 
        likes: post?.likes || 0,
        message: 'Like agregado exitosamente' 
      });
    } else {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error al agregar like:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Endpoint para obtener el número de likes de un post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'ID del post es requerido' },
        { status: 400 }
      );
    }

    const post = PostStore.getPostById(postId);
    
    if (post) {
      return NextResponse.json({ 
        likes: post.likes || 0,
        postId: post.id,
        title: post.title 
      });
    } else {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error al obtener likes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
