/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useState } from 'react'
import type { FC } from 'react'
import './App.css'
import { OpenAIApi, Configuration } from 'openai'

const App: FC = () => {
  const [input, setInput] = useState<string>('')
  const [completedSentence, setCompletedSentence] = useState('')
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)
  const model = 'gpt-3.5-turbo'

  const fetchData = async (input: string): Promise<string> => {
    const response = await openai.createChatCompletion({
      model,
      messages: [{ role: 'user', content: input }],
    })
    return response.data.choices[0].message?.content as string
  }

  const handleClick = useCallback(async () => {
    try {
      const completedSentence = await fetchData(input)
      setCompletedSentence(completedSentence)
    } catch (error) {
      console.error('error', error)
    }
  }, [])

  return (
    <div className="container">
      <h2>Tell me something, and I&apos;ll tell you more</h2>
      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value)
        }}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick}>
        Complete Sentence
      </button>
      {completedSentence != null && <p>Completed sentence: {completedSentence}</p>}
    </div>
  )
}

export default App
