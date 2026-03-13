import { ChatBubble } from "./ChatBubble.js";
import type { Message } from "./ChatBubble.js";
import { MicButton } from "./MicButton.js";

export type OnSendCallback = (text: string) => void;
export type OnRecordStartCallback = () => void;
export type OnRecordStopCallback = () => void;

export class ChatWindow {
  private messages: Message[] = [];
  private wrapper: HTMLElement;
  private messageList: HTMLElement;
  private input: HTMLInputElement;
  private micButton: MicButton;

  constructor(
    onSend: OnSendCallback,
    onRecordStart: OnRecordStartCallback,
    onRecordStop: OnRecordStopCallback,
  ) {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("chat-wrapper");

    this.messageList = document.createElement("div");
    this.messageList.classList.add("chat-window");

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Say something...";
    this.input.classList.add("input-field");

    const sendButton = document.createElement("button");
    sendButton.classList.add("send-button");
    sendButton.textContent = "➤";

    this.micButton = new MicButton(onRecordStart, onRecordStop);

    const inputBar = document.createElement("div");
    inputBar.classList.add("input-bar");
    inputBar.appendChild(this.input);
    inputBar.appendChild(sendButton);
    inputBar.appendChild(this.micButton.render());

    sendButton.addEventListener("click", () => this.handleSend(onSend));
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleSend(onSend);
    });

    this.wrapper.appendChild(this.messageList);
    this.wrapper.appendChild(inputBar);
  }

  private handleSend(onSend: OnSendCallback): void {
    const text = this.input.value.trim();
    if (!text) return;
    this.addMessage("user", text);
    onSend(text);
    this.input.value = "";
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
    this.messageList.appendChild(bubble.render());
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  getMicButton(): MicButton {
    return this.micButton;
  }

  render(): HTMLElement {
    this.addMessage("ai", "Konnichiwa! How can I help you today? (˶˃ ᵕ ˂˶)");
    return this.wrapper;
  }
}
