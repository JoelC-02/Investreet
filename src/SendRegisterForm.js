import React from "react";
import "./SendRegisterForm.css";

class SendRegisterForm extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
          Name: this.props.name,
          Email: this.props.user,
          Contact: 0,
          Age: 0,
          Married: null,
          Children: null,
          Dependent: null,
          Income: 0,
          Expenditure: 0,
          EMI: 0,
          EquityAdditions: 0,
          MFSIP: 0,
          Crypto: 0,
          Insurance: 0,
          Source: null,
          EquityPortfolio: 0,
          MutualPortfolio: 0,
          CryptoPortfolio: 0,
          GoldPortfolio: 0,
          EstatePortfolio: 0,
          LiquidPortfolio: 0,
          Saving: 0,
          FixedDeposit: 0,
          Alternate: 0,
          FinancialGoals: 0,
          RetirementGoal: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.urlencoded = new URLSearchParams();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.urlencoded.append("Name", this.props.name);
        this.urlencoded.append("Email", this.state.Email);
        this.urlencoded.append("Contact", this.state.Contact);
        this.urlencoded.append("Age", this.state.Age);
        this.urlencoded.append("Married", this.state.Married);
        this.urlencoded.append("Children", this.state.Children);
        this.urlencoded.append("Dependent", this.state.Dependent);
        this.urlencoded.append("Income", this.state.Income);
        this.urlencoded.append("Expenditure", this.state.Expenditure);
        this.urlencoded.append("EMI", this.state.EMI);
        this.urlencoded.append("EquityAdditions", this.state.EquityAdditions);
        this.urlencoded.append("MFSIP", this.state.MFSIP);
        this.urlencoded.append("Crypto", this.state.Crypto);
        this.urlencoded.append("Insurance", this.state.Insurance);
        this.urlencoded.append("Source", this.state.Source);
        this.urlencoded.append("EquityPortfolio", this.state.EquityPortfolio);
        this.urlencoded.append("MutualPortfolio", this.state.MutualPortfolio);
        this.urlencoded.append("CryptoPortfolio", this.state.CryptoPortfolio);
        this.urlencoded.append("GoldPortfolio", this.state.GoldPortfolio);
        this.urlencoded.append("EstatePortfolio", this.state.EstatePortfolio);
        this.urlencoded.append("LiquidPortfolio", this.state.LiquidPortfolio);
        this.urlencoded.append("Saving", this.state.Saving);
        this.urlencoded.append("FixedDeposit", this.state.FixedDeposit);
        this.urlencoded.append("Alternate", this.state.Alternate);
        this.urlencoded.append("FinancialGoals", this.state.FinancialGoals);
        this.urlencoded.append("RetirementGoal", this.state.RetirementGoal);
        this.urlencoded.append("ProfileImage", 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg');
        fetch("http://localhost:9000/clientdata/registerform", {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: this.urlencoded,
        })
        .then(response => response.text())
        .then(result => {
          console.log('Success:', result);
          window.location.href="/dashboard"; 
        })
        .catch((error) => {
          console.error('Error:', error);
          alert("Kindly resubmit the form");
        });
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      return (
        <form className="content text-start" id="submit_job" autoComplete="on" onSubmit={this.handleSubmit}>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Client Details</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Income/Expense Information</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Financial Assets and Goals</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="row">
              <div class="mb-3 col-6">
                <label for="Name" class="form-label required">Full Name</label>
                <input type="text" class="form-control" name="Name" id="Name" value={this.props.name} onChange={this.handleChange} readOnly required/>
              </div>
              <div class="mb-3 col-6">
                <label for="Email" class="form-label required">Email address</label>
                <input type="email" class="form-control" name="Email" id="Email" value={this.props.user} onChange={this.handleChange} readOnly required/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="Contact" class="form-label">Contact Number</label>
                <input type="text" class="form-control" name="Contact" id="Contact" pattern="[0-9]{10}" maxlength="10" placeholder="10 digits" onChange={this.handleChange}/>
              </div>
              <div class="mb-3 col-6">
                <label for="Age" class="form-label required">Age</label>
                <input type="number" class="form-control" name="Age" id="Age" onChange={this.handleChange} required/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="Married" class="form-label required">Are you Married?</label>
                <br />
                <input class="form-check-input" type="radio" name="Married" id="Married-Yes" value="Yes" onChange={this.handleChange} required/>
                <label class="form-check-label" for="Married-Yes">Yes</label>
                <br />
                <input class="form-check-input" type="radio" name="Married" id="Married-No" value="No" onChange={this.handleChange} />
                <label class="form-check-label" for="Married-No">No</label>
              </div>
              <div class="mb-3 col-6">
                <label for="Children" class="form-label required" onChange={this.handleChange}>Number of children</label>
                <br />
                <input class="form-check-input" type="radio" name="Children" id="Children-0" value="0" onChange={this.handleChange} required/>
                <label class="form-check-label" for="Children-0">0</label>
                <br />
                <input class="form-check-input" type="radio" name="Children" id="Children-1" value="1" onChange={this.handleChange} />
                <label class="form-check-label" for="Children-1">1</label>
                <br />
                <input class="form-check-input" type="radio" name="Children" id="Children->1" value=">1" onChange={this.handleChange} />
                <label class="form-check-label" for="Children->1">More than 1</label>
              </div>
              </div>
              <div class="mb-3 col-6">
                <label for="Dependent" class="form-label required">Do you have any dependent?</label>
                <br />
                <input class="form-check-input" type="radio" name="Dependent" id="Dependent-Yes" value="Yes" onChange={this.handleChange} required/>
                <label class="form-check-label" for="Dependent-Yes">Yes</label>
                <br />
                <input class="form-check-input" type="radio" name="Dependent" id="Dependent-No" value="No" onChange={this.handleChange} />
                <label class="form-check-label" for="Dependent-No">No</label>
              </div>
            </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="row">
            <div class="mb-3 col-6">
              <label for="Income" class="form-label required">Monthly Income</label>
              <input type="number" class="form-control" name="Income" id="Income" onChange={this.handleChange} required/>
            </div>
            <div class="mb-3 col-6">
              <label for="Expenditure" class="form-label required">Monthly Expenditure</label>
              <input type="number" class="form-control" name="Expenditure" id="Expenditure" onChange={this.handleChange} required/>
            </div>
            </div>
            <div className="row">
            <div class="mb-3 col-6">
              <label for="EMI" class="form-label">Monthly EMIs</label>
              <input type="number" class="form-control" name="EMI" id="EMI" onChange={this.handleChange} />
            </div>
            <div class="mb-3 col-6">
              <label for="EquityAdditions" class="form-label">Monthly Equity additions</label>
              <input type="number" class="form-control" name="EquityAdditions" id="EquityAdditions" onChange={this.handleChange}/>
            </div>
            </div>
            <div className="row">
            <div class="mb-3 col-6">
              <label for="MFSIP" class="form-label">Monthly MF SIP</label>
              <input type="number" class="form-control" name="MFSIP" id="MFSIP" onChange={this.handleChange} />
            </div>
            <div class="mb-3 col-6">
              <label for="Crypto" class="form-label">Monthly additions to Crypto</label>
              <input type="number" class="form-control" name="Crypto" id="Crypto" onChange={this.handleChange}/>
            </div>
            </div>
            <div className="row">
            <div class="mb-3 col-6">
              <label for="Insurance" class="form-label">Insurance Expense</label>
              <input type="number" class="form-control" name="Insurance" id="Insurance" onChange={this.handleChange}/>
            </div>
            <div class="mb-3 col-6">
              <label for="Source" class="form-label">Primary Source of Income</label>
              <br />
              <input class="form-check-input" type="radio" name="Source" id="Source-salary" value="Salaried" onChange={this.handleChange}/>
              <label class="form-check-label" for="Source-salary">Salaried</label>
              <br />
              <input class="form-check-input" type="radio" name="Source" id="Source-other" value="Other" onChange={this.handleChange} />
              <label class="form-check-label" for="Source-other">Other</label>
            </div>
            </div>
          </div>
          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div className="row">
              <div class="mb-3 col-6">
                <label for="EquityPortfolio" class="form-label">Current Equity Portfolio</label>
                <input type="number" class="form-control" name="EquityPortfolio" id="EquityPortfolio" onChange={this.handleChange} />
              </div>
              <div class="mb-3 col-6">
                <label for="MutualPortfolio" class="form-label">Current Mutual Funds Portfolio</label>
                <input type="number" class="form-control" name="MutualPortfolio" id="MutualPortfolio" onChange={this.handleChange}/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="CryptoPortfolio" class="form-label">Current Crypto Portfolio</label>
                <input type="number" class="form-control" name="CryptoPortfolio" id="CryptoPortfolio" onChange={this.handleChange} />
              </div>
              <div class="mb-3 col-6">
                <label for="GoldPortfolio" class="form-label">Current Gold Portfolio</label>
                <input type="number" class="form-control" name="GoldPortfolio" id="GoldPortfolio" onChange={this.handleChange}/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="EstatePortfolio" class="form-label">Current Real Estate Portfolio</label>
                <input type="number" class="form-control" name="EstatePortfolio" id="EstatePortfolio" onChange={this.handleChange}/>
              </div>
              <div class="mb-3 col-6">
                <label for="LiquidPortfolio" class="form-label">Current Liquid Assets Portfolio</label>
                <input type="number" class="form-control" name="LiquidPortfolio" id="LiquidPortfolio" onChange={this.handleChange}/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="Saving" class="form-label">Saving Balance</label>
                <input type="number" class="form-control" name="Saving" id="Saving" onChange={this.handleChange} />
              </div>
              <div class="mb-3 col-6">
                <label for="FixedDeposit" class="form-label">Fixed Deposits</label>
                <input type="number" class="form-control" name="FixedDeposit" id="FixedDeposit" onChange={this.handleChange}/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="Alternate" class="form-label">Alternate Assets</label>
                <input type="number" class="form-control" name="Alternate" id="Alternate" onChange={this.handleChange} />
              </div>
              <div class="mb-3 col-6">
                <label for="FinancialGoals" class="form-label">Current Financial Goals</label>
                <input type="number" class="form-control" name="FinancialGoals" id="FinancialGoals" onChange={this.handleChange}/>
              </div>
              </div>
              <div className="row">
              <div class="mb-3 col-6">
                <label for="RetirementGoal" class="form-label">Retirement Portfolio Goal</label>
                <input type="text" class="form-control" name="RetirementGoal" id="RetirementGoal" onChange={this.handleChange}/>
              </div>
              </div>
              </div>
              </div>
              <br /><br />
              <div className="text-center"><button type="submit" class="w-25 btn btn-lg btn-primary">Submit</button></div>
            </form>
      );
    }
}

export default SendRegisterForm;