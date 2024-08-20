import React from "react";
import { useNavigate } from "react-router-dom";

const NewSeed: React.FC = () => {
    const navigate = useNavigate()    
    return (
        <div>
            <h1>Hello from NewSeed</h1>
            <button onClick={() => {navigate("/newseed/usermnemonicshow")}}>Go to SOL wallet</button>
        </div>
    )
}

export default NewSeed;