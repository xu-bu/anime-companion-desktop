# anime-companion-desktop

Electron-based desktop frontend for the AI Anime Companion project.

## File Structure

```
anime-companion-desktop/
│
├── main.js                         # Electron entry point, creates BrowserWindow
├── preload.js                      # Bridge between main process and renderer
├── package.json
├── package-lock.json
├── .gitignore
├── AGENT.md
│
├── src/                            # Renderer process (UI)
│   ├── index.html                  # App shell
│   ├── index.ts                    # Renderer entry point
│   │
│   ├── components/
│   │   ├── ChatWindow.ts           # Scrollable chat message list
│   │   ├── ChatBubble.ts           # Individual message bubble (user / AI)
│   │   ├── MicButton.ts            # Hold-to-record mic button
│   │   └── StatusBar.ts            # Connection status indicator
│   │
│   ├── services/
│   │   ├── ollama.ts               # Calls Ollama API (character brain)
│   │   ├── tts.ts                  # Calls GPT-SoVITS API (character voice)
│   │   ├── stt.ts                  # Calls Whisper STT (speech to text)
│   │   └── audio.ts                # Handles mic recording and audio playback
│   │
│   ├── store/
│   │   └── chatHistory.ts          # In-memory conversation history
│   │
│   ├── types/
│   │   └── index.ts                # Shared TypeScript interfaces/types
│   │
│   └── styles/
│       └── main.css                # Global styles
│
└── assets/
    ├── icon.png                    # App icon
    └── sounds/
        └── startup.wav             # Optional startup sound
```

## Process Architecture

```
Main Process (main.js)
│   - Creates the app window
│   - Handles system-level PC control
│   - Communicates with renderer via preload.js
│
└── Renderer Process (src/)
        - Chat UI
        - Calls backend APIs (Ollama, GPT-SoVITS, Whisper)
        - Handles mic recording and audio playback
```

## Backend Dependencies (separate project)

```
ASP.NET Core API
    ├── POST /chat        → Ollama (character reply)
    ├── POST /tts         → GPT-SoVITS (text to speech)
    ├── POST /stt         → Whisper (speech to text)
    └── POST /control     → PC control commands (future)
```
