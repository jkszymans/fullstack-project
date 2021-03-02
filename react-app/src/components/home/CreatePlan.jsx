import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./HomePage.css";
const base_url = window.SERVER_ADDRESS;

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_form: "form_1",
      plan_name: "",
      start_date: "",
      duration: "",
      week_days: [],
      description: "",
    };
  }

  sendPlan = () => {
    console.log(this.state);
  };

  handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "week_days") {
      let value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      this.setState({ [event.target.name]: value });
      console.log(this.state);
      return true;
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleForm1Btn = (e, form) => {
    this.setState({ current_form: form });
  };

  render() {
    const forms = {
      form_1: (
        <>
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
            <Label for="start_date">Start date</Label>
            <Input
              onChange={this.handleChange}
              value={this.state.start_date}
              type="date"
              name="start_date"
              id="start_date"
              placeholder="Start date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="duration">Duration(weeks)</Label>
            <Input
              onChange={this.handleChange}
              value={this.state.duration}
              min={0}
              step="1"
              type="number"
              name="duration"
              id="duration"
              placeholder="Duration"
            />
          </FormGroup>
          <FormGroup>
            <Label for="week_days">Training days</Label>
            <Input
              onChange={this.handleChange}
              value={this.state.week_days}
              type="select"
              name="week_days"
              id="week_days"
              placeholder="training days"
              multiple
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </Input>
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
          <Button
            className="btn-lg btn-dark btn-block"
            onClick={this.handleForm1Btn.bind("exercises_form")}
          >
            Next
          </Button>
        </>
      ),
      exercises_form: <>blabla</>,
    };

    return (
      <Form className="workout-plan-form" onSubmit={this.sendPlan}>
        {forms[this.state.current_form]}
      </Form>
    );
  }
}

export default MenuContent;
