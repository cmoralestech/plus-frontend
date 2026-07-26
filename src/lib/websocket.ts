type MessageHandler = (msg: any) => void;

const MAX_RETRIES = 8;
const BASE_DELAY = 1000;
const MAX_DELAY = 30000;

export class ChatSocket {
  private ws: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private token: string;
  private baseUrl: string;
  private retryCount = 0;
  private stopped = false;

  constructor(token: string) {
    this.token = token;
    const httpBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    this.baseUrl = httpBase.replace("http://", "ws://").replace("https://", "wss://");
  }

  connect() {
    if (this.stopped || this.ws?.readyState === WebSocket.OPEN) return;

    try {
      this.ws = new WebSocket(`${this.baseUrl}/ws/chat?token=${this.token}`);

      this.ws.onopen = () => {
        this.retryCount = 0; // Reset on successful connection
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handlers.forEach((handler) => handler(msg));
        } catch {}
      };

      this.ws.onclose = () => {
        if (!this.stopped) this.scheduleReconnect();
      };

      this.ws.onerror = () => {
        this.ws?.close();
      };
    } catch {
      if (!this.stopped) this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer || this.stopped) return;
    if (this.retryCount >= MAX_RETRIES) return; // Stop retrying

    const delay = Math.min(BASE_DELAY * Math.pow(2, this.retryCount), MAX_DELAY);
    this.retryCount++;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  sendTyping(conversationId: number) {
    if (this.ws?.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type: "typing", conversation_id: conversationId }));
  }

  send(conversationId: number, content: string) {
    if (this.ws?.readyState !== WebSocket.OPEN) return false;
    this.ws.send(
      JSON.stringify({
        type: "message",
        conversation_id: conversationId,
        content,
      })
    );
    return true;
  }

  onMessage(handler: MessageHandler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  disconnect() {
    this.stopped = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
    this.handlers.clear();
  }
}
