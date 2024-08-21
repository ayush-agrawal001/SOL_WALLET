import React, { useEffect, useState } from "react";
import { useMnemo } from "../context/keypair_mnemo";
import { useNavigate } from "react-router-dom";

const UserMnemonicShow: React.FC = () => {
    const context = useMnemo()
    const [mnemonic, setMnemonic] = useState<any>("")
    const [pubKey, setPubKey] = useState<any>()
    const [mnemoArray, setMnemoArray] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (mnemonic) {
            setMnemoArray(mnemonic.split(" "));
        }
    }, [mnemonic]);
    return(
        <div className="mnemonic">
            <button onClick={() => {setMnemonic(context?.getValue.mnemonic)}}>
                Show Mnemonic
            </button>
            <div className="mnemoSeperated">
                {mnemonic && (
                    <ol>
                        {mnemoArray.map((mnemoWord, index) => (
                            <li key={index}>{mnemoWord}</li>
                        ))}
                    </ol>
                )}
            </div>
            <button onClick={() => {navigate("/solwallet")}}> 
                Go to wallet
            </button>
        </div>
    )
}

export default UserMnemonicShow;