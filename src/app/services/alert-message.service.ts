import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
	private messageEventSource = new BehaviorSubject({});
 	public  messageEventObservableSubject = this.messageEventSource.asObservable();
  constructor() { }



  //метод передаст сообщение компоненте alert-message 
  emitMessage(message: string) {
    this.messageEventSource.next(message);
  }
}
