import React from "react";
import { useNavigate } from "react-router-dom";
import {Typewriter} from "react-simple-typewriter"
import {motion as m} from "framer-motion"

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <m.main
        initial ={{x : "100%"}}
        animate ={{x : "0%"}}
        transition={{duration: 0.3, ease : "easeOut"}}
        exit={{opacity : 1}}
        className="HomePage"
        >
            <div>
            <div className="HomeNavBar">
                <m.h1
                    initial ={{x : "100%"}}
                    animate ={{x : "0%"}}
                    transition={{duration: 0.5, ease : "easeOut"}}
                >
                    Welcome To Vault
                </m.h1>
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
        </m.main>
    )
}

export default Home;