import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const body = await req.json()
		const { question } = body

		if (!question)
			return NextResponse.json({ answer: 'Нет вопроса' }, { status: 400 })

		// Запрос к Gemini API
		const res = await fetch(
			'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-goog-api-key': process.env.GEMINI_API_KEY, // ключ в .env
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: question }],
						},
					],
				}),
			}
		)

		if (!res.ok) throw new Error(`Ошибка Gemini: ${res.status}`)

		const data = await res.json()

		// Gemini возвращает результат в contents[0].parts[0].text
		const answer =
			data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Нет ответа'

		return NextResponse.json({ answer })
	} catch (err) {
		console.error('Gemini error:', err)
		return NextResponse.json(
			{ answer: err.message || 'Ошибка ИИ' },
			{ status: 500 }
		)
	}
}
