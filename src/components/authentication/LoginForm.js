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

export default class LoginFrom extends Component {
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
    let EmptyUsername =
      this.state.data["username"] == "" || this.state.data["username"] == null
        ? true
        : false;
    let EmptyPassword =
      this.state.data["password"] == "" || this.state.data["password"] == null
        ? true
        : false;
    if (EmptyUsername || EmptyPassword) {
      this.setState({ error: "veuillez remplir tous les champs" });
      return 0;
    }
    const body = {
      username: this.state.data["username"],
      password: this.state.data["password"]
    };

    fetchApi({
      url: `/api/user/auth`,
      body,
      method: "POST"
    })
      .then(data => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("id", data.id);
          window.localStorage.setItem("username", data.username);
          window.localStorage.setItem("authority", data.authority);
          window.localStorage.setItem("firstLogin", data.firstLogin);
          Dispatcher.dispatch({ actionType: Constants.LOGIN, payload: data });
        } else {
          this.setState({ error: data.message });
        }
      })
      .catch(err => {
        this.setState({ error: "Erreur de connexion" });
      });
  }

  render() {
    let error;
    if (this.state.error) {
      error = (
        <Alert theme="danger" className="mb-0">
          <i class="fas fa-exclamation-circle" /> {this.state.error}
        </Alert>
      );
    }
    return (
      <ListGroup flush>
        {error}
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Col md="6" className="form-group">
                <label htmlFor="feEmailAddress">Nom d'utilisateur</label>
                <FormInput
                  autoComplete="off"
                  onChange={this.handleChange}
                  id="feEmailAddress"
                  name="username"
                  placeholder="Nom d'utilisateur ..."
                  required
                />
              </Col>
              <Col md="6">
                <label htmlFor="fePassword">Mot de pass</label>
                <FormInput
                  onChange={this.handleChange}
                  id="fePassword"
                  type="password"
                  name="password"
                  placeholder="Mot de passe ..."
                  required
                />
              </Col>
              <Col md="6">
                <br />
                <Button onClick={this.handleClick}>Se Connecter</Button>
              </Col>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
