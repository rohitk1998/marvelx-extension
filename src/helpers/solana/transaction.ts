import { Connection, Keypair,clusterApiUrl, Transaction, SystemProgram,LAMPORTS_PER_SOL,sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";


const validateSolanaAddress = (address:string) => {
  try {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey.toBytes());
  } catch (error) {
    return false;
  }
};

const sendSolanaTransactionAndConfirm = async (privatekeyarr:Uint8Array,recipientaddress:string,amount:number) => {

    // ✅ Connect to Solana Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    console.log('connection',connection,privatekeyarr,recipientaddress);
  
    // ✅ Load sender wallet (Replace with your private key)
    const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privatekeyarr));
  
    console.log('senderKeypair',senderKeypair);
  
    // ✅ Define recipient wallet address
    const recipientAddress = new PublicKey(recipientaddress);
  
    console.log('SENDER:',senderKeypair.publicKey,'RECIPIENT:',recipientAddress);
    // ✅ Create a transfer instruction (0.1 SOL = 100_000_000 lamports)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientAddress,
        lamports: Number(Number(amount) * Number(LAMPORTS_PER_SOL)), // 0.1 SOL (1 SOL = 10^9 lamports)
      })
    );
  
    console.log('transaction',transaction);
  
    // ✅ Send the transaction
    try {
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
      console.log("✅ Transaction Successful! Tx Hash:", signature);
      return signature;
    } catch (error) {
      console.error("❌ Error Sending SOL:", error);
      return error;
    }
  };

  export {
    sendSolanaTransactionAndConfirm,
    validateSolanaAddress
  }