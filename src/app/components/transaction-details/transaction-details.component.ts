import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  transactions: any;
  currentAccount = null;
  currentIndex = -1;
  currentTransaction = null;
  nickname = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(){
    this.getAccount(this.route.snapshot.paramMap.get('id'));
    this.retrieveTransactions();
  }

  getAccount(id) {
    this.accountService.get(id)
      .subscribe(
        data => {
          this.currentAccount = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveTransactions() {
    this.accountService.getAllTransactions(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.transactions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTransactions();
    this.currentTransaction = null;
    this.currentIndex = -1;
  }

  setActiveTransaction(transaction, index) {
    this.currentTransaction = transaction;
    this.currentIndex = index;
  }

  goBack(){
    this.location.back();
  }

}
