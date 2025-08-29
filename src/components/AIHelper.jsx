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
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        Спросить ИИ
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-700 rounded-3xl w-96 p-6 shadow-2xl border-2 border-purple-400">
            <h2 className="text-2xl font-bold mb-4 text-white text-center tracking-wide drop-shadow-lg">
              🖥️ ИИ Помощник
            </h2>

            <textarea
              className="w-full h-28 p-3 rounded-xl bg-gradient-to-br from-purple-800 to-blue-700 text-white border border-purple-400 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none shadow-inner"
              placeholder="Задайте вопрос..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleAsk}
                disabled={loading}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Загрузка...' : 'Спросить'}
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  setAnswer('')
                  setQuestion('')
                }}
                className="px-5 py-2 bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:bg-gray-600 transition-all duration-300"
              >
                Закрыть
              </button>
            </div>

            {answer && (
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-800 text-white shadow-inner whitespace-pre-wrap border border-purple-400">
                {answer}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
