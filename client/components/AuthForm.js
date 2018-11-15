import React, { Component } from 'react';

class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
  }
  
  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
          <div className="input-field">
            <input 
              type="text" 
              value={this.state.email}
              placeholder="email" 
              onChange={event => this.setState({ email: event.target.value})}/>
          </div>
          <div className="input-field">
            <input 
              type="text" 
              value={this.state.password} 
              placeholder="password"
              onChange={event => this.setState({ password: event.target.value})}/>
          </div>
          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
