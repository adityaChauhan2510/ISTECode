import { useEffect, useState } from 'react';
import MainHeading from '../components/MainHeading';
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import axios from 'axios';



export default function LandingPage(props) {

    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);

    
    useEffect(() => {
        // if(id === null){
        //     setVerified(false);
        // }
        axios
            .get(`http://localhost:3000/api/accounts/id/${props.id}`, {
                headers: {
                    Authorization: props.token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
            })
            .catch((e) => {
                setVerified(false);
            });

    },);


    return (
        <div className='text-[14px] overflow-hidden h-screen'>
            {verified ?
                (< MainHeading data={{ username: username, status: "loggedin", }} />)
                :
                (< MainHeading data={{ status: "none", }} />)
            };

            

            {verified ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        <TypeAnimation
                            sequence={[
                                "Welcome back " + username + "!",
                                2000,
                                "Ready for more challenges," + username + "?",
                                2000,
                                "Let's dive in!",
                                2000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{
                                fontSize: "1em",
                                display: "inline-block",
                            }}
                        />
                    </h1>

                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 top-[300px]">
                        Elevate your coding skills, solve challenges, and excel in technical interviews.
                    </p>

                    <div className=" absolute top-[450px] left-1/2 -translate-x-1/2 z-50">
                        <Link to="/problemset">
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Get Started
                            </div>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        <TypeAnimation
                            sequence={[
                                "Solve",
                                2000,
                                "Learn",
                                2000,
                                "Practice",
                                2000,
                                "Start Now !",
                                5000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{
                                fontSize: "1em",
                                display: "inline-block",
                            }}
                        /></h1>

                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 top-[300px]">
                        Elevate your coding skills, solve challenges, and excel in technical interviews.
                    </p>

                    <div className=" absolute top-[450px] left-1/2 -translate-x-1/2 z-50">
                        <Link to="/login">
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Get Started
                            </div>
                        </Link>
                    </div>
                </>
            )};
        </div>
    );
};


