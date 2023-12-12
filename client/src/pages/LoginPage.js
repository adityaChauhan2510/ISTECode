import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function LoginPage({ Data }) {

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = () => {
    try {
      axios
        .post(`http://localhost:3000/api/accounts/login`, {
          username_or_email: usernameOrEmail,
          password: password,
      })
        .then(({data}) => {
          if (data.success === false) {
            setMessage(data.message);
            return;
          }
          Data.setTokenFunction(data.token)
          Data.setIdFunction(data.id)
          navigate("/problemset");
        })
        .catch((e)=> {
          setMessage(e.response?.data?.message || "An error occurred during login.")
        });
    }
    catch (error) {
      console.log("Sign-up failed:", error);
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
          <h2 className="text-[34px] font-bold mb-[30px] text-center mt-[60px]"> Log In </h2>
          <div className="mb-4">
            <input
              className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none "
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required={true}
            />

          </div>
          <div className="mb-6">
            <input
              className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder: rounded border-borders leading-tight focus:outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 hover:bg-red-600 text-black font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full transition"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>


          <div className="flex items-center justify-between mt-[20px]">
            <span className="text-text_2">
              Don't have an account?{" "}
            </span>
            <Link to="/signup"> Signup </Link>
          </div>

          <div className="text-center mt-[20px] w-full overflow-hidden">
             {message}
          </div>

        </div>
      </div>
    </>

  )
}
