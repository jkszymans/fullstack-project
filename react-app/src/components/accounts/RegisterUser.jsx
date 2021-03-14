import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./Accounts.css";

const required = (val) => val && val.length;
const minLength = (len, val) => !val || val.length < len;
const maxLength = (len, val) => val.length > len;
const isEqual = (p1, p2) => p1 === p2;

const base_url = window.SERVER_ADDRESS;

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password2: "",
      display_first_name: false,
      display_last_name: false,
      display_username: false,
      display_password: false,
      display_password2: false,
      registered_in: false,
    };
  }

  clearForm = () => {
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password2: "",
      display_first_name: false,
      display_last_name: false,
      display_username: false,
      display_password: false,
      display_password2: false,
    });
  };

  getErrors = (name) => {
    let errors = [];
    const value = this.state[name];
    if (!required(value)) {
      errors.push("This value is required");
    }
    if (name === "password" && minLength(8, value)) {
      errors.push("Greater than 8 characters required");
    }
    if (minLength(3, value) && !name === "password") {
      errors.push("Greater than 3 characters required");
    }
    if (maxLength(20, value)) {
      errors.push("Cannot be more than 25 characters");
    }
    if (name === "password2" && !isEqual(this.state.password, value)) {
      errors.push("Passwords should be the same");
    }
    const property = "display_" + name;
    if (errors.length === 0) {
      this.state[property] = false;
    }
    if (this.state[property]) {
      return (
        <>
          {errors.map((error, index) => (
            <Label key={index} style={{ color: "red" }}>
              {error}
            </Label>
          ))}
        </>
      );
    }
  };

  isValid = () => {
    let valid = true;
    Object.values(this.state).forEach((val) => {
      if (val === true) {
        valid = false;
        return valid;
      }
    });
    return valid;
  };

  sendRegistration = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const { first_name, last_name, username, password } = this.state;
      Axios.post(base_url + "accounts/create/", {
        user: {
          first_name: first_name,
          last_name: last_name,
          username: username,
          password: password,
        },
      })
        .then((response) => {
          console.log(response);
          console.log(response.status + " " + response.statusText);
        })
        .catch((error) => {
          console.log(error);
        });

      this.clearForm();
      this.setState({ registered_in: true });
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    var stateObject = (function () {
      var returnObj = {};
      returnObj["display_" + event.target.name] = true;
      return returnObj;
    })();
    this.setState(stateObject);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.registered_in) {
      this.setState({ registered_in: false });
      return <Redirect to="/" />;
    }
    return (
      <Form className="accounts-form" onSubmit={this.sendRegistration}>
        <h2 className="text-center font-weight-bold">
          <span>Sign up!</span>
        </h2>
        <FormGroup>
          <Label for="first_name">First name</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.first_name}
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First name"
          />
          {this.getErrors("first_name")}
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.last_name}
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last name"
          />
          {this.getErrors("last_name")}
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          {this.getErrors("username")}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password"
          />
          {this.getErrors("password")}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password 2</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.password2}
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm Password"
          />
          {this.getErrors("password2")}
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">Submit</Button>
        <Button className="btn-lg btn-dark btn-block" href="/login">
          Log in
        </Button>
      </Form>
    );
  }
}

export default RegisterUser;
