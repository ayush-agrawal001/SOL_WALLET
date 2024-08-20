import React, { useState } from "react";
import { useMnemo } from "../context/keypair_mnemo";

const UserMnemonicShow: React.FC = () => {
    const context = useMnemo()
    const [mnemonic, setMnemonic] = useState<any>("")
    const [pubKey, setPubKey] = useState<any>()

    return(
        <div>
            UserMnemonicShow
            {context?.num}
            <button onClick={() => {setMnemonic(context?.getValue().mnemonic)}}>
                Show Mnemonic
            </button>
            {mnemonic}
            <button onClick={() => {setPubKey(context?.getValue().userPubKey)}}> 
                Show PUBLIC KEY
            </button>
            {pubKey}
        </div>
    )
}

export default UserMnemonicShow;