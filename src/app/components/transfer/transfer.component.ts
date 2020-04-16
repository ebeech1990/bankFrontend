import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  withdrawAccount = null;
  depositAccount = null;
  withdrawId: number;
  depositId: number;
    submitted = false;
    amount: number;
    accounts: any;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
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

  getWithdrawAccount(id){

    this.accountService.get(id)
    .subscribe(
      data => {
        this.withdrawAccount = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

  }

  getDepositAccount(id){

    this.accountService.get(id)
    .subscribe(
      data => {
        this.depositAccount = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

  }

  // getDepositAccount(){
  //
  // }

  withdrawFrom(amount) {
    const data = {
      amount: amount
    };
    this.accountService.withdraw(this.withdrawAccount.id,this.amount,data)
      .subscribe(
        response => {
          this.withdrawAccount.balance = response;
           console.log(response);
           this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  depositTo(amount) {
    const data = {
      amount: amount
    };
    this.accountService.deposit(this.depositAccount.id,this.amount,data)
      .subscribe(
        response => {
          this.depositAccount.balance = response;
           console.log(response);
           this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  updateBalance(amount){
    this.withdrawFrom(amount);
    this.depositTo(amount);
  }

goBack(){
 //this.location.back();
 this.router.navigate(['/accounts']);
}

  selected(){
    console.log(this.withdrawAccount);
  }
}
