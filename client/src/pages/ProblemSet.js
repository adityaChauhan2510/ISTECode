import React, { useEffect, useState } from 'react'
import MainHeading from '../components/MainHeading'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';


export default function ProblemSet(props) {

  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);




  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/accounts/id/${props.id}`, {
        headers: {
          Authorization: props.token,
        }
      })
      .then(({ data }) => {
        setUsername(data.username);
        setVerified(true);
        console.log('connected');
      })
      .catch((error) => {
        console.log(error);
        setVerified(false);
      });

  }, []);



  return (
    <>
      

      <div className='absolute'>
      {verified ? (
          <MainHeading data={{ username: username, status: "loggedin" }} />
        ) : (
          <MainHeading data={{ status: "none" }} />
        )};
      </div>
  </>
  );
};
