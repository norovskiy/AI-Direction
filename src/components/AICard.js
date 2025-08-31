'use client'
import Link from 'next/link'

export default function AICard({ ai }) {
  if (!ai) return null

  return (
    <div className="glow-effect p-6 bg-gradient-to-br from-gray-800/70 via-gray-900/80 to-gray-800/70 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700/50 hover:border-indigo-400/30 backdrop-blur-sm h-full flex flex-col group">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 text-xs font-semibold rounded-full border border-purple-500/20">
          {ai.category}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-cyan-200 transition-all duration-300">
        {ai.name}
      </h2>

      <p className="text-gray-300/90 mt-3 flex-grow text-sm leading-relaxed">
        {ai.description}
      </p>
      <div className="flex justify-end mt-1 text-gray-400 italic text-sm">
            <p>{ai.priceCategory}</p>
          </div>

      <Link href={`/ai/${ai.id}`} className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-purple-500/20 group/btn">
        <span>Исследовать</span>
        <svg 
          className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  )
}
