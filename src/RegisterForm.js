import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Swal from 'sweetalert2'
import Footer from "./Footer.js"
import Header from "./Header";
import "./RegisterForm.css";
import SendRegisterForm from "./SendRegisterForm";

function RegisterForm() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
      setEmail(data.email);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'An error occured while fetching user data'
      })
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/register");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="registerform bg-dark">
    <Header loggedin={true} name={name}/>
    <div class="px-4 py-5 my-5 text-center text-white">
    <h1 class="display-5 fw-bold">Registration Form</h1>
    <br />
    <div class="col-lg-6 mx-auto">
    <SendRegisterForm user={user?.email} name={name} />
    </div>
    </div>
    <Footer />
    </div>
  );
}

export default RegisterForm;