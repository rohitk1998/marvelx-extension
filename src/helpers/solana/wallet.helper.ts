import * as bip39 from 'bip39';
import {derivePath} from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

const generateWalletAddress = async () => {
    const newMnemonic = bip39.generateMnemonic();
    console.log('newMnemonic', newMnemonic);
    const seed = await bip39.mnemonicToSeed(newMnemonic);
    console.log('seed', JSON.stringify(seed));
    console.log('see string', seed.toString('hex'));
    const derived = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derived);
    console.log('keypair', keypair.secretKey);
    const secretKey = bs58.encode(keypair.secretKey);
    console.log('secretPhrase', secretKey);
    const publicKey = keypair.publicKey.toBase58();
  
    return {
      privateKeyArr: keypair?.secretKey,
      secretPhrase: newMnemonic,
      privateKey: secretKey,
      publicKey: publicKey,
    };
  };


export {
    generateWalletAddress
}