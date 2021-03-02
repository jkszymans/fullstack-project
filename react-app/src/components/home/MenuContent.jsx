import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navbar, NavLink, ListGroupItem, ListGroup } from "reactstrap";

import "./HomePage.css";
const base_url = window.SERVER_ADDRESS;

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = { fruites: ["Apple", "Banana", "Orange"] };
  }

  load_plans = () => {
    console.log("FETCGH");
    const fruites = (
      <ListGroup>
        {this.state.fruites.map((item, i) => (
          <ListGroupItem key={i} value={item}>
            {item}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
    return fruites;
  };

  render() {
    return (
      <>
        <h2 className="display-3">Your plans</h2>
        {this.load_plans()}

        <Button
          size="lg"
          className="start-btn btn-block"
          color="danger"
          onClick={this.props.handleFormChange.bind("create_plan_form")}
        >
          Create new workout plan
        </Button>
      </>
    );
  }
}

export default MenuContent;
