import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

const fakeConversation: ChatCompletionRequestMessage[] = [
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '以下が10個のリストです。* りんご* みかん* バナナ* グレープフルーツ* レモン* ストロベリー* ブルーベリー* ラズベリー* ブラックベリー* キウイフルーツ',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: 'ありがとうございます。地球の磁場について詳しく教えてください。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: 'ありがとうございます。地球の磁場について詳しく教えてください。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: 'ありがとうございます。地球の磁場について詳しく教えてください。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: 'ありがとうございます。地球の磁場について詳しく教えてください。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: 'ありがとうございます。地球の磁場について詳しく教えてください。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球の磁場は、地球の内部にある液体の外核の運動によって発生します。この磁場は、地球を取り巻く磁気圏として知られ、地球を太陽風や宇宙線から保護する役割を果たしています。また、地球上のコンパスは地球の磁場に基づいています。しかし、地球の磁場は長期的には変動しており、約200,000年ごとに南北極が逆転することが知られています。',
  },
  { role: ChatCompletionRequestMessageRoleEnum.User, content: '地球と宇宙の関係にはどのような影響がありますか？' },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      '地球と宇宙の関係には、多くの影響があります。例えば、地球の磁場は太陽風からの荷電粒子の影響を受け、大気中のオゾン層は太陽からの紫外線によって形成されます。また、地球の自転周期は月や他の天体の引力に影響され、海の潮汐の発生に関与しています。さらに、宇宙空間からの宇宙線は、地球上で電子機器の誤作動や人体に対する放射線被ばくなど、多様な影響を及ぼします。これらの影響は、地球と宇宙の関係が密接に関わっていることを示しています。',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content:
      '以下が10個のリストです。* りんご* みかん* バナナ* グレープフルーツ* レモン* ストロベリー* ブルーベリー* ラズベリー* ブラックベリー* キウイフルーツ',
  },
];

export default fakeConversation;
