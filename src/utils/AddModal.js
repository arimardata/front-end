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

import { Button } from "@material-ui/core";

class AddModal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleOnChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    // your submit logic
    await fetchApi({
      method: "POST",

      url: "/api/projects/ajouter",
      token: window.localStorage.getItem("token"),
      body: this.state
    });
    this.props.toggle();

    window.location.reload();
  };
  HandleAnnuler = () => {
    this.setState({});
    this.props.toggle();
  };

  render() {
    console.log(this.props);
    const {
      num_Ordre,
      chef_ouvrage,
      num_AO,
      caution,
      mise_en_ligne,
      date_limite,
      type,
      ville,
      estimation,
      autres_details
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
                name="num_AO"
                value={num_AO}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Mise en ligne :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="mise_en_ligne"
                value={mise_en_ligne}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Type :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="type"
                value={type}
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
                name="num_Ordre"
                value={num_Ordre}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Date limite :"
                onChange={this.handleOnChange}
                style={{ width: "100%" }}
                name="date_limite"
                value={date_limite}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoir : "]}
              />
            </div>
            <div className="col">
              <TextValidator
                label="Ville :"
                onChange={this.handleOnChange}
                style={{ width: "50%" }}
                name="ville"
                value={ville}
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
              name="autres_details"
              value={autres_details}
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
              name="estimation"
              value={estimation}
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
                  name="caution"
                  value={caution}
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoir : "]}
                />{" "}
              </div>
              <br />
              <div></div>
            </div>
          </div>

          <hr />
          <Button variant="contained" color="primary" type="submit">
            Enrengistrer Appel d'offre
          </Button>
          <Button onClick={this.HandleAnnuler}>Annuler</Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default AddModal;
