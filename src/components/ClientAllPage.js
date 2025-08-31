'use client'
import { useState } from 'react'
import AICard from '@/components/AICard'
import Link from 'next/link'

export default function ClientAllPage({ aiList }) {
  const [query, setQuery] = useState('')

  const filtered = aiList.filter(
    ai =>
      ai.name.toLowerCase().includes(query.toLowerCase()) ||
      ai.category.toLowerCase().includes(query.toLowerCase()) ||
      ai.description.toLowerCase().includes(query.toLowerCase()) ||
      ai.priceCategory.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
          Все инструменты ИИ
        </h1>
        <p className="text-gray-300/80 text-lg">
          Откройте для себя {aiList.length}+ инструментов искусственного интеллекта
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Поиск по названию, категории или описанию..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border border-gray-700/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(ai =>
            ai.url.startsWith('http') ? (
              <AICard key={ai.id} ai={ai} />
            ) : (
              <Link key={ai.id} href={`/ai/${ai.id}`} className="block hover:no-underline">
                <AICard ai={ai} />
              </Link>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-2">Ничего не найдено</h3>
          <p className="text-gray-400">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
