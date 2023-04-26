import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  address!: string;
  balance! : Observable<string>;
  constructor(
    private walletService: WalletService,
    private contractService: ContractService
    ) {}

  async ngOnInit(): Promise<void> {
    this.connectWallet()
     console.log( await this.contractService.getContractBallance());
     
     this.walletService.address$.subscribe((address) => {
      this.address = address;
    });
    
    this.balance =  this.walletService.ethBalance$;
  }

   walletToggle() {
    if(!this.address) {
     this.connectWallet();
      return;
    }
    this.address = '';
    this.balance = of('0');

    
  }
  async connectWallet() {
    await this.walletService.connectWallet();  
  }
  getAddress() {
    return this.address;
  }
  

}
