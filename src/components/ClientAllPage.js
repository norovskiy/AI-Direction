'use client'
import { useState } from 'react'
import AICard from '@/components/AICard'
import Link from 'next/link'

export default function ClientAllPage({ aiList }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')

  // Получаем уникальные категории и ценовые категории для селектов
  const categories = [...new Set(aiList.map(ai => ai.category.toString()))]
  const priceCategories = [...new Set(aiList.map(ai => ai.priceCategory.toString()))]

  const filtered = aiList.filter(ai => {
    const matchesQuery =
      ai.name.toLowerCase().includes(query.toLowerCase()) ||
      ai.category.toLowerCase().includes(query.toLowerCase()) ||
      ai.description.toLowerCase().includes(query.toLowerCase()) ||
      ai.priceCategory.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = selectedCategory ? ai.category === selectedCategory : true
    const matchesPrice = selectedPrice ? ai.priceCategory === selectedPrice : true

    return matchesQuery && matchesCategory && matchesPrice
  })

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

      {/* Фильтры */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск по названию, категории или описанию..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 pl-4 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="pl-4 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="">Все категории</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedPrice}
          onChange={e => setSelectedPrice(e.target.value)}
          className="pl-4 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="">Все цены</option>
          {priceCategories.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      {/* Список ИИ */}
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
