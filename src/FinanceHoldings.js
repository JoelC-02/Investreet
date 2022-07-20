import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import Footer from "./Footer";
import Header from "./Header";

function FinanceHoldings() {
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

  const [fileInput, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", fileInput, `${user?.email}.pdf`);
    formdata.append("email", user?.email);
    fetch("http://localhost:9000/clientdata/uploadclientholdings", {
      method: 'POST',
      body: formdata
    })
    .then(response => response.text())
    .then(result => Swal.fire({
      icon: 'success',
      title: result
    }))
    .catch(error => Swal.fire({
      icon: 'error',
      title: error
    }));
  };

  var loadFile = function (event) {
    var file = event.target.files[0];
    setFile(file);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
      fetch('http://localhost:9000/clientdata/clientholdings/'+user?.email+'')
      .then(res => res.json())
      .then(setData)
  }, [user, user?.email]);

  useEffect(() => {
      showHide();
  }, [data]);

  function showHide() {
    var div = document.getElementById("hidden_div");
    if (data[0] === undefined) {
      div.style.display = 'none';
    } else {
      div.style.display = '';
    }
  }

  var sume=0, sumd=0, sumc=0;

  return (
    <div className="dashboard">
    <Header loggedin={true} name={name}/>
    <div className="container-fluid row">
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse text-white bg-dark text-start">
      <div className="position-sticky pt-3">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/dashboard" className="nav-link text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
        </svg>
          <span className="sideicon">Current Net Worth</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/financeholdings" className="nav-link active" aria-current="page">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bank" viewBox="0 0 16 16">
          <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
          </svg>
        <span className="sideicon">Finance Holdings</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/financeprofile" className="nav-link text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
          <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1ZM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V8Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"/>
        </svg>
        <span className="sideicon">Finance Profile</span>
          </a>
        </li>
      </ul>
      </div>
      </nav>
    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{minHeight:"calc(100vh - 108px)"}}>
      <h3 style={{paddingTop: 20}}>Finance Holdings</h3>
      <form onSubmit={handleSubmit}  style={{width: "60%", margin: "auto", paddingTop: 20}}>
        <div class="file-loading"> 
          <input name="filedata" type="file" class="file" data-preview-file-type="text" data-show-upload="true" data-drop-zone-enabled="false" data-max-file-count="1"  data-msg-placeholder="Select PDF file for upload" data-allowed-file-extensions='["pdf"]' data-browse-label="Browse" data-browse-class="btn btn-outline-primary" data-remove-class="btn btn-outline-danger" data-upload-class="btn btn-outline-success" data-preview-class="bg-light" onChange={loadFile}/>
        </div>
      </form>
      <div style={{paddingTop: "30px", paddingBottom: "30px", width: "80%", margin: "auto"}} id="hidden_div">
        <h3>Equity</h3>
        <table class="table table-hover table-striped col">
        <thead>
            <tr>
            <th scope="col">Fund/Scheme/Plan</th>
            <th scope="col">Unit Holding</th>
            <th scope="col">Current Value ₹</th>
            </tr>
        </thead>
        <tbody>
        {
          data.map((element) => {
              if(element.type === 'Equity') {
                sume = sume + element.value/1;
                return (
                  <tr>
                  <td scope="row">{element.fundname}</td>
                  <td scope="row">{element.holding}</td>
                  <td scope="row">{element.value}</td>
                  </tr>
                );
            }
          })
        }
        </tbody>
        <thead style={{"background-color": "lightgrey"}}>
        <th scope="row"></th>
        <th scope="row">Equity Total</th>
        <th scope="row">{sume}</th>
        </thead>
        </table>
        <h3>Debt</h3>
        <table class="table table-hover table-striped col">
        <thead>
            <tr>
            <th scope="col">Fund/Scheme/Plan</th>
            <th scope="col">Unit Holding</th>
            <th scope="col">Current Value ₹</th>
            </tr>
        </thead>
        <tbody>
        {
          data.map((element) => {
              if(element.type === 'Debt') {
                sumd = sumd + element.value/1;
                return (
                  <tr>
                  <td scope="row">{element.fundname}</td>
                  <td scope="row">{element.holding}</td>
                  <td scope="row">{element.value}</td>
                  </tr>
                );
              }
          })
        }
        </tbody>
        <thead style={{"background-color": "lightgrey"}}>
        <th scope="row"></th>
        <th scope="row">Debt Total</th>
        <th scope="row">{sumd}</th>
        </thead>
        </table>
        <h3>Cash</h3>
        <table class="table table-hover table-striped col">
        <thead>
            <tr>
            <th scope="col">Fund/Scheme/Plan</th>
            <th scope="col">Unit Holding</th>
            <th scope="col">Current Value ₹</th>
            </tr>
        </thead>
        <tbody>
        {
          data.map((element) => {
              if(element.type === 'Cash') {
                sumc = sumc + element.value/1;
                return (
                  <tr>
                  <td scope="row">{element.fundname}</td>
                  <td scope="row">{element.holding}</td>
                  <td scope="row">{element.value}</td>
                  </tr>
                );
              }
          })
        }
        </tbody>
        <thead style={{"background-color": "lightgrey"}}>
        <th scope="row"></th>
        <th scope="row">Cash Total</th>
        <th scope="row">{sumc}</th>
        </thead>
        </table>
        <h3>Total Portfolio: ₹ {sume + sumd + sumc}</h3>
      </div> 
  </div>
  </div>
  <Footer />
  </div>
  );
}

export default FinanceHoldings;