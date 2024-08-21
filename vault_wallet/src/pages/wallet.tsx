import React, { useCallback, useEffect, useState } from "react";
import { useMnemo } from "../context/keypair_mnemo";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey,sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const SOLWallet: React.FC = () => {
    const [balance, setBalance] = useState<number>()
    const [tpk, setTpk] = useState<string>()
    const context = useMnemo()
    const ExistSeedOrNot : boolean | undefined = context?.Eseed
    const userKeyPair = !ExistSeedOrNot ? context?.getValue.userKeyPair : context?.EUKP
    // console.log(userKeyPair?.secretKey)
    // console.log(userKeyPair?.publicKey)
    const conn = new Connection(clusterApiUrl("devnet"))
    const address = !ExistSeedOrNot ? (context ? new PublicKey(context?.getValue.userPubKey) : "") : (context ? new PublicKey(context?.EUPK) : "")

    const handleBalance = useCallback(async () => {
        const balValue = await conn.getBalance(address) 
        console.log(balValue)
        setBalance(balValue)
    }, [conn, address])

    const airdropFunc = useCallback(async() => {
        try {
            const signature = await conn.requestAirdrop(
                address,
                1 * LAMPORTS_PER_SOL
            )
    
            const {blockhash, lastValidBlockHeight} = await conn.getLatestBlockhash();
            await conn.confirmTransaction(
                {
                    blockhash,
                    lastValidBlockHeight,
                    signature
                },"finalized"
            )
            
            console.log(`signature :- ${signature}`)
        } catch (error) {
            throw error 
        }
    },[conn])

    useEffect(() => {if (context) {handleBalance()} }, [context, handleBalance])

    const sendSOL = useCallback(async () => {
        try{const transaction = new Transaction()

        const instructions = SystemProgram.transfer({
            fromPubkey : address,
            toPubkey : new PublicKey(tpk),
            lamports : 1000
        })
        transaction.add(instructions)
        const sign = await sendAndConfirmTransaction(conn, transaction, [userKeyPair])
        console.log(`Transaction of ${1000} Lamports from ${address} to ${tpk}`)
        console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${sign}?cluster=devnet`)
    }catch(error) {
        throw error
        console.log(error)
    }
    },[conn, sendAndConfirmTransaction, SystemProgram])

    return (
        <div>
            <h1>Hello from SOLWallet</h1>
            {balance}
            <h3>Your Public Key is {String(address)}</h3> 
            <button onClick={() => {airdropFunc()}}>airdrop</button>
            <input type="text" onChange={(e) => {setTpk(e.target.value)}} />
            <button onClick={() => {sendSOL()}}>Send SOL</button>

        </div>
    )
}

export default SOLWallet;