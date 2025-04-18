import { Connection, Keypair,clusterApiUrl, Transaction, SystemProgram,LAMPORTS_PER_SOL,sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { API_URL } from "../../constants";



const validateSolanaAddress = (address:string) => {
  try {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey.toBytes());
  } catch (error) {
    return false;
  }
};

const sendSolanaTransactionAndConfirm = async (privatekeyarr:Uint8Array,recipientaddress:string,amount:number) => {
  console.log('privatekeyarr',privatekeyarr);
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
      throw error;
    }
  };


  const sendSolToken = async (privatekeyarr:Uint8Array,recipientaddress:string,tokenMintAddress:string,amount:number) => {
    const network:any = localStorage.getItem('network');
    try {
      const signature = await axios.post( API_URL.sendSolToken, {
        privateKeyArr:privatekeyarr,
        recipientAddress:recipientaddress,
        tokenMintAddress:tokenMintAddress,
        amount:amount,
        network:network
      })
      return signature;
    } catch (error) {
      console.error("Error Sending SOL:", error);
      throw error;
    }
  };

  export {
    sendSolanaTransactionAndConfirm,
    validateSolanaAddress,
    sendSolToken
  }