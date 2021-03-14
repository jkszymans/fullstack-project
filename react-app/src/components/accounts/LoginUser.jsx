import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./Accounts.css";

const base_url = window.SERVER_ADDRESS;

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      logged_in: localStorage.getItem("token") ? true : false,
      display_error: false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = (e, data) => {
    e.preventDefault();
    fetch(base_url + "accounts/token-auth/", {
      crossDomain: true,
      withCredentials: true,
      async: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          username: json.user.username,
          display_error: false,
        });
      })
      .catch((error) => {
        this.setState({
          display_error: true,
        });
        console.log(error);
      });
  };
  render() {
    let form;
    if (this.state.logged_in) {
      return <Redirect to="/" />;
    }
    if (this.state.display_error) {
      form = (
        <Label style={{ color: "red" }}>Invalid data. Please try again.</Label>
      );
    }
    return (
      <Form
        className="accounts-form"
        onSubmit={(e) =>
          this.handleLogin(e, {
            username: this.state.username,
            password: this.state.password,
          })
        }
      >
        <h1 className="text-center font-weight-bold">
          <span>Welcome</span>
        </h1>
        <FormGroup>
          <Label>Username</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            type="text"
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
            placeholder="password"
          />
        </FormGroup>
        {form}
        <Button className="btn-lg btn-dark btn-block">Log in</Button>
        <Button className="btn-lg btn-dark btn-block" href="/register">
          Sign up
        </Button>
      </Form>
    );
  }
}

export default LoginUser;
