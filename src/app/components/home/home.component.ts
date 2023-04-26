import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit{
  address!: string;
  balance! : string;
  contractAddress!: string;
  contractBalance!: number;
  
  
  constructor(
    public walletService: WalletService,
    public contractService: ContractService
    ) {}

  async ngOnInit(): Promise<void> {
  }

  async onDeposit(amount: HTMLInputElement) {
    const  resp   = await this.contractService.deposit(Number(amount.value));
    if(resp) {
      amount.value = '';
    }
    console.log(resp);
  }

}
