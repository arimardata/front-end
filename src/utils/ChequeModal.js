import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import fetchApi from "./fetchApi";
import { Constants, Store, Dispatcher } from "../flux";
import { TableBody, MenuItem } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";

class ChequeModal extends React.Component {
  constructor() {
    super();

    this.state = { recepteur: "", emetteur: "" };
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;
    if (name == "etat") {
      if (value == "Entrant") {
        this.setState({
          etat: value,
          recepteur: "Gecomar",
          emetteur: ""
        });
      } else {
        this.setState({
          etat: value,
          emetteur: "Gecomar",
          recepteur: ""
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = async e => {
    // your submit logic

    const data = await fetchApi({
      method: "POST",

      url: "/api/Cheques/ajouter",
      token: window.localStorage.getItem("token"),
      body: this.state
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_CHEQUE_UPDATED
    });
    console.log(data);
    this.props.toggle();
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  render() {
    const {
      banque,
      somme,
      alerte,
      date,
      etat,
      emetteur,
      recepteur,
      compte,
      email,
      telephone
    } = this.state;
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <ValidatorForm
            autoComplete="on"
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Row form>
              <Col md="2" className="form-group">
                <SelectValidator
                  value={etat}
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="etat"
                  label="Etat"
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                >
                  <MenuItem value={"Entrant"}>Entrant</MenuItem>
                  <MenuItem value={"Sortant"}>Sortant </MenuItem>
                </SelectValidator>
              </Col>
              <Col md="5" className="form-group">
                <TextValidator
                  label="Emetteur"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="emetteur"
                  value={emetteur}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
              <Col md="5" className="form-group">
                <TextValidator
                  label="Recepteur"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="recepteur"
                  value={recepteur}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
            </Row>
            <Row form>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Banque"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="banque"
                  value={banque}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
              <Col md="6" className="form-group">
                <TextValidator
                  label="N° Compte"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="compte"
                  value={compte}
                  validators={["required", "maxStringLength:24", "isNumber"]}
                  errorMessages={[
                    "Ce Champ est Obligatoir : ",
                    "Max 24 caractere",
                    "La valeur doit etre numerique"
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col md="4" className="form-group">
                <TextValidator
                  label="Somme"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="somme"
                  value={somme}
                  validators={["required", "isFloat"]}
                  errorMessages={[
                    "Ce Champ est Obligatoir : ",
                    "la valeur doit etre numerique"
                  ]}
                />
              </Col>

              <Col md="4" className="form-group">
                <TextValidator
                  label="N° Telephone"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="telephone"
                  value={telephone}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
              <Col md="4" className="form-group">
                <TextValidator
                  label="Email"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "Ce Champ est Obligatoir : ",
                    "Entrez un email valide"
                  ]}
                />
              </Col>
            </Row>

            <Row form>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Alerte"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="alerte"
                  value={alerte}
                  validators={["required", "isNumber"]}
                  errorMessages={[
                    "Ce Champ est Obligatoir : ",
                    "la valeur doit etre en nombre de jours"
                  ]}
                />
              </Col>

              <Col md="6" className="form-group">
                <TextField
                id="date"
                  type="date"
                  label=" "
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  //defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="date"
                  value={date}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
            </Row>

            <Button type="submit" /*onClick={this.handleResult}*/>
              Enrengistrer Cheque
            </Button>
            <Button theme="danger" onClick={this.HandleAnnuler}>
              Annuler
            </Button>
          </ValidatorForm>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default ChequeModal;
