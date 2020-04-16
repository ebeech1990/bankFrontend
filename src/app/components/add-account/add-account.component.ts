import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  account = {
    nickname: '',
    balance: 0.0,
    status: false,
    transactions: []
  };
  submitted = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(){}

  saveAccount() {
    const data = {
      nickname: this.account.nickname
    };

    this.accountService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/accounts']);
        },
        error => {
          console.log(error);
        });
  }

  newAccount() {
    this.submitted = false;
    this.account = {
      nickname: '',
      balance: 0.0,
      status: false,
      transactions: []
    };
  }

}
