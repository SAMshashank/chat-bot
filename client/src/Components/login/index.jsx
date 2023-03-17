import React, { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/aip";

function Login({ setUser, setSecret }) {
  const [isRegister, setRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ userName, password });
  };
  const handleRegister = () => {
    triggerSignUp({ userName, password });
    alert("You are registered successfully click to login ");
  };
  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(userName);
      setSecret(password);
    }
  }, [resultLogin.data]); //eslint-disable-line
  const buttonStyle = {
    background: "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
    border: "none",
    borderRadius: "4px",
    color: "white",
    padding: "12px 24px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-out",
  };

  //wallet
  const [errmessage, seterrormessage] = useState(null);

  const connectWallet = async (e) => {
    e.preventDefault();
    if (window.aptos) {
      const getAptosWallet = () => {
        if ("aptos" in window) {
          return window.aptos;
        } else {
          window.open("https://petra.app/", `_blank`);
        }
      };

      var wallet = getAptosWallet();
      try {
        var responseXX = await wallet.connect();

        const account = await wallet.account();
        setUserName(account.address);

        setchange("Connected");
      } catch (error) {
        alert(error);
      }
    } else {
      seterrormessage(alert("Install Petra Wallet first then proceed "));
      setchange("ConnectWallet");
    }
  };

  // const accountChanged = (accountName) => {
  //   setdefaultAcc(accountName);
  // };
  const [change, setchange] = useState("ConnectWallet");

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">APTL Assistant</h2>{" "}
        <button type="button" style={buttonStyle} onClick={connectWallet}>
          {change}
        </button>
        <p className="register-change" onClick={() => setRegister(!isRegister)}>
          {isRegister ? "Already a user" : "Are you a new user"}
        </p>
        <a href="../">How to user?</a>
        <div>
          <input
            className="login-input"
            type="text"
            placeholder="user address"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={true ? !userName && isRegister : false}
            required={true}
          />

          <input
            className="login-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
