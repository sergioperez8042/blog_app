// Interfaz simplificada para posts
interface SimplePost {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string; // Cambiar a string para compatibilidad
  author: string;
  isAutoGenerated?: boolean;
  likes?: number;
  media?: {
    type: 'image' | 'video';
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };
}

// Fallback PostStore para cuando MongoDB no está disponible
export class PostStoreFallback {
  private static posts: SimplePost[] = [
    {
      id: '1',
      title: 'Bienvenido a nuestro blog',
      category: 'Technology',
      content: 'Este es un post de demostración. El blog está funcionando correctamente.',
      createdAt: new Date().toISOString(), // Usar string ISO
      author: 'Admin',
      isAutoGenerated: false,
      likes: 0,
    },
    {
      id: '2',
      title: 'Funcionalidad de likes implementada',
      category: 'Technology',
      content: 'Los usuarios ahora pueden dar likes a los posts. Los posts más populares aparecen en la sección correspondiente.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      author: 'Admin',
      isAutoGenerated: false,
      likes: 5,
    },
    {
      id: '3',
      title: 'Sistema de upload de media',
      category: 'Technology',
      content: 'Los usuarios pueden subir imágenes y videos a sus posts.',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      author: 'Admin',
      isAutoGenerated: false,
      likes: 3,
    }
  ];

  static async getAllPosts(): Promise<SimplePost[]> {
    return [...this.posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static async getPostById(id: string): Promise<SimplePost | null> {
    return this.posts.find(post => post.id === id) || null;
  }

  static async addPost(postData: Omit<SimplePost, 'id'>): Promise<SimplePost | null> {
    try {
      const newPost: SimplePost = {
        id: Date.now().toString(),
        ...postData
      };
      
      this.posts.unshift(newPost);
      
      // Mantener solo los últimos 50 posts
      if (this.posts.length > 50) {
        this.posts = this.posts.slice(0, 50);
      }
      
      return newPost;
    } catch (error) {
      console.error('Error adding post to fallback:', error);
      return null;
    }
  }

  static async getLatestPosts(limit: number = 10): Promise<SimplePost[]> {
    return this.posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  static async getPostsOrderedByLikes(): Promise<SimplePost[]> {
    return [...this.posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  static async getMostPopularPost(): Promise<SimplePost | null> {
    if (this.posts.length === 0) return null;
    return this.posts.reduce((prev, current) => 
      (prev.likes || 0) > (current.likes || 0) ? prev : current
    );
  }

  static async getLastAutoGeneratedPost(): Promise<SimplePost | null> {
    const autoPosts = this.posts.filter(post => post.isAutoGenerated);
    if (autoPosts.length === 0) return null;
    return autoPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }

  static async likePost(id: string): Promise<boolean> {
    const post = this.posts.find(p => p.id === id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      return true;
    }
    return false;
  }

  static async getPostsByCategory(category: string): Promise<SimplePost[]> {
    return this.posts.filter(post => post.category === category);
  }
}
