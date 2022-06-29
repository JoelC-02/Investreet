import React from "react";

class SendPersonalProfile extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
          Name: this.props.data.name,
          Email: this.props.user,
          Contact: this.props.data.contact,
          Age: this.props.data.age,
          Married: this.props.data.married,
          Children: this.props.data.children,
          Dependent: this.props.data.dependent,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.urlencoded = new URLSearchParams();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.urlencoded.append("Name", (this.state.Name === undefined)? this.props.data.name : this.state.Name);
        this.urlencoded.append("Email", this.props.user);
        this.urlencoded.append("Contact", (this.state.Contact === undefined)? this.props.data.contact : this.state.Contact);
        this.urlencoded.append("Age", (this.state.Age === undefined)? this.props.data.age : this.state.Age);
        this.urlencoded.append("Married", this.state.Married);
        this.urlencoded.append("Children", this.state.Children);
        this.urlencoded.append("Dependent", this.state.Dependent);
        fetch("http://localhost:9000/clientdata/updatepersonalprofile", {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: this.urlencoded,
        })
        .then(response => response.text())
        .then(result => {
          console.log('Success:', result);
          alert("Profile updated");
        })
        .catch((error) => {
          console.error('Error:', error);
          alert("Update unsuccessful. Please try again");
        });
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      return (
        <form id="submit_job2" autoComplete="on" onSubmit={this.handleSubmit}>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" defaultValue={this.props.data.name} name="Name" onChange={this.handleChange} required/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control-plaintext" name="Email" value={this.props.user} readOnly/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" className="form-control" name="Contact" pattern="[0-9]{10}" maxlength="10" defaultValue={this.props.data.contact} onChange={this.handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" className="form-control" name="Age" defaultValue={this.props.data.age} onChange={this.handleChange} required/>
                </div>
            </div>    
            <div className="col-md-6">
                <div className="form-group">
                    <label>Are you Married?</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Married" value="Yes" onChange={this.handleChange} required/>
                    <label style={{"padding-right": 10}}>Yes</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Married" value="No" onChange={this.handleChange} />
                    <label>No</label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Number of children</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Children" value="0" onChange={this.handleChange} required/>
                    <label style={{"padding-right": 10}}>0</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Children" value="1" onChange={this.handleChange} />
                    <label style={{"padding-right": 10}}>1</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Children" value=">1" onChange={this.handleChange} />
                    <label>More than 1</label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Do you have any dependent?</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Dependent" value="Yes" onChange={this.handleChange} required/>
                    <label style={{"padding-right": 10}}>Yes</label>
                    <br />
                    <input type="radio" className="form-check-input" name="Dependent" value="No" onChange={this.handleChange} />
                    <label>No</label>
                </div>
            </div> 
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-primary">Update</button>
        </div>
        </form>
      );
    }
}

export default SendPersonalProfile;