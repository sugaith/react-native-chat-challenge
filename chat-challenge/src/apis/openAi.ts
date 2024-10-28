import OpenAI from 'openai'
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions'
import { IMessage } from 'react-native-gifted-chat'

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY || process.env.EXPO_PUBLIC_OPENAI_KEY,
  timeout: 9000,
})

async function fetchOpenAIResponse(messages: IMessage[]): Promise<string> {
  try {
    const formattedMessages: ChatCompletionCreateParamsBase['messages'] =
      messages.map((message) => ({
        role: message.user._id === 1 ? 'user' : 'assistant',
        content: message.text,
      }))

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: formattedMessages,
    })

    return response.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error fetching AI response:', error)
    return 'Error: Could not communicate with OpenAI.'
  }
}

export { fetchOpenAIResponse }
