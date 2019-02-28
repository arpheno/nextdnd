import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Subject} from 'rxjs';
import {Monster} from './api.service';
import {AUTHOR_ID} from './utils';


export interface Message {
  members: Monster[],
  author: string
}

@Injectable()
export class BoardServiceService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    const CHAT_URL = `ws://${window.location.hostname}:8000/ws/chat/`;
    this.messages = <Subject<Message>> wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          members: data.members,
          author: data.author,
        };
      });
  }
}
