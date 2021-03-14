import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import "./HomePage.css";
const base_url = window.SERVER_ADDRESS;

class CreatePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current_form: "form_1",
      plan_name: "",
      description: "",
    };
  }

  sendPlan = (event) => {
    event.preventDefault();
    console.log(this.state);
    const { plan_name, description } = this.state;
    Axios.post(base_url + "workoutplans/", {
      plan_name: plan_name,
      user: this.props.userid,
      description: description,
    })
      .then((response) => {
        console.log(response);
        console.log(response.status + " " + response.statusText);
        if (response.status !== 201) {
          throw new Error(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.props.handleFormChange("", "menu_form");
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Form className="workout-plan-form" onSubmit={this.sendPlan}>
          <h2 className="text-center font-weight-bold">
            <span>Create workout plan</span>
          </h2>
          <FormGroup>
            <Label for="plan_name">Plan name</Label>
            <Input
              onChange={this.handleChange}
              value={this.state.plan_name}
              type="text"
              name="plan_name"
              id="plan_name"
              placeholder="Plan name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              onChange={this.handleChange}
              value={this.state.description}
              type="textarea"
              name="description"
              id="description"
              placeholder="Description"
            />
          </FormGroup>
          <Button size="lg" className="start-btn btn-block" color="danger">
            Create
          </Button>
          <Button
            size="lg"
            className="start-btn btn-block"
            color="danger"
            onClick={(e) => this.props.handleFormChange(e, "menu_form")}
          >
            Back
          </Button>
        </Form>
      </div>
    );
  }
}
export default CreatePlan;
