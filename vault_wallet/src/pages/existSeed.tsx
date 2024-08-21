import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMnemo } from "../context/keypair_mnemo";
import {motion as m} from "framer-motion"

const ExistSeed: React.FC = () => {
    const navigate = useNavigate()
    const [pvtKey, setPvtKey] = useState<string>("")
    const [error, setError] = useState<string | null>(null);
    const context = useMnemo()
    
    const handleSubmit = () => {
        if ( pvtKey.length < 64 ) { // Basic validation, adjust as needed
            setError("Invalid private key. Please check and try again.");
            console.log("not 64")
            return;
        }else{
            try {
                context?.passESeed(pvtKey)
                context?.isEseed(true)
                navigate("/solwallet")
                console.log("trying")
            } catch (err) {
                setError("An error occurred. Please try again."); 
                console.log("error")
            }
        }
    }

    return (
        <m.main
        initial ={{x : "100%"}}
        animate ={{x : "0%"}}
        transition={{duration: 0.3, ease : "easeOut"}}
        exit={{opacity : 1}}
        className="eseedpage"
        >
        <div className="eSeed">
            <m.input 
                initial ={{x : "100%"}}
                animate ={{x : "0%"}}
                transition={{duration: 0.5, ease : "easeOut"}}
                type="text" placeholder="Enter Private Key" onChange={(e) => {setPvtKey(e.target.value)}}/>
            <div className="underline"></div> 
            <button onClick={() => {handleSubmit()}}
                >
                    Submit My Private Key
            </button>
            <p className="error">{error}</p>
        </div>
        </m.main>
    )
}

export default ExistSeed;