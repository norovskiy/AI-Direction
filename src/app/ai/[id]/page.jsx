export default async function AIPage({ params }) {
  const res = await fetch(`http://localhost:3001/ai/${params.id}`, {
    cache: 'no-store', 
  })

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-gray-300 mb-4">
            Инструмент не найден
          </h1>
          <a href="/all" className="text-purple-400 hover:text-purple-300">
            Вернуться к каталогу
          </a>
        </div>
      </div>
    )
  }

  const ai = await res.json()

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <a
        href="/all"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Назад к каталогу
      </a>

      <div className="space-y-8">
        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 text-sm font-semibold rounded-full border border-purple-500/20">
            {ai.category}
          </span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
            {ai.name}
          </h1>
        </div>

        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm">
          <p className="text-gray-200 text-lg leading-relaxed text-center">
            {ai.description}
          </p>
        </div>

        <div className="text-gray-400 text-[19px]">
          <center>{ai.moreInfo}</center>
        </div>

        <div className="text-center">
          <a
            href={ai.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            Перейти на официальный сайт
          </a>
        </div>
      </div>
    </div>
  )
}
