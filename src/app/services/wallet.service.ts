import { Injectable } from '@angular/core';
import {  ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { WalletData } from '../models/WalletData';
import { Alchemy, AssetTransfersCategory, Network, OwnedNftsResponse, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { Observable, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private addressSubject = new BehaviorSubject<string>('');
  private ethBalanceSubject = new BehaviorSubject<string>('0');
  address$= this.addressSubject.asObservable();
  ethBalance$= this.ethBalanceSubject.asObservable();
  
  latestBlock = 0;
  tokenBalance!: TokenBalancesResponseErc20;
  nfts!:OwnedNftsResponse;



  config = {
    apiKey: "rO-vFS4QN5qxsKmhgCT24qRXcKYs6Xl_",
    network:  Network.ETH_SEPOLIA ,
  };

  


  alchemy = new Alchemy(this.config);
  ethBalance!: ethers.BigNumber;
  
  constructor() { 
    this.connectWalletWithAlchemy();
     
  }
  
  getBlockNumber(): Observable<number> {
    return from(this.alchemy.core.getBlockNumber());
  }
  
  


  async alchemyInit(address: string) { 
    this.latestBlock =  await this.alchemy.core.getBlockNumber();

    const data = await this.alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155, ],
    });

    this.nfts = await this.alchemy.nft.getNftsForOwner(address);
    this.tokenBalance =  await this.alchemy.core.getTokenBalances(address)
    // alchemy get eth balance
    this.ethBalance = await this.alchemy.core.getBalance(address)

    console.log(this.latestBlock )
    console.log(this.nfts);
    console.log(data);
    console.log(this.tokenBalance);
    console.log(this.ethBalance);
  }

  async  logs() { // for contract
    const getLogs = await this.alchemy.core.getLogs({
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        ],
        blockHash:
          "0x49664d1de6b3915d7e6fa297ff4b3d1c5328b8ecf2ff0eefb912a4dc5f6ad4a0",
    });
    console.log(getLogs);
  }
  
  async connectWalletWithEthers()  {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address =  await signer.getAddress();
    let balance  = await provider.getBalance(address);
    this.addressSubject.next(address);
    this.ethBalanceSubject.next(await  ethers.utils.formatEther(balance));
  }

  async connectWalletWithAlchemy()  {
    const address2 = await window.ethereum.request
    const address = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address[0], 'latest'] })
    
    this.addressSubject.next(address[0]);
    this.ethBalanceSubject.next(await  ethers.utils.formatEther(balance));

  }
  

 
}
