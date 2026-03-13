export type MessageRole = 'user' | 'ai'

export interface Message {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
}

export class ChatBubble {
  private message: Message

  constructor(message: Message) {
    this.message = message
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.classList.add('bubble-wrapper', this.message.role)

    const bubble = document.createElement('div')
    bubble.classList.add('bubble')
    bubble.textContent = this.message.text

    const time = document.createElement('span')
    time.classList.add('bubble-time')
    time.textContent = this.message.timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    wrapper.appendChild(bubble)
    wrapper.appendChild(time)

    return wrapper
  }
}
