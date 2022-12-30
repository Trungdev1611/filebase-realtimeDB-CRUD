import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
const WrapperLogin = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 10px;
    display: flex;
    align-items: center;
    outline: none;
    border-radius: 10px;
    min-width: 300px;
    border: none;
    cursor: pointer;
    gap: 10px;
    justify-content: center;
    background-color: white;
    -webkit-box-shadow: 2px 2px 7px -6px #000000;
    box-shadow: 2px 2px 7px -6px #000000;
    color: grey;
    .icon {
      font-size: 20px;
    }
  }
`;
const LoginGoogleFirebase = () => {
  const navigate = useNavigate();

  function loginGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("thanh cong", user);
        localStorage.setItem("dataUser", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <WrapperLogin>
      <button onClick={loginGoogle}>
        <FcGoogle className="icon" />
        Login with Google
      </button>
    </WrapperLogin>
  );
};

export default LoginGoogleFirebase;
