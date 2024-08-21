import React from "react";
import { useNavigate } from "react-router-dom";

const Option: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="option">
            <button onClick={() => {navigate("/existseed")}}>From Existing Seed</button>
            <button onClick={() => {navigate("/newseed/warning")}}>Create New Wallet</button>
        </div>
    )
}

export default Option;