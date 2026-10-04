import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false
})
export class TransactionsPage {
  constructor(public trxService: TransactionService) { }
}