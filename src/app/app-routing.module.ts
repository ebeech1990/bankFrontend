import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransferComponent } from './components/transfer/transfer.component';


const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/:id', component: AccountDetailsComponent },
  { path: 'add', component: AddAccountComponent },
  { path: 'accounts/:id/deposit', component: DepositComponent },
  { path: 'accounts/:id/withdraw', component: WithdrawalComponent },
  { path: 'accounts/:id/transactions', component: TransactionDetailsComponent },
  { path: 'transfer', component: TransferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
