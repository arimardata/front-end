import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "shards-react";
import lanesLayout from "./lanesLayout";
import IconButton from "@material-ui/core/IconButton";
import fetchApi from "./fetchApi";
import FileSaver from "file-saver";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      Num_Ordre: "",
      chef_ouvrage: "",
      Num_AO: "",
      Caution: "",
      Mise_en_ligne: "",
      Date_Limite: "",
      Type: "",
      Ville: "",
      Estimation: "",
      Autres_details: "",

      request: false
    };
  }
  async componentWillMount() {
    let id = this.props.id;

    const data = await fetchApi({
      method: "GET",
      url: "/api/projects/findone/" + id,
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
      [name]: value
    });
  };
  handleSubmit = async e => {
    // your submit logic

    this.setState({ request: true });
    let id = this.props.id;

    const data = await fetchApi({
      method: "POST",
      url: "/api/projects/modifier/" + id,
      token: window.localStorage.getItem("token"),
      body: this.state.data
    });
    Dispatcher.dispatch({
      actionType: Constants.TABLE_AppelOffre_UPDATED
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
      Num_Ordre,
      chef_ouvrage,
      Num_AO,
      Caution,
      Mise_en_ligne,
      Date_Limite,
      Type,
      Ville,
      Estimation,
      Autres_details,
      etat
    } = this.state;
    return (
      <div>
        <ValidatorForm
          autoComplete="on"
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <div className="row">
            <div className="col-10">
              <p>
                <TextValidator
                  label="Chef ouvrage :"
                  onChange={this.handleOnChange}
                  style={{ width: "100%" }}
                  name="chef_ouvrage"
                  value={chef_ouvrage}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />
              </p>
            </div>
            <div className="col-1">
              <IconButton>
                <i className="material-icons">picture_as_pdf</i>
              </IconButton>
            </div>
            {/* <div className="col-1">
          <IconButton onClick={downloadRar(data.num_Ordre)}>
            <i className="material-icons">cloud_download</i>
          </IconButton>
        </div> */}
          </div>

          <hr />
          <div className="row">
            <div className="col">
              <TextValidator
                label="N° AO :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="Num_AO"
                value={Num_AO}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Mise en ligne :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="Mise_en_ligne"
                value={Mise_en_ligne}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Type :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="Type"
                value={Type}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextValidator
                label="N° d'ordre :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="Num_Ordre"
                value={Num_Ordre}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Date limite :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="Date_Limite"
                value={Date_Limite}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Ville :"
                onChange={this.handleOnChange}
                style={{ width: "50%" }}
                name="Ville"
                value={Ville}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
          </div>
          <hr />
          <div>
            <TextValidator
              label="Autre details :"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="Autres_details"
              value={Autres_details}
              validators={["required"]}
              errorMessages={["Ce Champ est Obligatoir : "]}
            />{" "}
          </div>
          <hr />
          <div>
            <TextValidator
              label="Estimation :"
              onChange={this.handleOnChange}
              style={{ width: "50%" }}
              name="Estimation"
              value={Estimation}
              validators={["required"]}
              errorMessages={["Ce Champ est Obligatoir : "]}
            />{" "}
          </div>
          <br />
          <div></div>
          <hr />
          <div className="row">
            <div className="col">
              <div>
                <TextValidator
                  label="Caution provisoire(CP) :"
                  onChange={this.handleOnChange}
                  style={{ width: "50%" }}
                  name="Caution"
                  value={Caution}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />{" "}
              </div>
              <br />
              <div></div>
            </div>
          </div>

          <hr />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.request}
          >
            {this.state.request && <CircularProgress size={24} />}
            Enrengistrer Appel d'offre
          </Button>
          <Button onClick={this.HandleAnnuler}>Annuler</Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default UpdateModal;
