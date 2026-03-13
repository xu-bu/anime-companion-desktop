export type MicState = "idle" | "recording" | "processing";

export class MicButton {
  private state: MicState = "idle";
  private button: HTMLButtonElement;
  private onRecordStart: () => void;
  private onRecordStop: () => void;

  constructor(onRecordStart: () => void, onRecordStop: () => void) {
    this.onRecordStart = onRecordStart;
    this.onRecordStop = onRecordStop;
    this.button = document.createElement("button");
    this.setupButton();
  }

  private setupButton(): void {
    this.button.classList.add("mic-button");
    this.button.innerHTML = this.getIcon();
    this.button.title = "Hold to record";

    // Hold to record
    this.button.addEventListener("mousedown", () => this.startRecording());
    this.button.addEventListener("mouseup", () => this.stopRecording());
    this.button.addEventListener("mouseleave", () => {
      if (this.state === "recording") this.stopRecording();
    });

    // Touch support
    this.button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.startRecording();
    });
    this.button.addEventListener("touchend", () => this.stopRecording());
  }

  private startRecording(): void {
    this.setState("recording");
    this.onRecordStart();
  }

  private stopRecording(): void {
    if (this.state !== "recording") return;
    this.setState("processing");
    this.onRecordStop();
  }

  setState(state: MicState): void {
    this.state = state;
    this.button.className = `mic-button ${state}`;
    this.button.innerHTML = this.getIcon();
  }

  private getIcon(): string {
    if (this.state === "recording") return "⏹";
    if (this.state === "processing") return "⏳";
    return "🎙";
  }

  render(): HTMLButtonElement {
    return this.button;
  }
}
