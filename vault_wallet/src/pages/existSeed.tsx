import React from "react";
import { useNavigate } from "react-router-dom";

const ExistSeed: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Hello from ExistSeed</h1>
            <button onClick={() => {navigate("/solwallet")}}>Go to SOL wallet</button>
        </div>
    )
}

export default ExistSeed;