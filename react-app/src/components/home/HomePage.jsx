import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navbar, NavLink, Jumbotron } from "reactstrap";
import MenuContent from "./MenuContent";
import CreatePlan from "./CreatePlan";
const base_url = window.SERVER_ADDRESS;

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      logged_in: false,
      username: "",
      userid: "",
      current_form: "home_form",
    };
  }

  async componentDidMount() {
    console.log("mount");
    const token = localStorage.getItem("token");
    if (token && token !== undefined && token !== null) {
      try {
        const response = await fetch(base_url + "accounts/current_user/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.status);
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        const resp = await response.json();
        console.log(resp.username);
        this.setState({
          username: resp.username,
          userid: resp.id,
          logged_in: true,
          current_form: "menu_form",
        });
      } catch (error) {
        console.log(error);
        this.handleLogout();
      }
    } else {
      this.handleLogout();
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      logged_in: false,
      username: "",
      current_form: "home_form",
    });
  };

  handleFormChange = (e, form_name) => {
    if (!this.state.logged_in) {
      window.location.href = "/login";
      return true;
    }
    this.setState({ current_form: form_name });
  };

  render() {
    console.log("render");
    let form;
    if (this.state.logged_in) {
      form = (
        <Navbar color="dark">
          <NavLink href="/">Hello {this.state.username}!</NavLink>
          <Button onClick={this.handleLogout}>Logout</Button>
        </Navbar>
      );
    } else {
      form = (
        <Navbar
          color="dark"
          light
          expand="md"
          className="justify-content-end accounts-navbar"
        >
          <NavLink href="/login">Login</NavLink>

          <NavLink href="/register">Register</NavLink>
        </Navbar>
      );
    }
    const content_forms = {
      home_form: (
        <div className="start-div">
          <Jumbotron>
            <h1 className="display-3">Hello, there!</h1>
            <p className="lead">
              This is a simple training app, which will improve your workout
              experience!
            </p>
            <hr className="my-2" />
            <p className="lead">
              <Button
                size="lg"
                className="start-btn btn-block"
                color="danger"
                onClick={(e) => this.handleFormChange(e, "menu_form")}
              >
                Go!
              </Button>
            </p>
          </Jumbotron>
        </div>
      ),
      menu_form: (
        <>
          <MenuContent handleFormChange={this.handleFormChange} />
        </>
      ),
      create_plan_form: (
        <>
          <CreatePlan
            handleFormChange={this.handleFormChange}
            userid={this.state.userid}
          />
        </>
      ),
    };

    return (
      <>
        {form}
        <div
          className="content"
          style={{
            backgroundImage: "url(/workoutphoto.jpg)",
          }}
        >
          {content_forms[this.state.current_form]}
        </div>
      </>
    );
  }
}

export default HomePage;
