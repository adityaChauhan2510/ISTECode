import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function MainHeading({ data }) {
    const [sidePanelState, setSidePanelState] = useState(false);
    const [notifDisplayState, setNotifDisplayState] = useState(false);


    return (
        <>
            <div className="fixed w-full h-[60px] bg-black border-b border-borders flex felx-row z-[100]">
                <Link to="/" className=" select-none">
                    <div id="logo-cont" className="inline-block text-[24px] font-bold italic mx-[36px] mt-[12px]">
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 px-[1px]"> ISTE</span>
                        <span className="font-extrabold text-transparent text-white">Code</span>
                    </div>
                </Link>

                {data.status == "loggedin" ? (
                    <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                        <Link to="/about" className="inline-block font-bold py-[6px] px-[16px] bg-black hover:bg-borders border rounded-md border-borders text-white text-[14px]">
                            About
                        </Link>
                        <Link to="/signout" className="ml-[8px] font-bold inline-block py-[6px] px-[16px] bg-gradient-to-r from-orange-500 to-red-600 border rounded-md border-borders text-black text-[14px] hover:bg-red-800">
                            Sign Out
                        </Link>
                    </div>

                ) : (

                    <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                        <Link to="/login" className="inline-block font-bold py-[6px] px-[16px] bg-black hover:bg-borders border rounded-md border-borders text-white text-[14px]">
                            Log In
                        </Link>
                        <Link to="/signup" className="ml-[8px] font-bold inline-block py-[6px] px-[16px] bg-gradient-to-r from-orange-500 to-red-600 border rounded-md border-borders text-black text-[14px] hover:bg-red-800">
                            Sign Up
                        </Link>
                    </div>

                )}
            </div>
        </>
    )
}
