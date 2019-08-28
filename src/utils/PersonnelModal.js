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

class PersonnelModal extends React.Component {
  constructor() {
    super();

    this.state = {
      type_personnel: "Permanent",
      dateDeNaissance: "1990-01-01",
      dateEmbauche: "2019-01-01",
      dateDebut: "2019-01-01",
      dateFin: "2020-01-01"
    };
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({
      [name]: value
    });
  };

  createAdministratif = async data => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/administratif/create",
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_ADMINISTRATIF_UPDATED
    });
    console.log(res);
  };
  createPermanent = async data => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/permanent/create",
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_PERMANENT_UPDATED
    });
    console.log(res);
  };
  createSaisonier = async data => {
    const res = await fetchApi({
      method: "POST",

      url: "/api/personnel/saisonier/create",
      token: window.localStorage.getItem("token"),
      body: data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_SAISONIER_UPDATED
    });
    console.log(res);
  };

  handleSubmit = async () => {
    // your submit logic
    let data = this.state;
    switch (data.type_personnel) {
      case "Administratif":
        delete data.type_personnel;
        delete data.coutParJour;
        delete data.dateDebut;
        delete data.dateFin;
        this.createAdministratif(data);
        break;
      case "Permanent":
        delete data.type_personnel;
        delete data.coutParJour;
        delete data.dateDebut;
        delete data.dateFin;
        this.createPermanent(data);
        break;
      case "Saisonier":
        delete data.type_personnel;
        delete data.cnss;
        delete data.salaire;
        delete data.dateEmbauche;
        this.createSaisonier(data);
        break;
    }

    this.props.toggle();
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
      dateDebut,
      dateFin
    } = this.state;

    let fields;
    switch (type_personnel) {
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
            <Row form>
              <Col md="6" className="form-group">
                <TextField
                  type="date"
                  label="Date debut"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="dateDebut"
                  value={dateDebut}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
                />
              </Col>
              <Col md="6" className="form-group">
                <TextField
                  type="date"
                  label="Date fin"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="dateFin"
                  value={dateFin}
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
      //   <ListGroup flush>
      //     <ListGroupItem className="p-3">
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

        <Row form>
          <Col md="6" className="form-group">
            <TextField
              id="outlined-select-currency-native"
              select
              label="Type"
              style={{ width: "100%" }}
              value={type_personnel}
              onChange={this.handleOnChange}
              SelectProps={{
                native: true
              }}
              name="type_personnel"
            >
              <option value="Saisonier">Saisonier</option>
              <option value="Administratif">Administratif</option>
              <option value="Permanent">Permanent</option>
            </TextField>
          </Col>
        </Row>
        {fields}
        <Button type="submit" /*onClick={this.handleResult}*/>
          Enrengistrer
        </Button>
        <Button theme="danger" onClick={this.HandleAnnuler}>
          Annuler
        </Button>
      </ValidatorForm>
      //     </ListGroupItem>
      //   </ListGroup>
    );
  }
}

export default PersonnelModal;
