// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { changePassword } from "../redux/actions/UserActions";

class DialogChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      showError: false
    };
  }

  confirm = () => {
    const { oldPassword, newPassword, confirmNewPassword } = this.state.user;

    if (!newPassword) {
      this.setState({ showError: "Insert a new password" });
    } else if (!oldPassword) {
      this.setState({ showError: "Insert the old password" });
    } else if (newPassword !== confirmNewPassword) {
      this.setState({
        showError: "Your new password and confirm password don't match"
      });
    } else {
      const { changePassword, onConfirm } = this.props;
      changePassword(newPassword, oldPassword)
        .then(() => {
          this.setState({ user: {} });
          onConfirm();
        })
        .catch(() => {
          this.setState({ showError: "Old Password not valid" });
        });
    }
  };

  closeMessage = () => {
    this.setState({ showError: false });
  };

  handleChange = event => {
    const { user } = this.state;
    const { id, value } = event.target;

    this.setState({
      user: {
        ...user,
        [id]: value
      }
    });
  };

  render() {
    const { open, onClose } = this.props;
    const { oldPassword, newPassword, confirmNewPassword, showError } =
      this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <TextField
            id="oldPassword"
            label="Old Password"
            value={oldPassword}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            type="password"
          />

          <TextField
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            type="password"
          />

          <TextField
            id="confirmNewPassword"
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            type="password"
          />

          {showError && (
            <SnackbarContent
              style={{ marginTop: "30px", maxWidth: "100%" }}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar">{showError}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.closeMessage}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={this.confirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogChangePwd.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  changePassword: bindActionCreators(changePassword, dispatch)
});

export default connect(null, mapDispatchToProps)(DialogChangePwd);
