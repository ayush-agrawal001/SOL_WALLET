import React from "react";
import { useNavigate } from "react-router-dom";

const Warning: React.FC = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Warning</h1>
            <button onClick={() => {navigate("/newseed/usermnemonicshow")}}>Show The Mnemonic</button>
        </div>
    )
}

export default Warning;