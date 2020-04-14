import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Alert
} from "shards-react";

import { Dispatcher, Constants } from "../../flux";
import fetchApi from "../../utils/fetchApi";
import { Divider } from "@material-ui/core";

export default class EmailNotifForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({
      data
    });
  }

  handleClick() {
    console.log("CODE HERE ....");
    console.log(this.state.data["email"]);
    let email=this.state.data["email"];
    let id = window.localStorage.getItem("id");

    const body = {
      id: window.localStorage.getItem("id"),
      email: this.state.data["email"]
      //authority: window.localStorage.getItem("authority")
    };

    fetchApi({
      method: "POST",
      body,
      url: "/api/user/updateemail" ,
      token: window.localStorage.getItem("token")
    });


    
    console.log(email);
    console.log("token:");
    console.log(window.localStorage.getItem("token"));

  }

  render() {
    let error, success;
    if (this.state.error) {
      error = (
        <Alert theme="danger" className="mb-0">
          <i class="fas fa-exclamation-circle" /> {this.state.error}
        </Alert>
      );
    }
    if (this.state.success) {
      error = "";
      success = (
        <Alert theme="success" className="mb-0">
          <i class="fas fa-exclamation-circle" /> Email est changé avec succes
        </Alert>
      );
    }
    return (
      <ListGroup flush>
        {error}
        {success}
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Col md="6" className="mt-2">
                <label htmlFor="fePassword">Nouveau email</label>
                <FormInput
                  onChange={this.handleChange}
                  id="fePassword"
                  type="text"
                  name="email"
                  placeholder="Le nouveau email ..."
                  required
                />
              </Col>

              <Col md="6">
                <br />
                <Button onClick={this.handleClick}>Enregistrer</Button>
              </Col>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
