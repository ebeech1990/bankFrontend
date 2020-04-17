import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountDetailsComponent,
    AccountListComponent,
    AddAccountComponent,
    DepositComponent,
    TransactionDetailsComponent,
    TransferComponent,
    WithdrawalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
