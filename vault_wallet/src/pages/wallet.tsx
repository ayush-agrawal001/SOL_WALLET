import React, { useCallback, useEffect, useState } from "react";
import { useMnemo } from "../context/keypair_mnemo";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey,sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import HashLoader from "react-spinners/HashLoader";

const SOLWallet: React.FC = () => {
    const [balance, setBalance] = useState<number>()
    const [tpk, setTpk] = useState<string>()
    const context = useMnemo()
    const [error, setError] = useState<string | null>(null)
    const [amnt, setAmnt] = useState<any>()
    const [traConfirm, setTraConfirm] = useState<string>("")
    const [traLink, setTraLink] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [disableSend, setDisableSend] = useState<boolean>(false)

    const ExistSeedOrNot : boolean | undefined = context?.Eseed
    const userKeyPair = !ExistSeedOrNot ? context?.getValue.userKeyPair : context?.EUKP
    // console.log(userKeyPair?.secretKey)
    // console.log(userKeyPair?.publicKey)
    const conn = new Connection(clusterApiUrl("devnet"))
    const address = !ExistSeedOrNot ? (context ? new PublicKey(context?.getValue.userPubKey) : "") : (context ? new PublicKey(context?.EUPK) : "")

    const copyToClipboard = () => {
        navigator.clipboard.writeText(String(address))
        alert("Copied the text: " + address);
    };

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

    useEffect(() => {if (context) {handleBalance()} }, [context, handleBalance()])

    const sendSOL = useCallback(async () => {
        if (tpk?.length < 30){
            setError("Invalid Public key. Please check and try again.")
            console.log("not 64")
            return;
        }else{
            try{const transaction = new Transaction()
            const instructions = SystemProgram.transfer({
                fromPubkey : address,
                toPubkey : new PublicKey(tpk),
                lamports : amnt
            })
            transaction.add(instructions)
            const sign = await sendAndConfirmTransaction(conn, transaction, [userKeyPair])
            setTraConfirm(`Transaction of ${amnt} Lamports from ${address} to ${tpk}`)
            setTraLink(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${sign}?cluster=devnet`)
            setDisableSend(true)
            setLoading(true);
            setTimeout(() => {
                setLoading(false)
            }, 8000)
            }catch(error) {
                setError("error occured While sending the payment")
                console.log(error)
            }
        }

    },[conn, sendAndConfirmTransaction, SystemProgram])

    return (
        <div >
            {loading ?
                <HashLoader className="loader"
                    color= "#ffffff"
                    loading={loading}
                    size={150}
                    aria-label="Loading Square"
                    data-testid="loader"
                />
                :
                <div className="wallet">
                <h3 className="balance">Balance :- {balance / LAMPORTS_PER_SOL} SOL</h3>
                <h3>Your Public Key is :- {String(address)}</h3>
                <button onClick={() => {copyToClipboard()}}>Copy Address</button>
                <button className="airdrop" onClick={() => {airdropFunc()}}>airdrop</button>
                <span className="note">Airdrop takes some time or breaks as we are using DevNet </span>
                <input placeholder="Enter Public Id to Send" type="text" onChange={(e) => {setTpk(e.target.value)}} />
                <input placeholder="Enter number of Lamports to send" type="number" onChange={(e) => {setAmnt(e.target.value)}} />
                <button onClick={() => {sendSOL()}} disabled={disableSend}>Send Lamports</button>
                <p className="error">{error? error : ""}</p>
                <h4>{traConfirm}</h4>
                <h6>{traLink}</h6>
                </div>
            }

        </div>
    )
}

export default SOLWallet;