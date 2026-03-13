import { ChatWindow } from "./components/ChatWindow.js";

const app = document.getElementById("app")!;

const chatWindow = new ChatWindow();
app.appendChild(chatWindow.render());
