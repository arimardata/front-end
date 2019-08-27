import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import { Store, Constants, Dispatcher } from "../../../flux";
import fetchApi from "../../../utils/fetchApi";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChequeModalUpdate from "../../../utils/ChequeModalUpdate";
import ConfirmDeleteModal from "../../../utils/ConfirmDeleteModal";

import { Modal, ModalBody } from "shards-react";

const defaultToolbarSelectStyles = {
  iconContainer: {
    marginRight: "24px"
  },
  modalTop: {
    top: "10%"
  },
  deleteDialogTop: {
    top: "30%"
  }
};

class CustomToolbarSelect extends React.Component {
  state = { open: false, openDeleteDialog: false };
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce(
      (nextSelectedRows, _, index) => {
        if (
          !this.props.selectedRows.data.find(
            selectedRow => selectedRow.index === index
          )
        ) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      },
      []
    );

    this.props.setSelectedRows(nextSelectedRows);
  };

  toggleDeleteDialog = () => {
    this.setState({
      openDeleteDialog: !this.state.openDeleteDialog
    });
  };

  delete = () => {
    //console.log(this.props.displayData)

    let data = this.props.selectedRows.data;
    data.map(el => {
      let index = el.index;
      let id = this.props.displayData[index].data[0];
      fetchApi({
        method: "DELETE",
        url: "/api/Cheques/delete/" + id,
        token: window.localStorage.getItem("token")
      }).then(data => {});
      Dispatcher.dispatch({
        actionType: Constants.TABLE_CHEQUE_UPDATED
      });
    });
  };

  handleClick = () => {
    this.toggle();
  };

  toggle = () => {
    let index = this.props.selectedRows.data[0].index;
    let id = this.props.displayData[index].data[0];

    this.setState({
      open: !this.state.open,
      id: id
    });
  };

  render() {
    const { classes } = this.props;
    let edit;

    if (this.props.selectedRows.data.length == 1)
      edit = (
        <Tooltip title={"Modifier"}>
          <IconButton onClick={this.toggle}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      );

    return (
      <div className={classes.iconContainer}>
        <React.Fragment>
          <Tooltip title={"Tous supprimer"}>
            <IconButton onClick={this.toggleDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {edit}
          <Modal size="lg" open={this.state.open} className={classes.modalTop}>
            <ModalBody>
              <ChequeModalUpdate id={this.state.id} toggle={this.toggle} />
            </ModalBody>
          </Modal>
          <Modal
            open={this.state.openDeleteDialog}
            className={classes.deleteDialogTop}
          >
            <ModalBody>
              <p>Est-vous sure ?</p>
              <ConfirmDeleteModal
                handleAgree={this.delete}
                toggle={this.toggleDeleteDialog}
              />
            </ModalBody>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
