import React from "react";
import { useNavigate } from "react-router-dom";

const Warning: React.FC = () => {
    const navigate = useNavigate()
    return(
        <div className="warning">
            <h1>Warning</h1>
            <h3> You are about to view your mnemonic phrase. Make sure you are in a private and secure environment. Do not share this phrase with anyone, as it can grant full access to your wallet and funds.</h3>
            <button onClick={() => {navigate("/newseed/usermnemonicshow")}}>Show The Mnemonic</button>
        </div>
    )
}

export default Warning;