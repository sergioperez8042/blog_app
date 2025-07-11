import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// En producción, requerir la URI
if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  throw new Error('Please define the MONGODB_URI environment variable for production');
}

// Cached connection for serverless environments
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Si no hay URI de MongoDB, trabajar en modo sin DB
  if (!MONGODB_URI) {
    console.log('⚠️  No MongoDB URI provided, working without database');
    return null;
  }

  if (cached.conn) {
    console.log('📡 Usando conexión MongoDB existente');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🔄 Creando nueva conexión a MongoDB...');
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Ocultar credenciales
    
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB conectado exitosamente');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('❌ Error conectando a MongoDB:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export default connectDB;
