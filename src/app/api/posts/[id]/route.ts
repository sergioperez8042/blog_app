import { NextRequest, NextResponse } from 'next/server';
import { PostStore } from '@/lib/postStore';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await PostStore.getPostById(params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      post,
      success: true
    });
  } catch (error) {
    console.error('Error getting post:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, category, content, author } = await request.json();

    if (!title || !category || !content) {
      return NextResponse.json(
        { error: 'Título, categoría y contenido son requeridos' },
        { status: 400 }
      );
    }

    const updatedPost = await PostStore.updatePost(params.id, {
      title,
      category,
      content,
      author: author || 'Admin'
    });

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Post actualizado exitosamente',
      post: updatedPost,
      success: true
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await PostStore.deletePost(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Post eliminado exitosamente',
      success: true
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
