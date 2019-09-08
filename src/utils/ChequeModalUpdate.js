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
import { TableBody, MenuItem, MenuList } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Button } from "@material-ui/core";

class ChequeModalUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      recepteur: "",
      emetteur: "",
      banque: "",
      somme: "",
      alerte: "",
      date: "",
      etat: "",
      compte: "",
      email: "",
      telephone: "",
      request: false
    };
  }

  async componentWillMount() {
    let id = this.props.id;

    const data = await fetchApi({
      method: "GET",
      url: "/api/Cheques/findone/" + id,
      token: window.localStorage.getItem("token")
    });

    this.setState({
      data
    });
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  handleSubmit = async e => {
    // your submit logic

    this.setState({ request: true });
    let id = this.props.id;

    const data = await fetchApi({
      method: "POST",
      url: "/api/Cheques/modifier/" + id,
      token: window.localStorage.getItem("token"),
      body: this.state.data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_CHEQUE_UPDATED
    });
    this.props.toggle();

    this.setState({ request: false });
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  render() {
    if (this.state.data) {
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
      } = this.state.data;
      return (
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <ValidatorForm
              autoComplete="off"
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
            >
              <Row form>
                <Col md="2" className="form-group">
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Etat"
                    style={{ width: "100%" }}
                    value={etat}
                    onChange={this.handleOnChange}
                    SelectProps={{
                      native: true
                    }}
                    name="etat"
                  >
                    <option value="Entrant">Entrant</option>
                    <option value="Sortant">Sortant</option>
                  </TextField>
                </Col>
                <Col md="5" className="form-group">
                  <TextValidator
                    label="Emetteur"
                    onChange={this.handleOnChange}
                    style={{ width: "100%" }}
                    name="emetteur"
                    value={emetteur}
                    validators={["required"]}
                    errorMessages={["Ce Champ est Obligatoire : "]}
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
                    errorMessages={["Ce Champ est Obligatoire : "]}
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
                    errorMessages={["Ce Champ est Obligatoire : "]}
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
                      "Ce Champ est Obligatoire : ",
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
                      "Ce Champ est Obligatoire : ",
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
                    errorMessages={["Ce Champ est Obligatoire : "]}
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
                    type="date"
                    label=" "
                    onChange={this.handleOnChange}
                    style={{ width: "100%" }}
                    name="date"
                    value={date}
                    validators={["required"]}
                    errorMessages={["Ce Champ est Obligatoire : "]}
                  />
                </Col>
              </Row>
              <Button
                disabled={this.state.request}
                type="submit"
                variant="contained"
                color="primary" /*onClick={this.handleResult}*/
              >
                {this.state.request && <CircularProgress size={24} />}
                Modifier Cheque
              </Button>
              <Button onClick={this.HandleAnnuler}>Annuler</Button>
            </ValidatorForm>
          </ListGroupItem>
        </ListGroup>
      );
    }
    return "loading";
  }
}

export default ChequeModalUpdate;
