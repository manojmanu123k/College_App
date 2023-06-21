import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";
import DialogChangePwdAdmin from "../components/DialogChangePwdAdmin";
import crypto from "js-sha3";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import UserActions from "../redux/actions/UserActions";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      roles: {},
      openChangePwd: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsUser.getUser(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ user: props.user });
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

  save(event) {
    event.preventDefault();
    if (this.state.user._id) {
      this.props.actionsUser.updateUser(this.state.user).then(() => {
        this.props.history.push("/users/");
      });
    } else {
      const user = { ...this.state.user };
      user.password = crypto.sha3_512(this.state.user.password);
      this.props.actionsUser.createUser(user).then(() => {
        this.props.history.push("/users/");
      });
    }
  }

  changeRole(i, event) {
    const value = event.target.value;
    this.setState(prevState => {
      const user = { ...prevState.user };
      user.roles[i] = value;
      return { user };
    });
  }

  addRole(event) {
    this.setState(prevState => {
      const roles = { ...prevState.roles };
      if (!prevState.user.roles) {
        prevState.user.roles = [];
      }
      prevState.user.roles.push(prevState.roles.newRole);
      roles.newRole = "";
      return { roles };
    });
  }

  removeRole(i, event) {
    this.setState(prevState => {
      const user = { ...prevState.user };
      user.roles.splice(i, 1);
      return { user };
    });
  }

  render() {
    return (
      <div>
        <h1>User Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="username"
            label="Username"
            value={this.state.user.username || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
            required
            disabled={this.state.user._id}
            error={!this.state.user.username || this.state.user.username === ""}
          />

          {!this.state.user._id && (
            <TextField
              id="password"
              label="Password"
              value={this.state.user.password || ""}
              onChange={Utils.handleChange.bind(this, "user")}
              margin="normal"
              fullWidth
              required
              type="password"
              error={!this.state.user.password || this.state.user.password === ""}
            />
          )}

          <TextField
            id="name"
            label="Name"
            value={this.state.user.name || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="surname"
            label="Surname"
            value={this.state.user.surname || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="mail"
            label="Mail"
            value={this.state.user.mail || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          <h2>Roles</h2>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                id="newRole"
                label="Add a new role..."
                value={this.state.roles.newRole || ""}
                onChange={Utils.handleChange.bind(this, "roles")}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Fab
                onClick={this.addRole.bind(this)}
                size="small"
                color="primary"
              >
                <Add />
              </Fab>
            </Grid>
          </Grid>

          {this.state.user.roles &&
            this.state.user.roles.map((role, i) => (
              <Grid container spacing={8} alignItems="flex-end" key={i}>
                <Grid item xs={10}>
                  <TextField
                    id={`roles[${i}]`}
                    label="Add a new role..."
                    value={role}
                    onChange={this.changeRole.bind(this, i)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={this.removeRole.bind(this, i)}
                  >
                    <Delete />
                  </Fab>
                </Grid>
              </Grid>
            ))}

          <div className="footer-card">
            <Button
              onClick={this.openDialogChangePwd.bind(this)}
              variant="contained"
              color="secondary"
              style={{ float: "left" }}
            >
              Change Password
            </Button>
            <DialogChangePwdAdmin
              idUser={this.state.user._id}
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

const mapDispatchToProps = dispatch => {
  return {
    actionsUser: bindActionCreators(UserActions, dispatch)
  };
};

UserEdit.propTypes = {
  actionsUser: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.UserReducer.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
