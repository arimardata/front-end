import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "shards-react";
import lanesLayout from "./lanesLayout";

const AoModal = props => {
  let data = props.data;
  console.log(data);
  console.log(lanesLayout);
  return (
    <div>
      <p>{data.chef_ouvrage}</p>
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
      <div>Caution provisoire(CP) : </div>
      <br />
      <div>{data.caution}</div>
    </div>
  );
};

export default AoModal;
