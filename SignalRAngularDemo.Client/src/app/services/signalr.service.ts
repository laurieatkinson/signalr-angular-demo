import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Subject } from 'rxjs';
import { IAccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private activeAccountsSubject = new Subject<IAccountModel[]>();  
  private connectionEstablishedSubject = new Subject<boolean>();
  private connectionReconnectingSubject = new Subject<string>();

  activeAccounts$ = this.activeAccountsSubject.asObservable();
  connectionEstablished$ = this.connectionEstablishedSubject.asObservable();
  connectionReconnecting$ = this.connectionReconnectingSubject.asObservable();

  // activeAccounts: IAccountModel[];

  private hubConnection: signalR.HubConnection
    startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:5001/account')
                              .withAutomaticReconnect()
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));

      this.hubConnection.onreconnecting(error => {
        console.assert(this.hubConnection.state === signalR.HubConnectionState.Reconnecting);
        this.connectionReconnectingSubject.next(error.message);
      });

      this.hubConnection.onreconnected(connectionId => {
        console.assert(this.hubConnection.state === signalR.HubConnectionState.Connected);
        this.connectionReconnectingSubject.next(null);
      });
    }
    
    addTransferActiveAccountsData = () => {
      this.hubConnection
        .on('TransferActiveAccountsData', (data: IAccountModel[]) => {
          // this.activeAccounts = data;
          this.activeAccountsSubject.next([...data]);
          console.log(data);
        });
    }

    broadcastBroadcastActiveAccountData = (currentAccount: IAccountModel) => {
      this.hubConnection
        .invoke('BroadcastActiveAccountData', currentAccount)
        .catch(err => console.error(err));
    }

    addBroadcastAccountDataListener = () => {
      this.hubConnection
        .on('BroadcastActiveAccountData', (data: IAccountModel[]) => {
          // this.activeAccounts = data;
          this.activeAccountsSubject.next([...data]);
          console.log(data);
        })
    }
}
