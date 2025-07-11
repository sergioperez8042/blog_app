# Blog App con AI Content Generator

Este es un blog moderno desarrollado con Next.js 13, TypeScript y un sistema de generación de contenido basado en inteligencia artificial.

## 🚀 Características

- **AI Content Generator**: Genera contenido automáticamente usando OpenAI
- **Backend API**: Endpoints para crear y obtener posts
- **TypeScript**: Código completamente tipado
- **Responsive Design**: Funciona en todos los dispositivos
- **Theme Toggle**: Modo claro/oscuro
- **Modern UI**: Diseño atractivo y profesional

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/blog_app.git
cd blog_app/next-blog
```

2. Instala las dependencias:
```bash
yarn install
```

3. Configura las variables de entorno:
```bash
cp .env.local.example .env.local
```

4. Edita `.env.local` y agrega tu API key de OpenAI:
```
OPENAI_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🤖 Configuración de OpenAI

Para usar el generador de contenido AI:

1. Registrate en [OpenAI](https://platform.openai.com/)
2. Crea una API key
3. Agrégala a tu archivo `.env.local`

## 🛠️ Uso

### Ejecutar en desarrollo:
```bash
yarn dev
```

### Construir para producción:
```bash
yarn build
yarn start
```

## 📝 Funcionalidades del AI Content Generator

El sistema incluye tres tipos de generación de contenido:

1. **Generar Ideas**: Crea ideas y sugerencias para tu artículo
2. **Crear Esquema**: Genera un esquema detallado del artículo
3. **Artículo Completo**: Escribe un artículo completo de 500-800 palabras

### Cómo usar:

1. Ve a `/write`
2. Ingresa un título y selecciona una categoría
3. Haz clic en uno de los botones de AI:
   - **Generar Ideas**: Para obtener ideas y enfoques
   - **Crear Esquema**: Para un outline detallado
   - **Artículo Completo**: Para contenido completo
4. Edita el contenido generado según necesites
5. Publica el post

## 🗂️ Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── generate-content/    # Endpoint para generar contenido
│   │   └── posts/              # Endpoint para manejar posts
│   ├── component/              # Componentes reutilizables
│   ├── posts/                  # Página de posts
│   └── write/                  # Editor con AI
├── context/                    # Context providers
└── providers/                  # Theme providers
```

## 🎨 Temas y Estilos

El blog incluye:
- Modo claro/oscuro
- Diseño responsive
- Animaciones suaves
- Gradientes modernos
- Sombras y efectos

## 📊 API Endpoints

### POST `/api/generate-content`
Genera contenido usando IA.

**Body:**
```json
{
  "title": "Título del artículo",
  "category": "Categoría",
  "contentType": "full" | "outline" | "ideas"
}
```

### POST `/api/posts`
Crea un nuevo post.

**Body:**
```json
{
  "title": "Título del post",
  "category": "Categoría",
  "content": "Contenido del post"
}
```

### GET `/api/posts`
Obtiene todos los posts.

## 🔧 Tecnologías Utilizadas

- **Next.js 13**: Framework React con App Router
- **TypeScript**: Tipado estático
- **OpenAI API**: Generación de contenido IA
- **CSS Modules**: Estilos modulares
- **React Hooks**: Gestión de estado

## 🚀 Deployment

El proyecto está listo para deployment en:
- Vercel (recomendado)
- Netlify
- AWS
- Cualquier plataforma que soporte Next.js

## 📄 Licencia

MIT License

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:
- Abre un issue en GitHub
- Revisa la documentación
- Verifica tu configuración de OpenAI

---

¡Disfruta creando contenido con IA! 🎉
