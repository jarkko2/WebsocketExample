import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://localhost:5001";

export interface Message {
  author: string;
  message: string;
}

@Injectable({providedIn:'root'})
export class ChatService {
  onMessagesChanged: Subject<Message[]> = new Subject<Message[]>();
  messages: Message[] = []

  constructor(private wsService: WebsocketService) {}

  connectToWebSocket() {
    this.wsService.connect(CHAT_URL).subscribe({
      next: (messages: Message[]) => {
        // Update messages and send event for updates
        this.messages = messages;
        this.onMessagesChanged.next(this.messages);
      },
      error: (error: any) => {
        console.error("WebSocket error:", error);
      },
      complete: () => {
        console.log("WebSocket connection closed.");
      }
    });
  }

  sendMessageToWebSocket(message: Message) {
    this.wsService.sendMessage(message);
  }

  closeWebSocketConnection() {
    this.wsService.completeConnection();
  }
}
