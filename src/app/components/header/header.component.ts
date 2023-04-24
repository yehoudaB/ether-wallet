import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  address!: string;
  balance! : string;
  constructor(private walletService: WalletService) {}

  async ngOnInit(): Promise<void> {
    this.connectWallet()
    
  }

   walletToggle() {
    if(!this.address) {
     this.connectWallet();
      return;
    }
    this.address = '';
    this.balance = '';

    
  }
  async connectWallet() {
    await this.walletService.connectWallet();
    this.address = this.walletService.address;
    this.balance = this.walletService.balanceEth;
    
  }
  

}
