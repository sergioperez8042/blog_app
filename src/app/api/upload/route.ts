import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/avi',
      'video/mov'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP) y videos (MP4, WebM, AVI, MOV)' 
      }, { status: 400 });
    }

    // Validar tamaño del archivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'El archivo es demasiado grande. Tamaño máximo: 10MB' 
      }, { status: 400 });
    }

    // Generar nombre único para el archivo
    const fileExtension = file.name.split('.').pop();
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}.${fileExtension}`;

    // Convertir el archivo a bytes
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Definir la ruta donde se guardará el archivo
    const uploadPath = join(process.cwd(), 'public', 'uploads', fileName);

    // Escribir el archivo
    await writeFile(uploadPath, buffer);

    // Retornar información del archivo
    return NextResponse.json({
      success: true,
      file: {
        url: `/uploads/${fileName}`,
        filename: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type.startsWith('image') ? 'image' : 'video',
        mimeType: file.type
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Endpoint para subir archivos. Usar método POST.' 
  });
}
