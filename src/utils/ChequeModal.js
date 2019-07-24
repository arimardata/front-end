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

const ChequeModal = props => {
  //let data = props.data;
  //console.log(data);
  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feBanque">Banque</label>
                  <FormInput id="feBanque" placeholder="Banque" />
                </Col>
                <Col md="6">
                  <label htmlFor="feSomme">Somme</label>
                  <FormInput id="feSomme" placeholder="Somme" />
                </Col>
              </Row>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmetteur">Emetteur</label>
                  <FormInput id="feEmetteur" placeholder="Emetteur" />
                </Col>
                <Col md="6">
                  <label htmlFor="feRecepteur">Recepteur</label>
                  <FormInput id="feRecepteur" placeholder="Recepteur" />
                </Col>
              </Row>

              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feInputCity">Alerte</label>
                  <FormInput id="feInputCity" />
                </Col>
                <Col md="3" className="form-group">
                  <label htmlFor="feInputState">Etat</label>
                  <FormSelect id="feInputState">
                    <option>Entrant</option>
                    <option>Sortant</option>
                  </FormSelect>
                </Col>
                <Col md="3" className="form-group">
                  <label htmlFor="feInputZip">date</label>
                  <FormInput id="feInputZip" type="date" />
                </Col>
              </Row>
              <Button type="submit">Enrengistrer Cheque</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default ChequeModal;
