#!/bin/bash

echo "Verificando que el servidor esté funcionando..."

# Cambiar al directorio del proyecto
cd /Users/sergio/Desktop/blog_app/next-blog

echo "Directorio actual: $(pwd)"

# Verificar que package.json existe
if [ -f "package.json" ]; then
    echo "✓ package.json encontrado"
else
    echo "✗ package.json no encontrado"
    exit 1
fi

# Verificar que .env.local existe
if [ -f ".env.local" ]; then
    echo "✓ .env.local encontrado"
else
    echo "✗ .env.local no encontrado"
    exit 1
fi

# Ejecutar el servidor
echo "Iniciando servidor..."
yarn dev
