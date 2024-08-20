import React from "react";
import { useNavigate } from "react-router-dom";

const Option: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Hello from Option</h1>
            <button onClick={() => {navigate("/existseed")}}>From Existing Seed</button>
            <button onClick={() => {navigate("/newseed/warning")}}>New Wallet</button>
        </div>
    )
}

export default Option;