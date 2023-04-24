
import {expect} from 'chai';
import {ethers} from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
// example test
describe('EtherWallet', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const EtherWallet = await ethers.getContractFactory('EtherWallet');
        const etherWallet = await EtherWallet.deploy();
        return { etherWallet, owner, otherAccount };
    }

    describe('Deployment', function () {
        it('should deploy the contract and set the owner to be the deployer address', async function () {
            const { etherWallet , owner } = await loadFixture(deployFixture);
           expect(await etherWallet.owner()).to.equal(owner.address);
        });
    });
    
    describe('Send', function () {

    });     

    describe('Deposit', function () {
        
    });
    describe('Withdraw', function () {
        
    });


});


