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
import Button from "@material-ui/core/Button";
import fetchApi from "./fetchApi";
import { Constants, Store, Dispatcher } from "../flux";
import { TableBody, MenuItem } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

class UpdatePersonnelModal extends React.Component {
  constructor() {
    super();

    this.state = { request: false, disponible: true, archived: false };
  }

  componentWillMount() {
    switch (Store.getTypePersonnel()) {
      case "Administratif":
        this.setState({
          cin: this.props.data[1],
          nom: this.props.data[2],
          prenom: this.props.data[3],
          tel: this.props.data[4],
          email: this.props.data[5],
          diplome: this.props.data[6],
          qualite: this.props.data[7],
          dateDeNaissance: this.props.data[8],
          salaire: this.props.data[9],
          dateEmbauche: this.props.data[10],
          cnss: this.props.data[11],
          disponible: this.props.data[12] === "occupé" ? false : true
        });
        break;
      case "Permanent":
        this.setState({
          cin: this.props.data[1],
          nom: this.props.data[2],
          prenom: this.props.data[3],
          tel: this.props.data[4],
          email: this.props.data[5],
          diplome: this.props.data[6],
          qualite: this.props.data[7],
          dateDeNaissance: this.props.data[8],
          salaire: this.props.data[9],
          dateEmbauche: this.props.data[10],
          cnss: this.props.data[11],
          disponible: this.props.data[12] === "occupé" ? false : true
        });
        break;
      case "Saisonier":
        this.setState({
          cin: this.props.data[1],
          nom: this.props.data[2],
          prenom: this.props.data[3],
          tel: this.props.data[4],
          email: this.props.data[5],
          diplome: this.props.data[6],
          qualite: this.props.data[7],
          dateDeNaissance: this.props.data[8],
          coutParJour: this.props.data[9],
          disponible: this.props.data[10] === "occupé" ? false : true
        });
        break;
    }
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({
      [name]: value
    });
  };

  updateAdministratif = async (id, data) => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/administratif/update/" + id,
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_ADMINISTRATIF_UPDATED
    });
  };
  updatePermanent = async (id, data) => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/permanent/update/" + id,
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_PERMANENT_UPDATED
    });
  };
  updateSaisonier = async (id, data) => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/saisonier/update/" + id,
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_SAISONIER_UPDATED
    });
  };

  handleSubmit = async () => {
    this.setState({ request: true });
    // your submit logic
    let data = this.state;
    let id = this.props.id;
    switch (Store.getTypePersonnel()) {
      case "Administratif":
        delete data.coutParJour;
        this.updateAdministratif(id, data);
        break;
      case "Permanent":
        delete data.coutParJour;
        this.updatePermanent(id, data);
        break;
      case "Saisonier":
        delete data.cnss;
        delete data.salaire;
        delete data.dateEmbauche;
        this.updateSaisonier(id, data);
        break;
    }

    this.props.toggle();

    this.setState({ request: false });
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  render() {
    const {
      cin,
      nom,
      prenom,
      dateDeNaissance,
      diplome,
      qualite,
      email,
      tel,
      type_personnel,
      coutParJour,
      salaire,
      cnss,
      dateEmbauche,
      date_debut,
      date_fin
    } = this.state;
    let fields;
    switch (Store.getTypePersonnel()) {
      case "Permanent":
        fields = (
          <div>
            <Row>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Salaire"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="salaire"
                  value={salaire}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
              <Col md="6" className="form-group">
                <TextValidator
                  label="CNSS"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="cnss"
                  value={cnss}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
            </Row>
            <Row form>
              <Col md="6" className="form-group">
                <TextField
                  type="date"
                  label="Date d'embauche"
                  onChange={this.handleOnChange}
                  defaultValue="2019-01-01"
                  style={{ width: "100%" }}
                  name="dateEmbauche"
                  value={dateEmbauche}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
            </Row>
          </div>
        );
        break;
      case "Administratif":
        fields = (
          <div>
            <Row>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Salaire"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="salaire"
                  value={salaire}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
              <Col md="6" className="form-group">
                <TextValidator
                  label="CNSS"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="cnss"
                  value={cnss}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
            </Row>
            <Row form>
              <Col md="6" className="form-group">
                <TextField
                  type="date"
                  label="Date d'embauche"
                  onChange={this.handleOnChange}
                  defaultValue="2019-01-01"
                  style={{ width: "100%" }}
                  name="dateEmbauche"
                  value={dateEmbauche}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
            </Row>
          </div>
        );
        break;
      case "Saisonier":
        fields = (
          <div>
            <Row>
              <Col md="6" className="form-group">
                <TextValidator
                  label="Cout par jour"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="coutParJour"
                  value={coutParJour}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
            </Row>
          </div>
        );
        break;
    }
    return (
      <ValidatorForm
        autoComplete="off"
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Row form>
          <Col md="2" className="form-group">
            <TextValidator
              value={cin}
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="cin"
              label="CIN"
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
          <Col md="5" className="form-group">
            <TextValidator
              label="Nom"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="nom"
              value={nom}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
          <Col md="5" className="form-group">
            <TextValidator
              label="Prenom"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="prenom"
              value={prenom}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
        <Row form>
          <Col md="6" className="form-group">
            <TextValidator
              label="Diplome"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="diplome"
              value={diplome}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
          <Col md="6" className="form-group">
            <TextValidator
              label="Qualité"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="qualite"
              value={qualite}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="form-group">
            <TextValidator
              label="N° Telephone"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="tel"
              value={tel}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
          <Col md="6" className="form-group">
            <TextValidator
              label="Email"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="email"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={[
                "Ce champ est obligatoire : ",
                "Entrez un email valide"
              ]}
            />
          </Col>
        </Row>

        <Row form>
          <Col md="6" className="form-group">
            <TextField
              type="date"
              label="Date de naissance"
              onChange={this.handleOnChange}
              defaultValue="1990-01-01"
              style={{ width: "100%" }}
              name="dateDeNaissance"
              value={dateDeNaissance}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>

        {fields}
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

export default UpdatePersonnelModal;
