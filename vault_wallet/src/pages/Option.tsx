import React from "react";
import { useNavigate } from "react-router-dom";
import {motion as m} from "framer-motion"

const Option: React.FC = () => {
    const navigate = useNavigate()
    
    return (
        <m.main
        initial ={{x : "100%"}}
        animate ={{x : "0%"}}
        transition={{duration: 0.3, ease : "easeOut"}}
        exit={{opacity : 1}}
        className="optionPage"
        >
        <div className="option">
            <m.button 
                initial ={{x : "100%"}}
                animate ={{x : "0%"}}
                transition={{duration: 0.2, ease : "easeOut"}}
                onClick={() => {navigate("/existseed")}}>From Existing Seed</m.button>
            <m.button 
                initial ={{x : "100%"}}
                animate ={{x : "0%"}}
                transition={{duration: 0.2, ease : "easeOut"}}
                onClick={() => {navigate("/newseed/warning")}}>Create New Wallet</m.button>
        </div>
        </m.main>
    )
}

export default Option;