import React, { createContext, useCallback, useContext } from "react";
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

interface MnemoProviderProps {
    children : React.ReactNode;
}

interface genMnemot {
    mnemonic : string
    userPubKey : string
}

interface MnemoProviderReturn {
    num : number
    getValue : () => genMnemot
}

const mnemoContext = createContext<MnemoProviderReturn | null>(null);

export const useMnemo = () => {return (useContext(mnemoContext))}

export const MnemoProvider: React.FC<MnemoProviderProps> = (props) => {
    const genMnemo = useCallback(() => {
        const mnemonic = generateMnemonic();
        const masterSeed = mnemonicToSeedSync(mnemonic)
        const derivedSeed = derivePath("m/44'/501'/0'/0'", masterSeed.toString("hex")).key
        const userKeyPair = Keypair.fromSeed(derivedSeed)
        const userPubKey = userKeyPair.publicKey.toBase58()
        return(
            {mnemonic, userPubKey}
        )
    },[generateMnemonic, mnemonicToSeedSync, derivePath, Keypair])
    
    return(
        <mnemoContext.Provider value={{num : 1, getValue : genMnemo}}>
            {props.children}
        </mnemoContext.Provider>
    )   
}

