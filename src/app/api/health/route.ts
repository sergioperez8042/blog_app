import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { PostStore } from '@/lib/postStore';

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await connectDB();
    
    // Obtener estadísticas básicas
    const posts = await PostStore.getAllPosts();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'connected',
      postsCount: posts.length,
      message: 'Blog API is running correctly'
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Blog API has issues'
    }, { status: 500 });
  }
}
