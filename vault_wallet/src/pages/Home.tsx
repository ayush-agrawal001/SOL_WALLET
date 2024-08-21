import React from "react";
import { useNavigate } from "react-router-dom";
import {Typewriter} from "react-simple-typewriter"

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
        <div className="HomeNavBar">
            <h1>Welcome To Vault</h1>
            <div className="typingAnime">
                <h3>Vault_is{"_"}</h3>
                <div>{"  "}</div>
                <h3>
                <Typewriter
                words={[' Secure', ' Decentralized', ' Unbreakable', ' Evolving!']}
                loop={10}
                cursor
                cursorStyle='_'
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}/>
                </h3>
            </div>
        </div>
        <div className="Home">
            <button onClick={() => {navigate(`/option`)}}>Get Started With Vault</button>
        </div>
        </div>

    )
}

export default Home;