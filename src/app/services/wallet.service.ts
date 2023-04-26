import { Injectable } from '@angular/core';
import {  ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { WalletData } from '../models/WalletData';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private addressSubject = new BehaviorSubject<string>('');
  private ethBalanceSubject = new BehaviorSubject<string>('0');
  address$= this.addressSubject.asObservable();
  ethBalance$= this.ethBalanceSubject.asObservable();
  
  constructor() { 
    this.connectWallet(); 

  }

  async connectWallet()  {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address =  await signer.getAddress();
    let balance  = await provider.getBalance(address);
    this.addressSubject.next(address);
    this.ethBalanceSubject.next(await  ethers.utils.formatEther(balance));

  }

 
}
