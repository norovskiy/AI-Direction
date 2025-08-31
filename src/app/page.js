import Link from "next/link"
import AICard from "@/components/AICard"

export default async function Home() {
  let aiList = []

  try {
    const res = await fetch("http://localhost:3002/ai", { cache: "no-store" })
    if (!res.ok) throw new Error("Ошибка загрузки данных")
    const data = await res.json()
    aiList = data.filter(ai => ai.category === "Рисование").slice(0, 4)
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-400">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Ошибка загрузки</h2>
          <p>{err.message}</p>
          <p className="text-sm text-gray-400 mt-2">
            Убедитесь, что json-server запущен на порту 3001
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 space-y-12">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
          Искусственный
          <span className="block mt-2 text-7xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Интеллект
          </span>
        </h1>
        <p className="text-xl text-gray-300/80 max-w-2xl mx-auto leading-relaxed">
          Откройте мир искусственного интеллекта: генерация изображений, текстов, видео и многое другое
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
            🎨 Популярные в рисовании
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiList.map(ai => (
            <AICard key={ai.id} ai={ai} />
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/all"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 hover:border-purple-400/50 text-purple-200 hover:text-white font-semibold rounded-2xl transition-all duration-300 group/cta"
          >
            <span>Открыть всю коллекцию</span>
            <svg
              className="w-5 h-5 ml-3 transform group-hover/cta:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
