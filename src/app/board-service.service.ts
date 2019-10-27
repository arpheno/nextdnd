import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Subject} from 'rxjs';
import {Monster} from './api.service';


export interface Message {
  members: Monster[];
  author: string;
  encounterID: number;
  map: string;
  players: [],
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
          players: data.players,
          author: data.author,
          map: data.map,
          encounterID: data.encounterID,
        };
      });
  }
}
