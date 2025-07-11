# 🚀 AI-Powered Blog App

An intelligent blog application built with Next.js 13, TypeScript, and OpenAI integration. Features automated content generation, admin dashboard, and scheduled publishing.

## ✨ Features

- **� AI Content Generation**: Automated blog post creation using OpenAI GPT
- **� Scheduled Publishing**: Daily content generation at 9 AM
- **�️ Admin Dashboard**: Real-time monitoring and manual controls
- **🔄 Hybrid AI System**: Fallback system for reliable content generation
- **� Responsive Design**: Mobile-friendly interface
- **🌙 Dark/Light Mode**: Theme toggle functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **AI Integration**: OpenAI GPT API
- **Deployment**: Vercel
- **Automation**: GitHub Actions + Vercel Cron Jobs

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sergioperez8042/blog_app.git
   cd blog_app/next-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to:
- Monitor scheduled content generation
- Generate content manually
- View activity logs
- Check system statistics

## 🔧 API Endpoints

- `GET /api/auto-content` - Get scheduler status
- `POST /api/auto-content` - Trigger content generation
- `GET /api/posts` - Get all posts
- `POST /api/generate-content-hybrid` - Generate content with AI

## 📝 Content Categories

The AI generates content across 5 categories:
- **Technology** - Latest tech trends and tutorials
- **Lifestyle** - Tips and advice for better living
- **Travel** - Destination guides and travel tips
- **Food** - Recipes and culinary experiences
- **Culture** - Arts, entertainment, and cultural insights

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Enable cron jobs** for automated publishing
4. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Next.js team for the amazing framework
- Vercel for seamless deployment

---

**Last updated**: July 2025
**Version**: 0.1.2
