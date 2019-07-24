import React, { Component } from "react";
import PageTitle from "../components/common/PageTitle";
import fetchApi from "../utils/fetchApi";
import AoModal from "../utils/AoModal";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Container,
  Card,
  CardHeader,
  InputGroup,
  Alert,
  ButtonGroup,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Progress
} from "shards-react";
import { Store, Constants } from "../flux";
import lanesLayout from "../utils/lanesLayout";
import Board from "react-trello";

class AppelsOffres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aos: [],
      open: false,
      clicked: {}
    };
    this.onChange = this.onChange.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  onChange() {
    // this.setState({
    //   ...this.state
    // });
  }

  async componentWillMount() {
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/find",
      token: window.localStorage.getItem("token")
    });
    let aos = lanesLayout;

    data.map((ao, id) => {
      let index;
      for (let i = 0; i < aos.lanes.length; i++) {
        if (aos.lanes[i].title === ao.etat) index = i;
      }
      aos.lanes[index].cards.push({
        id: ao.id,
        title: ao.num_AO,
        description: ao.chef_ouvrage,
        label: ao.ville,
        draggable: true
      });
    });

    this.setState({
      aos: data,
      baord: aos
    });
  }

  onCardClick(cardId, metadata, laneId) {
    let lane = this.state.baord.lanes.filter(elt => elt.id == laneId);
    let card = lane[0].cards.filter(elt => elt.id == cardId);
    let ao = this.state.aos.filter(ao => ao.num_AO == card[0].title);
    this.setState({
      open: !this.state.open,
      clicked: ao[0]
    });
    this.toggle();
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  async handleDragEnd(
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) {
    let lane = this.state.baord.lanes.filter(elt => elt.id == targetLaneId);
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/changeetat/" + cardDetails.id + "/" + lane[0].title,
      token: window.localStorage.getItem("token")
    });
  }

  render() {
    let baord;
    if (this.state.baord) {
      baord = (
        <Board
          laneDraggable={false}
          data={this.state.baord}
          draggable
          style={{ backgroundColor: "#efefef" }}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
        />
      );
    } else {
      baord = "loading";
    }
    const { open } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Card className="mt-1">
          <CardBody className="p-0 pb-3">{baord}</CardBody>
        </Card>
        <Modal size="lg" open={open} toggle={this.toggle}>
          <ModalBody>
            {/* <Progress multi>
              <Progress bar value="50" />
              <Progress bar theme="success" value="20" />
            </Progress>
            <hr /> */}
            <AoModal data={this.state.clicked} />
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default AppelsOffres;
