import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import React, { useEffect, useState } from 'react';
import "./Reset.css";
import Footer from "./Footer.js"
import Header from "./Header";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="reset bg-dark">
    <Header />
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 content">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start text-white">
        <h1 className="display-4 fw-bold lh-1 mb-3">Investreet</h1>
        <p className="col-lg-10 fs-4">Investment Management Services 
        <br />By ThreeFintech</p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" onClick={() => sendPasswordReset(email)} type="submit">Reset password</button>
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

export default Reset;