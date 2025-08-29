import { Inter } from 'next/font/google'
import './globals.css'
import AiHelper from '@/components/AIHelper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Directory - Каталог инструментов ИИ',
  description:
    'Откройте мир искусственного интеллекта: генерация изображений, текстов, видео и многое другое',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className="min-h-screen relative">
          {children}

          <div className="fixed bottom-8 right-8 z-50">
            <AiHelper />
          </div>
        </main>
      </body>
    </html>
  )
}
