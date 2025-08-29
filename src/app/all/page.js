import ClientAllPage from '@/components/ClientAllPage'

export default async function AllPage({ searchParams }) {
  let aiList = []

  try {
    const res = await fetch('http://localhost:3001/ai', { cache: 'no-store' })
    if (!res.ok) throw new Error('Ошибка загрузки данных')
    aiList = await res.json()
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Ошибка загрузки</h2>
          <p>{err.message}</p>
        </div>
      </div>
    )
  }

  return <ClientAllPage aiList={aiList} />
}
