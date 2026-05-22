import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { config } from 'dotenv'

config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3001

app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  try {
    const anthropic = new Anthropic({ apiKey })
    const { prompt } = req.body

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    })

    res.json({ message: message.content[0].text })
  } catch (error) {
    console.error('Claude API error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`API proxy running on http://localhost:${PORT}`)
})
