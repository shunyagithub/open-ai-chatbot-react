/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import './App.css'
import { OpenAIApi, Configuration, ChatCompletionRequestMessageRoleEnum } from 'openai'
import type { ChatCompletionRequestMessage } from 'openai'

const App: FC = () => {
  const [input, setInput] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [prevMessages, setPrevMessages] = useState<ChatCompletionRequestMessage[]>([])

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)
  const model = 'gpt-3.5-turbo'

  const fetchData = async (input: string): Promise<string> => {
    const response = await openai.createChatCompletion({
      model,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI`,
        },
        ...prevMessages,
        { role: ChatCompletionRequestMessageRoleEnum.User, content: input },
      ],
      top_p: 0.5,
      frequency_penalty: 0.5,
    })
    return response.data.choices[0].message?.content as string
  }

  useEffect(() => {
    const newMessages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: input, // 直前の質問内容
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: answer, // 直前の回答
      },
    ]

    if (input !== '' && answer !== '') {
      setPrevMessages([...prevMessages, ...newMessages])
    }
    setInput('')
  }, [answer])

  const handleClick = async (): Promise<void> => {
    try {
      const res = await fetchData(input)
      setAnswer(res)
    } catch (error) {
      console.error('error', error)
    }
  }

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
        Chat
      </button>
      <ul>
        {prevMessages?.map((messages, index) => {
          return (
            <li key={index}>
              {messages.role}: {messages.content}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
