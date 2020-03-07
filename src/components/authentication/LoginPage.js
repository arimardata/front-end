import React from "react";
import LoginFrom from "./LoginForm";
import { Container, Col, Card, CardHeader, Alert } from "shards-react";

export default LoginPage => (
  <div>
    <Container fluid className="px-0">
      <center>
        <Alert className="mb-0">
          <i className="fa fa-info mx-2" /> Veuillez vous connecter pour
          continuer :
        </Alert>
      </center>
    </Container>
    <Container>
      <center>
        <Col>
          <Card lg="8" className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Verifier vos identifiants </h6>
            </CardHeader>
            <LoginFrom />
          </Card>
        </Col>
      </center>
    </Container>
  </div>
);
