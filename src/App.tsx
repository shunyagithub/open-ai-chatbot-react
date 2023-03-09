import { useEffect, useRef, useState } from 'react';
import { OpenAIApi, Configuration, ChatCompletionRequestMessageRoleEnum } from 'openai';
import type { ChatCompletionRequestMessage } from 'openai';
import { v4 as uuid } from 'uuid';
import CHAT_GPT_SYSTEM_PROMPT from './api/prompt';
import cn from './lib/utils';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  const [input, setInput] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [prevMessages, setPrevMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const bottomRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY as string,
  });

  const openai = new OpenAIApi(configuration);
  const model = 'gpt-3.5-turbo';

  const fetchData = async (message: string): Promise<string> => {
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
      top_p: 0.5,
      frequency_penalty: 0.5,
    });
    return response.data.choices[0].message?.content as string;
  };

  useEffect(() => {
    if (answer === '') {
      return;
    }

    const newMessages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: answer,
      },
    ];

    setPrevMessages((prevMessage) => [...prevMessage, ...newMessages]);
    setAnswer('');
    setDisabled(false);

    // うまく下までスクロールしない
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (inputRef.current) {
      inputRef.current.blur(); // フォーカスを外す
      setTimeout(() => inputRef.current?.focus(), 0); // フォーカスを移動する
    }
  }, [answer, bottomRef, inputRef]);

  const handleClick = (): void => {
    setDisabled(true);

    // うまく下までスクロールしない
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const newMessages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: input,
      },
    ];
    setPrevMessages((prevMessage) => [...prevMessage, ...newMessages]);
    fetchData(input)
      .then((res) => {
        setAnswer(res);
        setInput(''); // 質問欄をリセット
      })
      .catch(() => {
        throw new Error('fetching error');
      });
  };

  return (
    <main className={cn('relative bg-slate-900 min-h-screen text-white flex justify-center')}>
      <ul className="h-screen w-full bg-slate-800 p-4 overflow-y-auto pb-52 max-w-3xl">
        {prevMessages?.map((messages) => {
          const id = uuid();
          return (
            <li
              key={id}
              className={cn(
                'break-words whitespace-pre-wrap max-w-xl w-fit p-4 sm:p-8 rounded-3xl flex mb-4 flex-col sm:flex-row',
                messages.role === 'user' && 'bg-slate-700 ml-auto',
                messages.role === 'assistant' && 'bg-slate-600'
              )}
            >
              {messages.role === 'assistant' && <span className="text-lg mb-2 sm:mr-2">🐬</span>}
              {messages.content}
            </li>
          );
        })}
        <li ref={bottomRef} />
      </ul>
      <form className="absolute bottom-0 left-0 bg-slate-900/80 backdrop-blur-md flex justify-center w-full">
        <span className="flex flex-col sm:flex-row gap-4 w-full items-center max-w-3xl px-8 py-8 sm:p-12">
          <Input
            className=""
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="お話しよう"
          />
          <Button
            type="submit"
            variant="default"
            className="w-full sm:w-auto"
            disabled={input === '' || disabled}
            onClick={handleClick}
          >
            Chat
          </Button>
        </span>
      </form>
    </main>
  );
}

export default App;
