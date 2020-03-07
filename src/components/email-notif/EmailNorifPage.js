import React from "react";
import EmailNotifForm from "./EmailNotifForm";
import { Container, Col, Card, CardHeader, Alert } from "shards-react";

export default EmailNotifPage => (
  <div className="mb-2">
    <Container>
      <center>
        <Col>
          <Card lg="8" className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Veuillez vous saisir le nouveau email</h6>
            </CardHeader>
            <EmailNotifForm />
          </Card>
        </Col>
      </center>
    </Container>
  </div>
);
