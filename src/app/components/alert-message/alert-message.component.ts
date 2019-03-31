import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from "../../services/alert-message.service";
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
	resultMessage: string = '';

	constructor(
		public alertMessage: AlertMessageService
	) {}

	ngOnInit() {
		window.onload = function() {
		    document.getElementById('message').style.visibility = 'hidden';
		  };
		this.alertMessage.messageEventObservableSubject.subscribe((message: string) => {
		  this.resultMessage = message;
		  document.getElementById('message').style.visibility = 'visible';
		  setTimeout(function(){
			   document.getElementById('message').style.visibility = 'hidden';
			}, 3000); 
		});
	}
}
