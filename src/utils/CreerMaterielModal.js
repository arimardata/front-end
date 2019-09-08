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
  FormSelect
} from "shards-react";
import fetchApi from "./fetchApi";
import { Constants, Store, Dispatcher } from "../flux";
import { TableBody, MenuItem } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

class CreerMaterielModal extends React.Component {
  constructor() {
    super();

    this.state = {
      type: "Consommable",
      materiel: "",
      quantite: "",

      prix_unite: "",
      prix_dachat: "",
      cout_par_heure: "",
      date_dachat: "",
      request: false
    };
  }

  handleOnChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    this.setState({ request: true });
    let url;
    let body = {};
    let actionType;
    switch (this.state.type) {
      case "Consommable":
        url = "/api/stock/consomable/create";
        body = {
          id_mat: this.state.materiel,
          quantite: this.state.quantite,
          prix_unite: this.state.prix_unite
        };
        actionType = Constants.TABLE_CONSOMABLE_UPDATED;
        break;
      case "Non consommable":
        url = "/api/stock/nonconsomable/create";
        body = {
          id_mat: this.state.materiel,
          quantite: this.state.quantite,
          cout_par_heure: this.state.cout_par_heure,
          prix_achat: this.state.prix_dachat,
          date_achat: this.state.date_dachat
        };
        actionType = Constants.TABLE_NON_CONSOMABLE_UPDATED;
        break;
    }
    const data = await fetchApi({
      method: "POST",
      url,
      token: window.localStorage.getItem("token"),
      body
    });
    Dispatcher.dispatch({
      actionType
    });
    this.props.toggle();

    this.setState({ request: false });
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  render() {
    const {
      materiel,
      quantite,
      type,
      prix_unite,
      prix_dachat,
      cout_par_heure,
      date_dachat
    } = this.state;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Row form>
          <Col md="6" className="form-group">
            <TextValidator
              label="Materiel"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="materiel"
              value={materiel}
              validators={["required"]}
              errorMessages={["Ce champ est Obligatoire  "]}
            />
          </Col>
        </Row>
        <Row form>
          <Col md="6" className="form-group">
            <TextValidator
              label="Quantité"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="quantite"
              value={quantite}
              validators={["required", "isNumber"]}
              errorMessages={[
                "Ce champ est Obligatoire  ",
                "Ce champ doit etre un nombre"
              ]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="4" className="form-group">
            <TextField
              id="outlined-select-currency-native"
              select
              label="Type"
              style={{ width: "100%" }}
              value={type}
              onChange={this.handleOnChange}
              SelectProps={{
                native: true
              }}
              name="type"
            >
              <option value="Consommable">Consommable</option>
              <option value="Non consommable">Non consommable</option>
            </TextField>
          </Col>
        </Row>

        {this.state.type === "Consommable" && (
          <Row form>
            <Col md="6" className="form-group">
              <TextValidator
                label="Prix unité"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="prix_unite"
                value={prix_unite}
                validators={["required", "isFloat"]}
                errorMessages={[
                  "Ce champ est Obligatoire  ",
                  "Ce champ doit etre un nombre"
                ]}
              />
            </Col>
          </Row>
        )}
        {this.state.type === "Non consommable" && (
          <div>
            <Row form>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Prix d'achat"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="prix_dachat"
                  value={prix_dachat}
                  validators={["required", "isFloat"]}
                  errorMessages={[
                    "Ce champ est Obligatoire  ",
                    "Ce champ doit etre un nombre"
                  ]}
                />
              </Col>
            </Row>

            <Row form>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Cout par heure"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="cout_par_heure"
                  value={cout_par_heure}
                  validators={["required", "isFloat"]}
                  errorMessages={[
                    "Ce champ est Obligatoire  ",
                    "Ce champ doit etre un nombre"
                  ]}
                />
              </Col>
            </Row>

            <Row form>
              <Col md="6" className="form-group">
                <TextField
                  type="date"
                  label="Date d'achat"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="date_dachat"
                  value={date_dachat}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </Col>
            </Row>
          </div>
        )}
        <Button
          disabled={this.state.request}
          type="submit"
          variant="contained"
          color="primary" /*onClick={this.handleResult}*/
        >
          {this.state.request && <CircularProgress size={24} />}
          Enrengistrer
        </Button>
        <Button onClick={this.HandleAnnuler}>Annuler</Button>
      </ValidatorForm>
    );
  }
}

export default CreerMaterielModal;
