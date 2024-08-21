import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMnemo } from "../context/keypair_mnemo";

const ExistSeed: React.FC = () => {
    const navigate = useNavigate()
    const [pvtKey, setPvtKey] = useState<string>("")
    const context = useMnemo()
    
    return (
        <div>
            <h1>Hello from ExistSeed</h1>
            <input type="text" onChange={(e) => {setPvtKey(e.target.value)}}/>
            <button onClick={() => {
                context?.passESeed(pvtKey); 
                context?.isEseed(true)
                }}>Submit the Pvt Key</button>
            <button onClick={() => {navigate("/solwallet")}}>Go to SOL wallet</button>
        </div>
    )
}

export default ExistSeed;