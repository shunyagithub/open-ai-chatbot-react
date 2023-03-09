import React, { useEffect, useState } from 'react';
import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import type { ChatCompletionRequestMessage } from 'openai';
import CHAT_GPT_SYSTEM_PROMPT from './api/prompt';

function App() {
  const [input, setInput] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [prevMessages, setPrevMessages] = useState<
    ChatCompletionRequestMessage[]
  >([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY as string,
  });

  const openai = new OpenAIApi(configuration);
  const model = 'gpt-3.5-turbo';

  const fetchData = async (message: string): Promise<string> => {
    setDisabled(true);
    const response = await openai.createChatCompletion({
      model,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: CHAT_GPT_SYSTEM_PROMPT,
        },
        ...prevMessages,
        { role: ChatCompletionRequestMessageRoleEnum.User, content: message },
      ],
      max_tokens: 100,
      top_p: 0.5,
      frequency_penalty: 0.5,
    });
    return response.data.choices[0].message?.content.replace(
      '\n',
      ''
    ) as string;
  };

  useEffect(() => {
    const newMessages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: input,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: answer,
      },
    ];

    if (input !== '' && answer !== '') {
      setPrevMessages([...prevMessages, ...newMessages]);
    }
    setInput(''); // 質問欄をリセット
    setDisabled(false);
  }, [answer]);

  // https://qiita.com/aktr996/items/de2ed7f238a1d965551f
  const handleClick = (): void => {
    fetchData(input)
      .then((res) => setAnswer(res))
      .catch(() => {
        throw new Error('fetching error');
      });
  };

  return (
    <div className="container">
      <h2>OPEN AIとお話</h2>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        placeholder="お話しよう"
      />
      <button
        type="button"
        className="button"
        disabled={disabled}
        onClick={handleClick}
      >
        Chat
      </button>
      <ul>
        {prevMessages?.map((messages) => (
          <li key={messages.content}>
            {messages.role}: {messages.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
