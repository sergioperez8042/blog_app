#!/bin/bash

echo "🚀 Iniciando build local para verificar errores..."

# Limpiar cache
echo "🧹 Limpiando cache..."
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar TypeScript
echo "🔍 Verificando TypeScript..."
npx tsc --noEmit

# Build
echo "🏗️ Building project..."
npm run build

echo "✅ Build completado exitosamente!"
