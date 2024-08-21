import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"

interface MnemoProviderProps {
    children : React.ReactNode;
}

interface genMnemot {
    mnemonic? : string
    userPubKey : string
    userKeyPair : Keypair
}

interface MnemoProviderReturn {
    getValue : genMnemot
    EUPK : string
    EUKP  : Keypair | undefined
    isEseed : React.Dispatch<React.SetStateAction<boolean>>
    Eseed : boolean
    passESeed : (arg : string) => genMnemot
}

const mnemoContext = createContext<MnemoProviderReturn | null>(null);

export const useMnemo = () => {return (useContext(mnemoContext))}

export const MnemoProvider: React.FC<MnemoProviderProps> = (props) => {

    const [isFromEseed, setIsFromEseed] = useState<boolean>(false)
    const [eUserPubKey, setEuserPubKey] = useState<string>("")  
    const [eUserKeyPair, setEuserKeyPair] = useState<Keypair>()  

    const genMnemo = useMemo(() => {
        const mnemonic = generateMnemonic();
        const masterSeed = mnemonicToSeedSync(mnemonic)
        const derivedSeed = derivePath("m/44'/501'/0'/0'", masterSeed.toString("hex")).key
        const userKeyPair = Keypair.fromSeed(derivedSeed)
        const userPubKey = userKeyPair.publicKey.toBase58()
        return(
            {mnemonic, userPubKey, userKeyPair}
        )
    },[generateMnemonic, mnemonicToSeedSync, derivePath, Keypair])
    
    const fromExist = useCallback((secretKey : string) => {
        const userKeyPair = Keypair.fromSecretKey(bs58.decode(secretKey))
        const userPubKey = userKeyPair.publicKey.toBase58()
        setEuserPubKey(userPubKey)
        setEuserKeyPair(userKeyPair)
        return ({userPubKey, userKeyPair})
    }, [useCallback])

    return(
        <mnemoContext.Provider value={{getValue : genMnemo, EUPK : eUserPubKey, EUKP : eUserKeyPair, isEseed : setIsFromEseed, Eseed : isFromEseed, passESeed : fromExist}}>
            {props.children}
        </mnemoContext.Provider>
    )   
}

