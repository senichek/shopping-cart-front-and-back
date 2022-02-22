import React from "react";
import { useRef } from "react"; // It allows to reference the elements of html page.
import Button from "./Button";

function Login({ onLoginClick }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  return <div className="login-container">
       <form>
           <h2>Please enter your admin details</h2>
        <div className="form-control">
          <input ref={emailRef} type="email" placeholder="Email" required />
        </div>
        <div className="form-control">
          <input ref={passwordRef} type="password" placeholder="Password" required />
        </div>
      </form>
      <Button color={"#black"} text={"LOGIN"} click={() => onLoginClick(emailRef.current.value, passwordRef.current.value)} />
  </div>;
}

export default Login;
