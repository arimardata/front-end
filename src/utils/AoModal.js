import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "shards-react";
import lanesLayout from "./lanesLayout";
import IconButton from "@material-ui/core/IconButton";

const AoModal = props => {
  let data = props.data;
  console.log(data);
  return (
    <div>
      <div className="row">
        <div className="col-10">
          <p>{data.chef_ouvrage}</p>
        </div>
        <div className="col-1">
          <IconButton>
            <i className="material-icons">picture_as_pdf</i>
          </IconButton>
        </div>
        <div className="col-1">
          <IconButton>
            <i className="material-icons">cloud_download</i>
          </IconButton>
        </div>
      </div>

      <hr />
      <div className="row">
        <div className="col">
          N° AO :<span>{data.num_AO}</span>
        </div>
        <div className="col">
          Mise en ligne :<span>{data.mise_en_ligne}</span>
        </div>
        <div className="col">
          type : <span>{data.type}</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          N° d'ordre :<span>{data.num_Ordre}</span>
        </div>
        <div className="col">
          Date limite :<span>{data.date_Limite}</span>
        </div>
        <div className="col">
          ville :<span>{data.ville}</span>
        </div>
      </div>
      <hr />
      <div>{data.autres_details}</div>
      <hr />
      <div>Estimation : </div>
      <br />
      <div>{data.estimation}</div>
      <hr />
      <div className="row">
        <div className="col">
          <div>Caution provisoire(CP) : </div>
          <br />
          <div>{data.caution}</div>
        </div>

        <div className="col">
          {data.etat === "Retenu" && data.cautionFinal && (
            <>
              <div>Caution final : </div>
              <br />
              <div>{data.cautionFinal}</div>
            </>
          )}
        </div>
      </div>

      <hr />
      {data.etat === "Archive Des Projets Non-Accepte" && data.moinsDisant && (
        <div className="row">
          <div className="col">
            <div>Le moins disant : </div>
            <br />
            <div>{data.moinsDisant}</div>
          </div>

          <div className="col">
            <>
              <div>Le montant : </div>
              <br />
              <div>{data.montant}</div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default AoModal;
