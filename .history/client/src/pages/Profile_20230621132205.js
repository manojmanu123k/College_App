import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogChangePwd from "../components/DialogChangePwd";
import { saveUser } from "../redux/actions/UserActions";
import SecurityService from "../security/SecurityService";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showMessage: false,
      openChangePwd: false
    };
  }

  save(event) {
    event.preventDefault();
    this.props.saveUser(this.state.user).then(data => {
      SecurityService.updateUser(this.state.user);
      this.setState({ showMessage: true });
    });
  }

  closeMessage() {
    this.setState({ showMessage: false });
  }

  openDialogChangePwd() {
    this.setState({ openChangePwd: true });
  }

  closeDialogChangePwd() {
    this.setState({ openChangePwd: false });
  }

  confirmDialogChangePwd(passwordNew, passwordOld) {
    this.setState({ openChangePwd: false });
  }

  render() {
    return (
      <div>
        <h1>My Profile</h1>

        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="username"
            label="Username"
            value={this.state.user.username || ""}
            onChange={(event) =>
              this.setState({
                user: { ...this.state.user, username: event.target.value }
              })
            }
            margin="normal"
            fullWidth
            disabled
          />

          <TextField
            id="name"
            label="Name"
            value={this.state.user.name || ""}
            onChange={(event) =>
              this.setState({
                user: { ...this.state.user, name: event.target.value }
              })
            }
            margin="normal"
            fullWidth
          />

          <TextField
            id="surname"
            label="Surname"
            value={this.state.user.surname || ""}
            onChange={(event) =>
              this.setState({
                user: { ...this.state.user, surname: event.target.value }
              })
            }
            margin="normal"
            fullWidth
          />

          <TextField
            id="mail"
            label="E-mail"
            value={this.state.user.mail || ""}
            onChange={(event) =>
              this.setState({
                user: { ...this.state.user, mail: event.target.value }
              })
            }
            margin="normal"
            fullWidth
          />

          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.state.showMessage}
            autoHideDuration={6000}
            onClose={this.closeMessage.bind(this)}
          >
            <SnackbarContent
              style={{
                marginTop: "30px",
                maxWidth: "100%"
              }}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar">User Saved</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.closeMessage.bind(this)}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </Snackbar>

          <div className="footer-card">
            <Button
              onClick={this.openDialogChangePwd.bind(this)}
              variant="contained"
              color="secondary"
              style={{ float: "left" }}
            >
              Change Password
            </Button>
            <DialogChangePwd
              open={this.state.openChangePwd}
              onClose={this.closeDialogChangePwd.bind(this)}
              onConfirm={this.confirmDialogChangePwd.bind(this)}
            />
            <Link to="/users/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: bindActionCreators(saveUser, dispatch)
  };
};

Profile.propTypes = {
  saveUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
