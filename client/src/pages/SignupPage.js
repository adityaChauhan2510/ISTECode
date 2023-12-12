import React from 'react'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignupPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignUp =() =>{
        try {
            if(password !== confirmPassword){
                setMessage("Password and confirm password do not match.");
                return;
            }

            axios.post( '/auth/signup', {
                username : username,
                email : email,
                password : password,
            })
            .then((res) => {
                navigate("/problemset");
            })
            .catch((e) => {
                setMessage(e.message);
            });
        } 
        catch (err) {
            console.error("Sign-up failed:", err);
        }
    }

    return (
        <>
            <Link to={"/"}>
                <div id="logo-cont" className="inline-block relative text-[24px] left-1/2 -translate-x-1/2 font-bold italic mx-auto mt-[12px]">
                    <span>ISTE</span>
                    <span>Code</span>
                </div>
            </Link>

            <div className="min-h-fit w-[300px] mx-auto text-[14px]">
                <div className=" px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-[34px] font-bold mb-[30px] text-center mt-[60px]"> Sign Up </h2>
                    
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none "
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-orange-500 hover:bg-red-600 text-black font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full transition"
                            type="button"
                            onClick={handleSignUp}
                        >
                            Create Account
                        </button>
                    </div>


                    <div className="flex items-center justify-between mt-[20px]">
                        <span className="text-text_2">
                            Already have an account?{" "}
                        </span>
                        <Link to="/login"> Login </Link>
                    </div>

                    <div className="text-center mt-[20px] w-full overflow-hidden">
                        {message}
                    </div>

                </div>
            </div>


        </>
    )
}
