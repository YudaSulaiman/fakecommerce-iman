import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from 'react-toastify'

const SignInUpPages = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signUpState, setSignUpState] = useState(false);

  function switchState() {
    if (signUpState) setSignUpState(false);
    else setSignUpState(true);
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!signUpState) {
      const userData = {
        username: username,
        password: password,
      };

      axios
        .post("https://fakestoreapi.com/auth/login", userData)
        .then((response) => {
          console.log(response.status, response.data.token);
          if (response.status === 200) {
            localStorage.setItem("isLogin", true);
            location.replace("/");
            localStorage.setItem("toastMessage", "Login successful!");
          }
        })
        .catch((error) => {
          alert("Wrong username or password");
          setIsSubmitting(false);
          console.error("Error:", error);
        });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (signUpState) {
      const userData = {
        username: username,
        password: password,
        email: email,
      };

      axios
        .post("https://fakestoreapi.com/users", userData)
        .then((response) => {
          console.log(response.status, response.data.token);
          if (response.status === 200) {
            localStorage.setItem("isLogin", true);
            location.replace("/");
            localStorage.setItem("toastMessage", "Sign up successful!");
          }
        })
        .catch((error) => {
          alert("System error");
          setIsSubmitting(false);
          console.error("Error:", error);
        });
    }
  };

  const isButtonDisabled = !username || !password || isSubmitting;

  return (
    <div>
      <div className="signinup-container" style={{ display: "block" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />

        <div
          className={`container ${signUpState ? "right-panel-active" : ""}`}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            width: "768px",
            maxWidth: "100%",
            minHeight: "480px",
          }}
          id="container"
        >
          <div className="form-container sign-up-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button disabled={isButtonDisabled}>
                {isSubmitting ? "Loading" : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button disabled={isButtonDisabled}>
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" onClick={switchState}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button className="ghost" onClick={switchState}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUpPages;
