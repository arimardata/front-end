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

class CreerMaterielModal extends React.Component {
  constructor() {
    super();

    this.state = {
      type: "Consomable",
      materiel: "",
      quantite: "",

      prix_unite: "",
      prix_dachat: "",
      cout_par_heure: "",
      date_dachat: ""
    };
  }

  handleOnChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    // your submit logic
    // const data = await fetchApi({
    //   method: "POST",
    //   url: "/api/Cheques/ajouter",
    //   token: window.localStorage.getItem("token"),
    //   body: this.state
    // });
    // Dispatcher.dispatch({
    //   actionType: Constants.TABLE_CHEQUE_UPDATED
    // });
    // this.props.toggle();
  };
  HandleAnnuler = () => {
    this.setState({});
    // this.props.toggle();
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
            <SelectValidator
              value={type}
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="type"
              label="Type"
            >
              <MenuItem value={"Consomable"}>Consomable</MenuItem>
              <MenuItem value={"Non consomable"}>Non consomable </MenuItem>
            </SelectValidator>
          </Col>
        </Row>

        {this.state.type === "Consomable" && (
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
        {this.state.type === "Non consomable" && (
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
                  label=" "
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
        <Button type="submit" /*onClick={this.handleResult}*/>
          Enrengistrer
        </Button>
        <Button theme="danger" onClick={this.HandleAnnuler}>
          Annuler
        </Button>
      </ValidatorForm>
    );
  }
}

export default CreerMaterielModal;
