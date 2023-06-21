import React, { Component } from "react";
import Utils from "../utils/utils";
import crypto from "js-sha3";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../redux/actions/UserActions";

// Material UI
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: "admin",
        password: "pass",
        remember: true
      },
      showError: false
    };
  }

  login(event) {
    event.preventDefault();
    const { login } = this.state;

    this.props.login(login.username, crypto.sha3_512(login.password)).then(res => {
      if (this.props.user.token) {
        if (login.remember) {
          sessionStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(this.props.user));
        } else {
          localStorage.removeItem("user");
          sessionStorage.setItem("user", JSON.stringify(this.props.user));
        }

        SecurityService.setAuthorization();
        this.props.history.push("/home");
      } else {
        this.setState({ showError: true });
      }
    });
  }

  closeError() {
    this.setState({ showError: false });
  }

  render() {
    const { login, showError } = this.state;

    return (
      <div className="login-form">
        <div className="text-center">
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
        </div>
        <form onSubmit={this.login.bind(this)}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={login.username || ""}
              onChange={Utils.handleChange.bind(this, "login")}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={login.password || ""}
              onChange={Utils.handleChange.bind(this, "login")}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                id="remember"
                checked={login.remember || false}
                onChange={Utils.handleChangeCheck.bind(this, "login", "remember")}
                color="primary"
              />
            }
            label="Remember me"
            className="mt-20"
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign in
          </Button>

          {showError && (
            <SnackbarContent
              className="error mb-30"
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar">
                  <ErrorIcon />
                  Login Failed
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.closeError.bind(this)}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
