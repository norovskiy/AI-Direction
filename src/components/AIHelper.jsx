'use client'
import { useState } from 'react'

export default function AiHelper() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setAnswer('')

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()
      setAnswer(data.answer)
    } catch (err) {
      setAnswer('Ошибка: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        🖥️ Спросить ИИ
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="relative bg-gradient-to-tr from-gray-900/90 to-gray-800/90 rounded-3xl w-100 max-h-[80vh] p-6 shadow-2xl border border-gray-700/50 flex flex-col animate-slideUp">
            <button
              onClick={() => {
                setOpen(false)
                setAnswer('')
                setQuestion('')
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white text-center tracking-wide">
              🤖 AI Helper
            </h2>

            <textarea
              className="w-full h-28 p-4 rounded-xl bg-gray-800/70 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner transition-all"
              placeholder="Задайте вопрос..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleAsk}
                disabled={loading}
                className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Загрузка...' : 'Спросить'}
              </button>
            </div>

            {answer && (
              <div className="mt-5 p-4 rounded-2xl bg-gray-900/80 text-white shadow-inner border border-indigo-500 overflow-auto max-h-[30vh] whitespace-pre-wrap">
                {answer}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
      `}</style>
    </>
  )
}
