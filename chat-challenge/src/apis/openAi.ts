import OpenAI from 'openai'
import {
  ChatCompletionContentPart,
  ChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions'
import { IMessage } from 'react-native-gifted-chat'

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY || process.env.EXPO_PUBLIC_OPENAI_KEY,
  timeout: 9000,
})

type IMessageBase64 = IMessage & { base64?: string }

async function fetchOpenAIResponse(
  messages: IMessageBase64[],
): Promise<string> {
  try {
    const formattedMessages: ChatCompletionCreateParamsBase['messages'] =
      messages.map((message) => {
        if (message.user._id === 1) {
          let content: ChatCompletionContentPart[]
          if (message.image) {
            content = [
              {
                type: 'text',
                text: 'Please describe this image and be enthisuastic and short',
              },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpg;base64,${message.base64}` },
              },
            ]
          } else {
            content = [{ type: 'text', text: message.text }]
          }

          return {
            role: 'user',
            content: content,
          }
        }

        return {
          role: 'assistant',
          content: message.text,
        }
      })

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
    })

    return response.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error fetching AI response:', error)
    return 'Error: Could not communicate with OpenAI.'
  }
}

export type { IMessageBase64 }
export { fetchOpenAIResponse }
