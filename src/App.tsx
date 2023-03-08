/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useEffect, useState } from "react";
import type  {FC} from 'react'
import "./App.css";
import axios from 'axios'
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const App:FC = () => {
  const [input, setInput] = useState<string>("");
  const [completedSentence, setCompletedSentence] = useState("");

  const model = 'text-davinci-002'

  const fetchData = async (input: string): Promise<string> => {
    const response = await openai.createChatCompletion({
      model,
      messages: [{role: 'user', content: input}]
    })
  console.log(response.data.choices[0].message?.content)
    return response.data.choices[0].message?.content as string;
  };

  const handleClick = useCallback(
    async () => {
      console.log('click')
      try {
        const completedSentence = await fetchData(input);
        setCompletedSentence(completedSentence);
      } catch (error) {
        console.error('error', error);
      }
    },
    [],
  )


  useEffect(() => {
    console.log('comp' , completedSentence)
  }, [completedSentence])
  
  
  return (
    <div className="container">
      <h2>Tell me something, and I`&apos;ll tell you more</h2>
      <textarea
        value={input}
        onChange={(event) => {setInput(event.target.value)}}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick}>Complete Sentence</button>
      {completedSentence != null && <p>Completed sentence: {completedSentence}</p>}
    </div>
  );
}

export default App;
