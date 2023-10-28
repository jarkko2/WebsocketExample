import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from "./chat.service";

@Injectable({providedIn:'root'})
export class WebsocketService {
  constructor() {}

  private websocketSubject: WebSocketSubject<any> | undefined;

  public connect(url: string): Observable<any> {
    this.websocketSubject = webSocket(url);
    return this.websocketSubject.asObservable();
  }

  public sendMessage(message: Message): void {
    if (this.websocketSubject) {
      this.websocketSubject.next(message);
    } else {
      console.error("WebSocket connection is not established.");
    }
  }

  public completeConnection(): void {
    if (this.websocketSubject) {
      this.websocketSubject.complete();
    }
  }
}
