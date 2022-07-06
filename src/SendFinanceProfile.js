import React from "react";
import Swal from 'sweetalert2'

class SendFinanceProfile extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
          Income: this.props.income,
          Expenditure: this.props.expenditure,
          EMI: this.props.emi,
          EquityAdditions: this.props.equityadditions,
          MFSIP: this.props.mfsip,
          Crypto: this.props.crypto,
          Insurance: this.props.insurance,
          Source: this.props.source,
          EquityPortfolio: this.props.equityportfolio,
          MutualPortfolio: this.props.mutualportfolio,
          CryptoPortfolio: this.props.cryptoportfolio,
          GoldPortfolio: this.props.goldportfolio,
          EstatePortfolio: this.props.estateportfolio,
          LiquidPortfolio: this.props.liquidportfolio,
          Saving: this.props.saving,
          FixedDeposit: this.props.fixeddeposit,
          Alternate: this.props.alternate,
          FinancialGoals: this.props.financialgoals,
          RetirementGoal: this.props.retirementgoal
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.urlencoded = new URLSearchParams();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.urlencoded.append("Email", this.props.user);
        this.urlencoded.append("Income", (this.state.Income === undefined)? this.props.data.income : this.state.Income);
        this.urlencoded.append("Expenditure", (this.state.Expenditure === undefined)? this.props.data.expenditure : this.state.Expenditure);
        this.urlencoded.append("EMI", (this.state.EMI === undefined)? this.props.data.emi : this.state.EMI);
        this.urlencoded.append("EquityAdditions", (this.state.EquityAdditions === undefined)? this.props.data.equityadditions : this.state.EquityAdditions);
        this.urlencoded.append("MFSIP", (this.state.MFSIP === undefined)? this.props.data.mfsip : this.state.MFSIP);
        this.urlencoded.append("Crypto", (this.state.Crypto === undefined)? this.props.data.crypto : this.state.Crypto);
        this.urlencoded.append("Insurance", (this.state.Insurance === undefined)? this.props.data.insurance : this.state.Insurance);
        this.urlencoded.append("Source", (this.state.Source === undefined)? this.props.data.source : this.state.Source);
        this.urlencoded.append("EquityPortfolio", (this.state.EquityPortfolio === undefined)? this.props.data.equityportfolio : this.state.EquityPortfolio);
        this.urlencoded.append("MutualPortfolio", (this.state.MutualPortfolio === undefined)? this.props.data.mutualportfolio : this.state.MutualPortfolio);
        this.urlencoded.append("CryptoPortfolio", (this.state.CryptoPortfolio === undefined)? this.props.data.cryptoportfolio : this.state.CryptoPortfolio);
        this.urlencoded.append("GoldPortfolio", (this.state.GoldPortfolio === undefined)? this.props.data.goldportfolio : this.state.GoldPortfolio);
        this.urlencoded.append("EstatePortfolio", (this.state.EstatePortfolio === undefined)? this.props.data.estateportfolio : this.state.EstatePortfolio);
        this.urlencoded.append("LiquidPortfolio", (this.state.LiquidPortfolio === undefined)? this.props.data.liquidportfolio : this.state.LiquidPortfolio);
        this.urlencoded.append("Saving", (this.state.Saving === undefined)? this.props.data.saving : this.state.Saving);
        this.urlencoded.append("FixedDeposit", (this.state.FixedDeposit === undefined)? this.props.data.fixeddeposit : this.state.FixedDeposit);
        this.urlencoded.append("Alternate", (this.state.Alternate === undefined)? this.props.data.alternate : this.state.Alternate);
        this.urlencoded.append("FinancialGoals", (this.state.FinancialGoals === undefined)? this.props.data.financialgoals : this.state.FinancialGoals);
        this.urlencoded.append("RetirementGoal", (this.state.RetirementGoal === undefined)? this.props.data.retirementgoal : this.state.RetirementGoal);
        fetch("http://localhost:9000/clientdata/updatefinanceprofile", {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: this.urlencoded,
        })
        .then(response => response.text())
        .then(result => {
          console.log('Success:', result);
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated'
          })
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Update unsuccessful. Please try again'
          })
        });
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      return (
        <form id="submit_job3" autoComplete="on" onSubmit={this.handleSubmit}>
        <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Income/Expense Information</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Financial Assets and Goals</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy Income</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.income} name="Income" onChange={this.handleChange} required/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy Expenditure</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.expenditure} name="Expenditure" onChange={this.handleChange} required/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy EMIs</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.emi} name="EMI" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy Equity additions</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.equityadditions} name="EquityAdditions" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy MF SIP</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.mfsip} name="MFSIP" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Monthy additions to Crypto</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.crypto} name="Crypto" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Insurance Expense</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.insurance} name="Insurance" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Primary Source of Income</label>
                        <br />
                        <input type="radio" className="form-check-input" name="Source" value="Salaried" onChange={this.handleChange} required/>
                        <label>Salaried</label>
                        <br />
                        <input type="radio" className="form-check-input" name="Source" value="Other" onChange={this.handleChange}/>
                        <label>Other</label>
                    </div>
                </div>
            </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Equity Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.equityportfolio} name="EquityPortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Mutual Funds Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.mutualportfolio} name="MutualPortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Crypto Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.cryptoportfolio} name="CryptoPortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Gold Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.goldportfolio} name="GoldPortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Real Estate Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.estateportfolio} name="EstatePortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Liquid Assets Portfolio</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.liquidportfolio} name="LiquidPortfolio" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Saving Balance</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.saving} name="Saving" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Fixed Deposits</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.fixeddeposit} name="FixedDeposit" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Alternate Assets</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.alternate} name="Alternate" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Current Financial Goals</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.financialgoals} name="FinancialGoals" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Retirement Portfolio Goal</label>
                        <input type="number" className="form-control" defaultValue={this.props.data.retirementgoal} name="RetirementGoal" onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-primary" style={{margin: 20}}>Update</button>
        </div>
        </form>
      );
    }
}

export default SendFinanceProfile;