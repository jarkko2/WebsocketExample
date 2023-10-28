import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = "";
  author: string = "";
  messages: Message[] = []

  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    // Connect to server
    this.chatService.connectToWebSocket();

    // Listen to chatservice message changes and update
    this.chatService.onMessagesChanged.subscribe((response) => 
    {
      this.messages = response
    })
  }

  sendMsg() {
    const message = {author: this.author, message: this.message}
    this.chatService.sendMessageToWebSocket(message)
  }
}
