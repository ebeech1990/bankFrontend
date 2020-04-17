import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidator} from '../../../validation/custom.validation';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  currentAccount = null;
      submitted = false;
      gtg = false;
  withdrawForm: FormGroup;
  newBal: number;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.getAccount(this.route.snapshot.paramMap.get('id'));
    this.withdrawForm = this.formBuilder.group({
        withdrawalAmount: ['', [Validators.required, Validators.min(0), CustomValidator.numberValidator]],
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
      balance: ubAmount

    };


    this.accountService.withdraw(this.currentAccount.id,ubAmount,data)
      .subscribe(
        response => {
          this.currentAccount.balance = response;
          this.newBal = this.currentAccount.balance;
          console.log(response);
          this.gtg = true;
        },
        error => {
          console.log(error);
        });
  }

  goBack(){
   //this.location.back();
   this.router.navigate(['/accounts/'+this.currentAccount.id], { replaceUrl: true });
  }

  onSubmit() {
    this.submitted = true;
    if (this.withdrawForm.valid) {
      this.updateBalance(this.withdrawForm.value.withdrawalAmount);
    }
  }
  get withdrawFormControl() {
    return this.withdrawForm.controls;
  }

}
