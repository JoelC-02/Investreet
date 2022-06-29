import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Swal from 'sweetalert2'
import Footer from "./Footer";
import Header from "./Header";
import "./PersonalProfile.css";
import SendPersonalProfile from "./SendPersonalProfile";

function PersonalProfile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
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
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const [profiledata, setData] = useState({});
  useEffect(() => {
      fetch('http://localhost:9000/clientdata/personalprofile/'+user?.email+'')
      .then(res => res.json())
      .then(setData);
  }, [user, user?.email]);

  var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    var urlencoded = new URLSearchParams();
    urlencoded.append("Email", user?.email);
    urlencoded.append("ProfileImage", image.src);
    fetch("http://localhost:9000/clientdata/updateprofileimage", {
        method: 'POST',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencoded,
    })
    .then(response => response.text())
    .then(result => {
        console.log('Success:', result);
    })
  };


  return (
    <div className="content bg-dark">
    <Header loggedin={true} name={name}/>
    <div className="container-fluid personalprofile">
        <div className="bg-white rounded-lg d-block d-sm-flex">
            <div className="profile-tab-nav bg-dark text-white col-lg-2" style={{padding: 10}}>
                <a className="nav-link" id="dash-tab" href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span className="sideicon">Dashboard</span>
                </a>
                <div className="p-4">
                    <div class="profile-pic img-circle text-center mb-3">
                    <label class="-label" for="file">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                        </svg>
                        <span className="sideicon">Change Image</span>
                    </label>
                    <input id="file" type="file" onChange={loadFile}/>
                    <img src={profiledata.profileimage} id="output" alt="profileimage" className="shadow rounded-circle"/>
                    </div>
                    <h2 className="text-center">{name}</h2>
                </div>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active show" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                        </svg>
                       <span className="sideicon">Profile</span>
                    </a>
                    <a className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                        </svg>
                        <span className="sideicon">Change Password</span>
                    </a>
                </div>
            </div>
            <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div className="tab-pane fade active show" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <h3 className="mb-4">Profile Details</h3>
                    <SendPersonalProfile user={user?.email} data={profiledata}/>
                </div>
                <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                    <h3 className="mb-4">Password Settings</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Old password</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>New password</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Confirm new password</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </div>
  );
}

export default PersonalProfile;