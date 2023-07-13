import { ethers } from 'ethers';
export function generateRandomAccount() {
    const wallet = ethers.Wallet.createRandom();
    return wallet.address;
}
