import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./firebase";
import "./Header.css";

function Header(props) {
    const [user] = useAuthState(auth);
    const [profiledata, setData] = useState({});
    useEffect(() => {
        fetch('http://localhost:9000/clientdata/personalprofile/'+user?.email+'')
        .then(res => res.json())
        .then(setData);
    }, [user, user?.email]);

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 h3">
                <li><a href="/dashboard" className="nav-link px-2 text-white">Investreet</a></li>
                </ul>
                {
                    (props.loggedin === true) ? 
                    <div class="dropdown text-end">
                    <a href="#" class="d-block link-light text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profiledata.profileimage} alt="profileimage" width="32" height="32" class="rounded-circle" />
                        <span className="dropname">{profiledata.name}</span>
                    </a>
                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="/personalprofile">Account Settings</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="/" onClick={logout}>Sign out</a></li>
                    </ul>
                    </div>
                    :
                    <div className="text-end">
                        <a href="/" className="btn btn-outline-warning me-4">Login</a>
                        <a href="/register" className="btn btn-outline-info">Register</a>
                    </div>
                }
            </div>
            </div>
        </header>
    );
}

export default Header;