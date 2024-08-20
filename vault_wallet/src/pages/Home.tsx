import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    
    const navigate = useNavigate()
    return (
        <div>
            <h1>Hello from Home</h1>
            <button onClick={() => {navigate(`/option`)}}>Click me</button>
        </div>

    )
}

export default Home;