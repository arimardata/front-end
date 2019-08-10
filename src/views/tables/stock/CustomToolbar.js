import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import CreerMaterielModal from "../../../utils/CreerMaterielModal";
import { Modal, ModalBody } from "shards-react";

const defaultToolbarStyles = {};

class CustomToolbar extends React.Component {
  state = { open: false };
  handleClick = () => {
    this.toggle();
  };

  toggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Tooltip title={"Add new record"}>
          <IconButton onClick={this.handleClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Modal size="lg" open={open}>
          <ModalBody>
            <CreerMaterielModal toggle={this.toggle} />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
