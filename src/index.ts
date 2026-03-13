import { ChatWindow } from './components/ChatWindow.js'

const app = document.getElementById('app')!

const chatWindow = new ChatWindow(
  // onSend
  (text: string) => {
    console.log('user sent:', text)
    // TODO: call Ollama API and add AI response
  },
  // onRecordStart
  () => {
    console.log('recording started...')
    // TODO: start mic recording via audio.ts
  },
  // onRecordStop
  () => {
    console.log('recording stopped...')
    // TODO: send audio to Whisper STT
  }
)

app.appendChild(chatWindow.render())