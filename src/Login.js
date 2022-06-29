import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import Footer from "./Footer.js"
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login_page bg-dark">
    <Header />
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 content">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start text-white">
        <h1 className="display-4 fw-bold lh-1 mb-3">Investreet</h1>
        <p className="col-lg-10 fs-4">Investment Management Services </p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" onClick={() => logInWithEmailAndPassword(email, password)} type="submit">Login</button>
          <hr className="my-4" />
          <div className="w-100 btn btn-lg btn-outline-primary" onClick={signInWithGoogle}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/> <span>Sign in with Google</span>
          </div>
          <hr className="my-4" />
          <a href="/reset" className="btn btn-link">Forgot Password</a>
          <hr className="my-4" />
          <label className="btn-light">
            Don't have an account? 
            <br />
            <a href="/register" className="btn-link">Register now</a>
          </label>
        </form>
      </div>
    </div>
    </div>
    <Footer />
    </div>
  );
}

export default Login;
