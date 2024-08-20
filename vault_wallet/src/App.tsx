import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Option from "./pages/Option";
import ExistSeed from "./pages/existSeed";
import NewSeed from "./pages/newSeed";
import SOLWallet from "./pages/wallet";
import Warning from "./pages/warning";
import UserMnemonicShow from "./pages/userMnemonic";

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/option" element= {<Option />} />
          <Route path="/existseed" element= {<ExistSeed />} />
          <Route path="/newseed" element= {<NewSeed />} />
          <Route path="/newseed/warning" element= {<Warning />} />
          <Route path="/newseed/usermnemonicshow" element= {<UserMnemonicShow />} />
          <Route path="/solwallet" element= {<SOLWallet />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;