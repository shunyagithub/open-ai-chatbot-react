import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import type { ChatCompletionRequestMessage } from 'openai';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CHAT_GPT_SYSTEM_PROMPT from './api/prompt';
import './App.module.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import fakeCnversation from './lib/conversation';
import cn from './lib/utils';

function App() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>('');
  const [prevMessages, setPrevMessages] = useState<ChatCompletionRequestMessage[]>(fakeCnversation);
  const [sending, setSending] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);
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

  const addNewMessage = (role: ChatCompletionRequestMessageRoleEnum, content: string) => {
    const newMessages = [
      {
        role,
        content,
      },
    ];
    setPrevMessages((prevMessage) => [...prevMessage, ...newMessages]);
  };

  const handleClick = (): void => {
    setSending(true);
    addNewMessage(ChatCompletionRequestMessageRoleEnum.User, input);

    fetchData(input)
      .then((res) => {
        addNewMessage(ChatCompletionRequestMessageRoleEnum.Assistant, res);
        setInput(''); // 質問欄をリセット
        setSending(false); // ボタンリセット
      })
      .catch(() => {
        setOpen(true);
        setInput(''); // 質問欄をリセット
        setSending(false); // ボタンリセット
        throw new Error('Fetching Error');
      });
  };

  useEffect(() => {
    inputRef.current?.blur(); // フォーカスを外す
    inputRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bottomRef, inputRef, sending]);

  return (
    <main className={cn('relative flex max-h-screen min-h-screen justify-center bg-slate-900 text-white')}>
      <div className="mb-24 w-full max-w-3xl">
        <ul className={cn('relative h-full w-full overflow-y-auto bg-slate-800 p-4')}>
          {prevMessages?.map((messages) => {
            const id = uuid();
            return (
              <li
                key={id}
                className={cn(
                  'mb-4 flex w-fit max-w-xl flex-col whitespace-pre-wrap break-words rounded-xl p-4 sm:flex-row sm:p-8',
                  messages.role === 'user' && 'ml-auto bg-slate-700',
                  messages.role === 'assistant' && 'bg-slate-600'
                )}
              >
                {messages.role === 'assistant' && <span className="mb-2 text-4xl sm:mr-8">🐬</span>}
                {messages.content}
              </li>
            );
          })}
          <div ref={bottomRef} />
        </ul>
      </div>
      <form className="absolute bottom-0 left-0 flex h-32 w-full items-center justify-center bg-slate-900 sm:h-24">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 px-4 sm:flex-row">
          <Input
            className=""
            ref={inputRef}
            type="text"
            disabled={sending}
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
            disabled={input === '' || sending}
            onClick={handleClick}
          >
            Chat
          </Button>
        </div>
      </form>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={cn(
            'border-1 flex items-center justify-between gap-4 rounded-xl border-red-500 bg-red-100 p-4 shadow-md  transition-all'
          )}
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="font-medium text-red-600">エラーです。もう一度お試しください。</Toast.Title>
          <Toast.Action asChild altText="Close">
            <button
              type="button"
              className={cn(' rounded-xl p-4 ring-slate-800/20 transition-all hover:ring-2')}
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4 text-slate-800" />
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport
          className={cn('fixed bottom-0 right-0 z-50 m-0 flex w-full max-w-[100vw] flex-col gap-4 p-12 outline-none')}
        />
      </Toast.Provider>
    </main>
  );
}

export default App;
