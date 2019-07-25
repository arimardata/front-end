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

    this.state = {};
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({
      [name]: value
    });
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
      recepteur
    } = this.state;
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <ValidatorForm
                autoComplete="off"
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
              >
                <Row form>
                  <Col md="6" className="form-group">
                    <TextValidator
                      label="Banque"
                      onChange={this.handleOnChange}
                      name="banque"
                      value={banque}
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoir : "]}
                    />
                  </Col>
                  <Col md="6">
                    <TextValidator
                      label="Somme"
                      onChange={this.handleOnChange}
                      name="somme"
                      value={somme}
                      validators={["required", "isFloat"]}
                      errorMessages={[
                        "Ce Champ est Obligatoir : ",
                        "la valeur doit etre numerique"
                      ]}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <TextValidator
                      label="Emetteur"
                      onChange={this.handleOnChange}
                      name="emetteur"
                      value={emetteur}
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoir : "]}
                    />
                  </Col>
                  <Col md="6">
                    <TextValidator
                      label="Recepteur"
                      onChange={this.handleOnChange}
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
                      label="Alerte"
                      onChange={this.handleOnChange}
                      name="alerte"
                      value={alerte}
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoir : "]}
                    />
                  </Col>
                  <Col md="2" className="form-group">
                    <SelectValidator
                      value={etat}
                      onChange={this.handleOnChange}
                      name="etat"
                      label="Etat"
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoir : "]}
                    >
                      <MenuItem value={"entrant"}>Entrant</MenuItem>
                      <MenuItem value={"sortant"}>Sortant </MenuItem>
                    </SelectValidator>
                  </Col>
                  <Col md="4" className="form-group">
                    <TextField
                      type="date"
                      label=" "
                      onChange={this.handleOnChange}
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
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default ChequeModal;
