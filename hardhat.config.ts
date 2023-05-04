import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


// create a task for accounts that will liste the accoutns that we get from the hardhat node and the balance  each account currently holds
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    const balance = await account.getBalance();
    
    console.log(account.address , balance.toString());

  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: {
    sources: "./contracts", 
    artifacts: "./src/artifacts",
  },
  networks : {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: "https://goerli.infura.io/v3/3f0f0b4b4b5c4b6b8b7a6a5a4a3a2a1a",
     // accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    sepolia: {
      chainId: 11155111,
      url: 'https://eth-sepolia.g.alchemy.com/v2/rO-vFS4QN5qxsKmhgCT24qRXcKYs6Xl_',
      accounts: ["f65581cdb38fa7498e9badbc774e0ecb0affba6da77cbe62d52413ee13024cce"] // this is my seploia account private key
     
    },
  },
};

export default config;

