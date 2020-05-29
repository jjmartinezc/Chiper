import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  forgotPasswordHandler = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('/forgotpasswordverification');
    }catch(error) {
      console.log(error);
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Olvido su contrasena?</h1>
          <p>
            Por favor escriba el email que este asociado a su cuenta y se le enviara un link para 
            actualizar su contrasena.
          </p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.forgotPasswordHandler}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  className="input"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Olvido su contrasena?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-danger">
                  Enviar
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPassword;