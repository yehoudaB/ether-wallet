import { Injectable } from '@angular/core';
import {  ethers } from 'ethers';
import  EtherWallet  from '../../artifacts/contracts/EtherWallet.sol/EtherWallet.json';
import { BehaviorSubject } from 'rxjs';
import { WalletService } from './wallet.service';
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
 
  private ethBalanceSubject = new BehaviorSubject<string>('0');
  ethBalance$= this.ethBalanceSubject.asObservable();
  constructor(private  walletService: WalletService ) { }



  async getContractBallance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(this.contractAddress, EtherWallet.abi, provider);

    this.ethBalanceSubject.next(await  ethers.utils.formatEther( await contract['balanceOf']()));
  }    


  async deposit(amount: number) : Promise<boolean> {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.contractAddress, EtherWallet.abi, signer);
      console.log(contract)
      const transaction = await contract['deposit']({value: ethers.utils.parseEther(amount.toString())});
      console.log(transaction);
      await transaction.wait();
  
      this.getContractBallance();
      this.walletService.connectWallet();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

   

  }   

  public getContractAddress() {
    return this.contractAddress;
  } 

}
