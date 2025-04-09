import { Connection, Keypair,clusterApiUrl, Transaction, SystemProgram,LAMPORTS_PER_SOL,sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { Buffer } from 'buffer';

window.Buffer = Buffer;


const validateSolanaAddress = (address:string) => {
  try {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey.toBytes());
  } catch (error) {
    return false;
  }
};

const sendSolanaTransactionAndConfirm = async (privatekeyarr:Uint8Array,recipientaddress:string,amount:number) => {
    const newtwork:any = localStorage.getItem('network');
    const connection = new Connection(clusterApiUrl(newtwork), "confirmed");
    const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privatekeyarr));
    const recipientAddress = new PublicKey(recipientaddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientAddress,
        lamports: Number(Number(amount) * Number(LAMPORTS_PER_SOL))
      })
    );
    try {
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
      return signature;
    } catch (error) {
      console.error("Error Sending SOL:", error);
      return error;
    }
  };

  const sendSPLToken = async (
    privateKeyArr: Uint8Array,
    recipientAddress: string,
    tokenMintAddress: string,
    amount: number
  ) => {
    const network: any = localStorage.getItem('network');
    console.log('token network',network)
    const connection = new Connection(clusterApiUrl(network), 'confirmed');
    console.log('token connection',connection)
    const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArr));
    const recipientPubkey = new PublicKey(recipientAddress);
    console.log('token recipientPubkey',recipientPubkey)
    const mint = new PublicKey(tokenMintAddress);

    console.log('token mint',mint)
  
    try {
      const senderTokenAddress = await getAssociatedTokenAddress(mint, senderKeypair?.publicKey);
      const recipientTokenAddress = await getAssociatedTokenAddress(mint, recipientPubkey);
      console.log('token addresses : ',senderTokenAddress,recipientTokenAddress)
      try {
        await getAccount(connection, recipientTokenAddress);
      } catch (e) {
        throw new Error("Recipient's associated token account does not exist. You may need to create one.");
      }
  
      console.log('token addresses : ',senderTokenAddress,recipientTokenAddress)
      const transferIx = createTransferInstruction(
        senderTokenAddress,
        recipientTokenAddress,
        senderKeypair.publicKey,
        amount * (10 ** 9),
        [],
        TOKEN_PROGRAM_ID
      );
  
      const transaction = new Transaction().add(transferIx);
      console.log('transaction',transaction);
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
      console.log('signature',signature)
      return signature;
    } catch (error) {
      console.error('Error sending SPL token:', error);
      return error;
    }
  };

  export {
    sendSolanaTransactionAndConfirm,
    validateSolanaAddress,
    sendSPLToken
  }