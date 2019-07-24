import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import ChequeModal from "../../../utils/ChequeModal";
import { Modal, ModalBody } from "shards-react";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  state = { open: false };
  handleClick = () => {
    console.log("clicked on icon!");
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
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Modal size="lg" open={open} toggle={this.toggle}>
          <ModalBody>
            <ChequeModal />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
