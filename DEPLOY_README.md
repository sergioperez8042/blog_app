# 🚀 Blog App - Plataforma de Blog Completa

## ✨ Características Principales

- **Sistema de Posts**: Creación manual y automática de contenido
- **Autenticación**: Sistema de login para administradores
- **Sistema de Likes**: Los usuarios pueden dar like a los posts
- **Upload de Media**: Subida de imágenes y videos
- **Generación Automática**: IA integrada para generar contenido
- **Responsive Design**: Optimizado para todos los dispositivos
- **Base de Datos**: MongoDB para persistencia de datos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 13 con TypeScript
- **Backend**: API Routes de Next.js
- **Base de Datos**: MongoDB con Mongoose
- **IA**: OpenAI API para generación de contenido
- **Upload**: Sistema de archivos con validación
- **Estilos**: CSS Modules con variables CSS

## 🔧 Instalación y Configuración

### Pre-requisitos
- Node.js 18+
- MongoDB (local o cloud)
- API Key de OpenAI (opcional)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/sergioperez8042/blog_app.git
cd blog_app/next-blog
```

2. **Instalar dependencias**
```bash
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/blog_app
OPENAI_API_KEY=tu_api_key_aqui
```

4. **Iniciar la aplicación**
```bash
yarn dev
```

## 🚀 Deploy en Vercel

### Configuración de Variables de Entorno en Vercel

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a Settings > Environment Variables
4. Añade las siguientes variables:

```
MONGODB_URI=tu_mongodb_connection_string
OPENAI_API_KEY=tu_openai_api_key
```

### Deploy Automático

El proyecto está configurado para deploy automático desde la rama `main`. Cada push activará un nuevo deploy.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/           # Panel de administración
│   ├── api/             # API Routes
│   │   ├── auto-content/    # Generación automática
│   │   ├── generate-content/ # IA Content Generator
│   │   ├── likes/           # Sistema de likes
│   │   ├── posts/           # CRUD de posts
│   │   └── upload/          # Upload de archivos
│   ├── blog/            # Páginas del blog
│   ├── component/       # Componentes reutilizables
│   ├── login/           # Autenticación
│   ├── posts/           # Posts individuales
│   └── write/           # Crear posts
├── lib/
│   ├── mongodb.ts       # Conexión a MongoDB
│   ├── postStore.ts     # Gestión de posts
│   └── events.ts        # Sistema de eventos
├── models/
│   └── Post.ts          # Modelo de datos
└── utils/
    └── AIContentGenerator.js # Generador de IA
```

## 🎯 Funcionalidades

### Sistema de Posts
- Crear posts manuales con título, categoría, contenido y media
- Subir imágenes y videos (máximo 10MB)
- Visualización de posts con media integrado
- Sistema de categorías

### Sistema de Likes
- Los usuarios pueden dar like a los posts
- Posts más populares se muestran en la sidebar
- Actualización en tiempo real

### Generación Automática
- Integración con OpenAI API
- Generación diaria automática a las 9 AM
- Contenido variado por categorías

### Upload de Media
- Soporte para imágenes: JPEG, PNG, GIF, WebP
- Soporte para videos: MP4, WebM, AVI, MOV
- Validación de tamaño y tipo de archivo
- Progreso de subida en tiempo real

## 🔧 Configuración Avanzada

### MongoDB
La aplicación funciona con MongoDB local o en la nube. Se recomienda usar MongoDB Atlas para producción.

### Sistema de Fallback
Si MongoDB no está disponible, la aplicación usa un sistema de fallback en memoria con posts de demostración.

### Cron Jobs
El sistema genera contenido automáticamente usando Vercel Cron Jobs configurados en `vercel.json`.

## 🐛 Troubleshooting

### Errores Comunes

1. **Error de conexión a MongoDB**
   - Verifica que MongoDB esté corriendo
   - Revisa la cadena de conexión en las variables de entorno

2. **Error de subida de archivos**
   - Verifica que la carpeta `public/uploads` existe
   - Revisa los permisos de escritura

3. **Error de generación de IA**
   - Verifica que tengas una API Key válida de OpenAI
   - Revisa los límites de tu cuenta de OpenAI

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🔮 Próximas Características

- [ ] Sistema de comentarios
- [ ] Notificaciones push
- [ ] Editor de texto enriquecido
- [ ] Búsqueda avanzada
- [ ] Múltiples idiomas
- [ ] Sistema de etiquetas
- [ ] Analytics integrado

## 📞 Contacto

- **Autor**: Sergio Pérez
- **Email**: sergioperez8042@gmail.com
- **GitHub**: [@sergioperez8042](https://github.com/sergioperez8042)

---

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!
