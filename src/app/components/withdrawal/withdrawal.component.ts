import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  currentAccount = null;
      submitted = false;
      amount: number;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(){
    this.getAccount(this.route.snapshot.paramMap.get('id'));
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




  updateBalance(balance) {
    const data = {
      balance: balance

    };


    this.accountService.withdraw(this.currentAccount.id,this.amount,data)
      .subscribe(
        response => {
          this.currentAccount.balance = balance-this.amount;
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  goBack(){
   //this.location.back();
   this.router.navigate(['/accounts/'+this.currentAccount.id], { replaceUrl: true });
  }

}
