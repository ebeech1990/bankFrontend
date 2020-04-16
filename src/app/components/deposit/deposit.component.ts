import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

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




  updateBalance(amount) {
    const data = {
      amount: amount

    };

    // this.accountService.update(this.currentAccount.id, data)
    this.accountService.deposit(this.currentAccount.id,this.amount,data)
      .subscribe(
        response => {
          this.currentAccount.balance = response;
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
