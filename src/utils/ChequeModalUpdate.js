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
import { TableBody, MenuItem, MenuList } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";

class ChequeModalUpdate extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
        id:props.id
        
    };

  }

  async componentWillMount(){
    let id = this.props.id;
    console.log(id)
    
    const data = await fetchApi({
        method: "GET",
        url: "/api/Cheques/findone/"+id,
        token: window.localStorage.getItem("token")
      });

    this.setState({
        data
    })
    
  }

  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({
     data :  {...this.state.data,[name]: value}
    });
  };

  handleSubmit = async e => {
    // your submit logic
    let id = this.props.id


    const data = await fetchApi({
      method: "POST",
      url: "/api/Cheques/modifier/"+id,
      token: window.localStorage.getItem("token"),
      body: this.state.data
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
    
    if (this.state.data){
    const {
        banque,
        somme,
        alerte,
        date,
        etat,
        emetteur,
        recepteur
      } = this.state.data; 
      return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <ValidatorForm
                //autoComplete="off"
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
                     // defaultValue={ this.state.data.banque}
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
                      //defaultValue={ this.state.data.somme}
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
                      //defaultValue={ this.state.data.emetteur}
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
                      //defaultValue={ this.state.data.recepteur}
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
                      //defaultValue={ this.state.data.alerte}
                      validators={["required", "isNumber"]}
                      errorMessages={[
                        "Ce Champ est Obligatoir : ",
                        "la valeur doit etre en nombre de jours"
                      ]}
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
                      //defaultValue={ this.state.data.date}
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoir : "]}
                    />
                  </Col>
                </Row>
                <Button type="submit" /*onClick={this.handleResult}*/>
                  Modifier Cheque
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
    return "loading"
  }
}

export default ChequeModalUpdate;
