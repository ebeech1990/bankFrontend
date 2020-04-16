import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: any;
  currentAccount = null;
  currentIndex = -1;
  nickname = '';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(){
    this.retrieveAccounts();
  }

  retrieveAccounts() {
    this.accountService.getAll()
      .subscribe(
        data => {
          this.accounts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveAccounts();
    this.currentAccount = null;
    this.currentIndex = -1;
  }

  setActiveAccount(account, index) {
    this.currentAccount = account;
    this.currentIndex = index;
  }

  removeAllAccounts() {
    this.accountService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveAccounts();
        },
        error => {
          console.log(error);
        });
  }

  searchNickname() {
    this.accountService.findByNickname(this.nickname)
      .subscribe(
        data => {
          this.accounts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
