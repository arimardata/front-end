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
// import lanesLayout from "../utils/lanesLayout";
import Board from "react-trello";

class AppelsOffres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aos: [],
      open: false,
      clicked: {},
      lanesLayout: {
        lanes: [
          {
            id: "lane1",
            title: "Favoris",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(128,128,128,0.1)" },
            style: {
              backgroundColor: "rgba(128,128,128,0.05)",
              color: "gray",
              borderTop: "solid 2px gray"
            }
          },
          {
            id: "lane2",
            title: "Postule",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(227,202,96,0.1)" },
            style: {
              backgroundColor: "rgba(227,202,96,0.05)",
              color: "#E3CA60",
              borderTop: "solid 2px #E3CA60"
            }
          },
          {
            id: "lane3",
            title: "Archive Des Projets Non-Accepte",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(198,16,16,0.1)" },
            style: {
              backgroundColor: "rgba(198,16,16,0.05)",
              color: "rgb(198,16,16)",
              borderTop: "solid 2px rgb(198,16,16)",
              heigth: "200px"
            }
          },
          {
            id: "lane4",
            title: "Retenu",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(0,255,0,0.1)" },
            style: {
              backgroundColor: "rgba(0,255,0,0.05)",
              color: "green",
              borderTop: "solid 2px green"
            }
          },

          {
            id: "lane5",
            title: "Archive Des Projets Finis",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(0,255,0,0.1)" },
            style: {
              backgroundColor: "rgba(0,255,0,0.05)",
              color: "green",
              borderTop: "solid 2px green"
            }
          },

          {
            id: "lane6",
            title: "A Modifier",
            label: "",
            cards: [],
            cardStyle: { backgroundColor: "rgba(227,202,96,0.1)" },
            style: {
              backgroundColor: "rgba(227,202,96,0.05)",
              color: "rgb(227,202,96)",
              borderTop: "solid 2px rgb(227,202,96)"
            }
          }
        ]
      }
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

  fetchAos = async () => {
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/find",
      token: window.localStorage.getItem("token")
    });
    // let baord = Object.assign({}, lanesLayout);
    // baord.lanes = lanesLayout.lanes.concat();
    // baord.lanes.map((lane, i) => {
    //   lane = Object.assign({}, lanesLayout.lanes[i]);
    //   lane.cardStyle = Object.assign({}, lanesLayout.lanes[i].cardStyle);
    //   lane.style = Object.assign({}, lanesLayout.lanes[i].style);
    //   lane.cards = lanesLayout.lanes[i].cards.concat();
    // });
    // console.log(baord);
    let baord = this.state.lanesLayout;
    data.map((ao, id) => {
      let index;
      for (let i = 0; i < baord.lanes.length; i++) {
        if (baord.lanes[i].title === ao.etat) index = i;
      }
      baord.lanes[index].cards.push({
        id: ao.id,
        title: ao.num_AO,
        description: ao.chef_ouvrage,
        label: ao.ville,
        draggable: true
      });
    });

    this.setState({
      aos: data,
      baord
    });
  };

  componentWillMount() {
    this.fetchAos();
  }
  componentWillUnmount() {
    this.setState({ baord: {} });
  }

  onCardClick(cardId, metadata, laneId) {
    let lane = this.state.baord.lanes.filter(elt => elt.id == laneId);
    let card = lane[0].cards.filter(elt => elt.id == cardId);
    let ao = this.state.aos.filter(ao => ao.num_AO == card[0].title);
    console.log("ao", ao);
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
    if (sourceLaneId !== targetLaneId) {
      let lane = this.state.baord.lanes.filter(elt => elt.id == targetLaneId);
      const data = fetchApi({
        method: "GET",
        url: "/api/projects/changeetat/" + cardDetails.id + "/" + lane[0].title,
        token: window.localStorage.getItem("token")
      });
      let baord = this.state.baord;

      baord.lanes.map(lane => {
        if (lane.id == targetLaneId) {
          lane.cards.push(cardDetails);
        }
      });

      baord.lanes.map(lane => {
        if (lane.id == sourceLaneId) {
          lane = {
            ...lane,
            cards: lane.cards.filter(card => card.id !== cardId)
          };
        }
      });

      this.setState({ baord });
    }
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
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion des appels d'offres"
            subtitle=""
            className="text-sm-left"
          />
        </Row>
        <Card className="mt-1">
          <CardBody className="p-0 pb-3">{baord}</CardBody>
        </Card>
        <Modal size="lg" open={open} toggle={this.toggle}>
          <ModalBody>
            <AoModal data={this.state.clicked} />
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default AppelsOffres;
