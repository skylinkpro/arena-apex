/**
 * WebSocket Configuration and Manager
 * Handles real-time communication with the backend
 */

type WebSocketEventHandler = (data: any) => void;
type WebSocketEventMap = {
  [key: string]: WebSocketEventHandler[];
};

class WebSocketManager {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private eventHandlers: WebSocketEventMap = {};
  private messageQueue: any[] = [];

  constructor() {
    this.url = import.meta.env.VITE_WS_URL || "ws://localhost:3001";
  }

  /**
   * Connect to WebSocket server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log("✅ WebSocket connected");
          this.reconnectAttempts = 0;
          // Send queued messages
          this.flushMessageQueue();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        this.ws.onerror = (error) => {
          console.error("❌ WebSocket error:", error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log("🔌 WebSocket disconnected");
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Send message to server
   */
  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message if not connected
      this.messageQueue.push(message);
    }
  }

  /**
   * Subscribe to event type
   */
  subscribe(action: string, handler: WebSocketEventHandler): () => void {
    if (!this.eventHandlers[action]) {
      this.eventHandlers[action] = [];
    }
    this.eventHandlers[action].push(handler);

    // Send subscription message
    this.send({
      type: "subscribe",
      action,
    });

    // Return unsubscribe function
    return () => this.unsubscribe(action, handler);
  }

  /**
   * Unsubscribe from event type
   */
  unsubscribe(action: string, handler: WebSocketEventHandler): void {
    if (this.eventHandlers[action]) {
      this.eventHandlers[action] = this.eventHandlers[action].filter(
        (h) => h !== handler
      );
    }
  }

  /**
   * Handle incoming message
   */
  private handleMessage(message: any): void {
    const { type, action, data } = message;

    // Emit to all handlers for this action
    if (this.eventHandlers[action]) {
      this.eventHandlers[action].forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in WebSocket handler for ${action}:`, error);
        }
      });
    }
  }

  /**
   * Flush queued messages
   */
  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.send(message);
    }
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `🔄 Reconnecting... (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      setTimeout(() => {
        this.connect().catch((error) => {
          console.error("Reconnection failed:", error);
        });
      }, this.reconnectDelay);
    } else {
      console.error("❌ Max reconnection attempts reached");
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export const wsManager = new WebSocketManager();

export default wsManager;
