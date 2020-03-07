import React from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Container, Col, Card, CardHeader, Alert } from "shards-react";

export default UpdatePasswordPage => (
  <div className="mb-2">
    <Container>
      <center>
        <Col>
          <Card lg="8" className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Changement du mot de passe</h6>
            </CardHeader>
            <UpdatePasswordForm />
          </Card>
        </Col>
      </center>
    </Container>
  </div>
);
