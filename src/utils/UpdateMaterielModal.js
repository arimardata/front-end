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

class UpdateMaterielModal extends React.Component {
  constructor() {
    super();

    this.state = {
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
    let url;
    let body = {};
    let actionType;
    switch (Store.getTypeStock()) {
      case "Consomable":
        url = "/api/stock/consomable/update/" + this.props.id;
        body = {
          id_mat: this.state.materiel,
          quantite: this.state.quantite,
          prix_unite: this.state.prix_unite
        };
        actionType = Constants.TABLE_CONSOMABLE_UPDATED;
        break;
      case "Non consomable":
        url = "/api/stock/nonconsomable/update/" + this.props.id;
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
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  componentWillMount() {
    switch (Store.getTypeStock()) {
      case "Consomable":
        this.setState({
          materiel: this.props.data[1],
          quantite: this.props.data[2],
          prix_unite: this.props.data[3]
        });
        break;
      case "Non consomable":
        this.setState({
          materiel: this.props.data[1],
          quantite: this.props.data[2],
          cout_par_heure: this.props.data[3],
          prix_dachat: this.props.data[4],
          date_dachat: this.props.data[5]
        });
        break;
    }
  }

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

        {Store.getTypeStock() === "Consomable" && (
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
        {Store.getTypeStock() === "Non consomable" && (
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

export default UpdateMaterielModal;
