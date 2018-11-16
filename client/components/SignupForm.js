import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class SignupForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    }
  }

  componentDidUpdate(nextProps) {
    console.log("this.props: ", this.props);
    console.log("nextProps: ", nextProps);

    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('dashboard')
    }
  }
  
  onSubmit({email, password}) {

    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors })
    })

  }

  render() {
    return (
      <div>
      <h3>Sign Up</h3>
        <AuthForm 
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
