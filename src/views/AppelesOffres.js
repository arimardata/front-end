import React, { Component } from "react";
import PageTitle from "../components/common/PageTitle";
import fetchApi from "../utils/fetchApi";
import AoModal from "../utils/AoModal";
import SelectModal from "../utils/SelectModal";
import DialogModal from "../utils/DialogModal";
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
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

// import lanesLayout from "../utils/lanesLayout";
import Board from "react-trello";

const styles = theme => ({
  root: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: green[500],
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: green[600]
    }
  }
});

class AppelsOffres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragend: {},
      openDialog: false,
      openSelect: false,
      aos: [],
      open: false,
      clicked: {},
      checklanes: {
        lane1: true,
        lane2: true,
        lane3: true,
        lane4: true,
        lane5: true,
        lane6: true,
        lane7: true
      },
      lanesLayout: {
        lanes: [
          {
            id: "lane1",
            title: "Favoris",
            label: "",
            hidden: false,
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
            hidden: false,
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
            title: "Retenu",
            label: "",
            hidden: false,
            cards: [],
            cardStyle: { backgroundColor: "rgba(0,255,0,0.1)" },
            style: {
              backgroundColor: "rgba(0,255,0,0.05)",
              color: "green",
              borderTop: "solid 2px green"
            }
          },
          {
            id: "lane4",
            title: "Projets",
            label: "",
            hidden: false,
            cards: [],
            cardStyle: { backgroundColor: "rgba(0,200,0,0.1)" },
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
            hidden: false,
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
            hidden: false,
            cards: [],
            cardStyle: { backgroundColor: "rgba(227,202,96,0.1)" },
            style: {
              backgroundColor: "rgba(227,202,96,0.05)",
              color: "rgb(227,202,96)",
              borderTop: "solid 2px rgb(227,202,96)"
            }
          },
          {
            id: "lane7",
            title: "Archive Des Projets Non-Accepte",
            label: "",
            hidden: false,
            cards: [],
            cardStyle: { backgroundColor: "rgba(198,16,16,0.1)" },
            style: {
              backgroundColor: "rgba(198,16,16,0.05)",
              color: "rgb(198,16,16)",
              borderTop: "solid 2px rgb(198,16,16)",
              heigth: "200px"
            }
          }
        ]
      }
    };
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value === "true";
    let lanesLayout = this.state.lanesLayout;
    let index;
    for (let i = 0; i < lanesLayout.lanes.length; i++) {
      if (lanesLayout.lanes[i].id === name) index = i;
    }
    lanesLayout.lanes[index].hidden = value;
    this.setState({
      ...this.state,
      lanesLayout,
      checklanes: { ...this.state.checklanes, [name]: !value }
    });
  };

  fetchAos = async () => {
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/find",
      token: window.localStorage.getItem("token")
    });

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
    this.setState({
      open: !this.state.open,
      clicked: ao[0]
    });
    this.toggle();
    console.log(ao[0]);
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
    let source = parseInt(sourceLaneId.substr(sourceLaneId.length - 1));
    let target = parseInt(targetLaneId.substr(targetLaneId.length - 1));
    // if (source > target) return false;
    // else {
    this.setState({
      ...this.state,
      openDialog: true,
      dragend: { cardId, sourceLaneId, targetLaneId, position, cardDetails }
    });
    // }
  }

  handleClose = () => {
    this.setState({ ...this.state, openSelect: false });
  };
  handleClickOpen = () => {
    this.setState({ ...this.state, openSelect: true });
  };

  handleAgree = async () => {
    const {
      cardId,
      sourceLaneId,
      targetLaneId,
      position,
      cardDetails
    } = this.state.dragend;
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
      this.setState({ ...this.state, baord, openDialog: false });
    }
  };

  handleDisagree = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  onDataChange = newData => {
    let baord = this.state.baord;
    this.setState({ ...this.state, baord: newData });

    this.setState({ ...this.state, baord });
  };

  render() {
    const { classes } = this.props;
    const { openDialog } = this.state;
    let baord;
    if (this.state.baord) {
      baord = (
        <Board
          laneDraggable={true}
          data={this.state.baord}
          draggable
          style={{ backgroundColor: "#efefef" }}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
          hideCardDeleteIcon
          onDataChange={this.onDataChange}
          collapsibleLanes
        />
      );
    } else {
      baord = (
        <center>
          <CircularProgress disableShrink />
        </center>
      );
    }
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Gestion des appels d'offres"
              subtitle=""
              className="text-sm-left"
            />
          </Row>
          <Row>
            <DialogModal
              openDialog={openDialog}
              handleDisagree={this.handleDisagree}
              handleAgree={this.handleAgree}
              dragend={this.state.dragend}
              aos={this.state.aos}
            />
          </Row>
          <Row>
            <SelectModal
              checklanes={this.state.checklanes}
              handleClose={this.handleClose}
              open={this.state.openSelect}
              handleChange={this.handleChange}
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
          <Fab
            onClick={this.handleClickOpen}
            aria-label={"Expand"}
            className={classes.fab}
            color="inherit"
          >
            <Icon>edit_icon</Icon>
          </Fab>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(AppelsOffres);
