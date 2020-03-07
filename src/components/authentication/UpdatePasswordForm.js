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

export default class UpdatePasswordForm extends Component {
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
    let EmptyPassword =
      this.state.data["password"] == "" || this.state.data["password"] == null
        ? true
        : false;
    let EmptyConfirmPassword =
      this.state.data["confirmpassword"] == "" ||
      this.state.data["confirmpassword"] == null
        ? true
        : false;
    let EmptyAncienPassword =
      this.state.data["ancienpassword"] == "" ||
      this.state.data["ancienpassword"] == null
        ? true
        : false;
    if (EmptyConfirmPassword || EmptyPassword || EmptyAncienPassword) {
      this.setState({ error: "veuillez remplir tous les champs" });
      return 0;
    }

    const body = {
      username: window.localStorage.getItem("username"),
      password: this.state.data["ancienpassword"]
    };
    fetchApi({
      url: `/api/user/auth`,
      body,
      method: "POST"
    })
      .then(data => {
        if (data.token) {
          let password = this.state.data["password"];
          let confirmpassword = this.state.data["confirmpassword"];
          if (confirmpassword !== password) {
            this.setState({
              error: "Les mots de passe doivent être identiques"
            });
            return 0;
          }
          let id = window.localStorage.getItem("id");
          let username = window.localStorage.getItem("username");
          let authority = window.localStorage.getItem("authority");
          const body = {
            username,
            authority,
            password
          };

          fetchApi({
            url: "/api/user/update/" + id,
            body,
            method: "POST",
            token: window.localStorage.getItem("token")
          })
            .then(data => {
              this.setState({ success: true });
            })
            .catch(err => {
              this.setState({ error: "Erreur de connexion" });
            });
        } else {
          this.setState({ error: "Ancien mot de passe n'est pas correcte" });
        }
      })
      .catch(err => {
        this.setState({ error: "Erreur de connexion" });
      });
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
          <i class="fas fa-exclamation-circle" /> Mot de passe est changé avec
          succes
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
              <Col md="6" className="mb-4">
                <label htmlFor="fePassword">Ancien mot de passe</label>
                <FormInput
                  onChange={this.handleChange}
                  id="fePassword"
                  type="password"
                  name="ancienpassword"
                  placeholder="Ancien mot de passe ..."
                  required
                />
              </Col>
              <Divider></Divider>
              <Col md="6" className="mt-2">
                <label htmlFor="fePassword">Nouveau mot de passe</label>
                <FormInput
                  onChange={this.handleChange}
                  id="fePassword"
                  type="password"
                  name="password"
                  placeholder="Le nouveau mot de passe ..."
                  required
                />
              </Col>
              <Col md="6">
                <label htmlFor="fePassword">Confirmer le mot de passe</label>
                <FormInput
                  onChange={this.handleChange}
                  id="fePassword"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirmer le mot de passe ..."
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
