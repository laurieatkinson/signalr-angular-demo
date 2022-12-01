import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { IAccountModel } from './models/account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentAccount: IAccountModel = {
    username: '',
    accountNumber: ''
  }

  constructor(public signalRService: SignalrService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferActiveAccountsData();
    this.signalRService.addBroadcastAccountDataListener();   
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/account')
      .subscribe(res => {
        console.log(res);
      })
  }

  selectAccount = () => {
    this.signalRService.broadcastBroadcastActiveAccountData(this.currentAccount);
  }
}
