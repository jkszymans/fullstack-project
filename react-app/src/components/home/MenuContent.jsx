import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navbar, NavLink, ListGroupItem, ListGroup } from "reactstrap";

import "./HomePage.css";
const base_url = window.SERVER_ADDRESS;

class MenuContent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { data: [] };
    this.load_plans();
  }

  async load_plans() {
    console.log("loadplans");
    try {
      const response = await fetch(base_url + "workoutplans/", {
        method: "GET",
      });
      console.log(response.status);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      const resp = await response.json();
      console.log(resp);
      this.setState((state) => {
        const data = resp.map((item) => item.plan_name);
        return {
          data,
        };
      });
    } catch (error) {
      console.log(error);
    }
    // const fruites = (
    //   <ListGroup>
    //     {this.state.fruites.map((item, i) => (
    //       <ListGroupItem key={i} value={item}>
    //         {item}
    //       </ListGroupItem>
    //     ))}
    //   </ListGroup>
    // );
    // return fruites;
  }

  write_plans() {
    const plans = (
      <ListGroup>
        {this.state.data.map((item, i) => (
          <ListGroupItem key={i} value={item}>
            {item}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
    return plans;
  }

  render() {
    return (
      <>
        <h2 className="display-3">Your plans</h2>
        {this.write_plans()}
        <Button
          size="lg"
          className="start-btn btn-block"
          color="danger"
          onClick={(e) => this.props.handleFormChange(e, "create_plan_form")}
        >
          Create new workout plan
        </Button>
        <Button
          size="lg"
          className="start-btn btn-block"
          color="danger"
          onClick={(e) => this.props.handleFormChange(e, "home_form")}
        >
          Back
        </Button>
      </>
    );
  }
}

export default MenuContent;
