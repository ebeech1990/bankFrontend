import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidator} from '../../../validation/custom.validation';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup;
  currentAccount = null;
  submitted = false;
  gtg = false;



  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }



  ngOnInit() {
    this.getAccount(this.route.snapshot.paramMap.get('id'));
    this.depositForm = this.formBuilder.group({
        depositAmount: ['', [Validators.required, Validators.min(0), CustomValidator.numberValidator]],
      }
    );
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


  updateBalance(ubAmount) {
    const data = {
      amount: ubAmount

    };
    this.accountService.deposit(this.currentAccount.id, ubAmount, data)
      .subscribe(
        response => {
          this.currentAccount.balance = response;
          console.log(response);
          this.gtg = true;
        },
        error => {
          console.log(error);
        });
    // if (this.depositForm.invalid) {
    //   return;
    // }
  }

  goBack() {
    //this.location.back();
    this.router.navigate(['/accounts/' + this.currentAccount.id], {replaceUrl: true});
  }

  onSubmit() {
    this.submitted = true;
    if (this.depositForm.valid) {
      this.updateBalance(this.depositForm.value.depositAmount);
    }
  }
  get depositFormControl() {
    return this.depositForm.controls;
  }
}
