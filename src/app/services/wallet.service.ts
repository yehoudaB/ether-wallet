import { Injectable } from '@angular/core';
import {  ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  address!: string;
  provider!: ethers.providers.Web3Provider;
  signer!: ethers.providers.JsonRpcSigner;
  balance!: ethers.BigNumber;
  balanceEth!: string;
  constructor() { 

  }

  async connectWallet() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
    this.address = await this.signer.getAddress();
    let balance = await this.provider.getBalance(this.address);
    this.balanceEth = await  ethers.utils.formatEther(balance);
  }

}
