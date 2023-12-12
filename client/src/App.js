import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProblemSet from "./pages/ProblemSet";


export const TOKEN_KEY = "authToken";
export const ID_KEY = "id";



function App() {

    const[token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const[id, setId] = useState(localStorage.getItem(ID_KEY));

    const changeToken = (string) => {
        setToken(string);
    };
    const changeId = (string) => {
        setId(string);
    };

    useEffect(() => {
        if(token){
            localStorage.setItem(TOKEN_KEY, token);
        }else{
            localStorage.removeItem(TOKEN_KEY);
        }

        if(id){
            localStorage.setItem(ID_KEY, id);
        }else{
            localStorage.removeItem(ID_KEY);
        }
    }, [token, id]);


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={< LandingPage token={token} id={id} />} />
                    <Route path = "/problemset" element = {<ProblemSet token={token} id={id} />} />

                    <Route path="/login" element = {< LoginPage 
                                Data={{
                                    token: token || "",
                                    setTokenFunction: changeToken,
                                    id: id || "",
                                    setIdFunction: changeId,
                                }}/>} 
                     />
                    <Route path ="/signup" element = {< SignupPage 
                                Data={{
                                    token: token || "",
                                    setTokenFunction: changeToken,
                                    id: id || "",
                                    setIdFunction: changeId,
                                }}/>} 
                    />

                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
