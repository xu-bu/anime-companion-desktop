import { ChatBubble } from "./ChatBubble.js";
import type { Message } from "./ChatBubble.js";

export class ChatWindow {
  private messages: Message[] = [];
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("chat-window");
  }

  addMessage(role: "user" | "ai", text: string): void {
    const message: Message = {
      id: crypto.randomUUID(),
      role,
      text,
      timestamp: new Date(),
    };

    this.messages.push(message);

    const bubble = new ChatBubble(message);
    this.container.appendChild(bubble.render());

    // Auto scroll to bottom
    this.container.scrollTop = this.container.scrollHeight;
  }

  render(): HTMLElement {
    // Demo messages to verify UI is working
    this.addMessage("ai", "Konnichiwa! How can I help you today? (˶˃ ᵕ ˂˶)");
    this.addMessage("user", "Hello!");

    return this.container;
  }
}
