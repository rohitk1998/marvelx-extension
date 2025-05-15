import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
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



// Suppose this is your keypair Uint8Array (64 bytes)
const getKeyFromPrivateKeyArray = (arr: Uint8Array) => {
  console.log(arr);
  const keypairUint8Array: Uint8Array = arr

  // Extract the first 32 bytes (secret key)
  const secretKey = keypairUint8Array.slice(0, 32);

  // Convert to base58 (common Solana format)
  const privateKeyBase58 = bs58.encode(secretKey);
  console.log('Private key (base58):', privateKeyBase58);

  // Optional: Convert to hex (not typically used in Solana)
  const privateKeyHex = Buffer.from(secretKey).toString('hex');
  console.log('Private key (hex):', privateKeyHex);

  return privateKeyHex
}

export {
  generateWalletAddress,
  getKeyFromPrivateKeyArray
}