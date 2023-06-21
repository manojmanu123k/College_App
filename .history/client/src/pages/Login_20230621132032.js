import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/actions/UserActions";

// Material UI
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
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

    this.props.login(login.username, login.password).then(() => {
      if (this.props.user.token) {
        if (login.remember) {
          sessionStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(this.props.user));
        } else {
          localStorage.removeItem("user");
          sessionStorage.setItem("user", JSON.stringify(this.props.user));
        }

        // Redirect to the home page after successful login
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
              onChange={(event) => this.setState({ login: { ...login, username: event.target.value } })}
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
              onChange={(event) => this.setState({ login: { ...login, password: event.target.value } })}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                id="remember"
                checked={login.remember || false}
                onChange={(event) => this.setState({ login: { ...login, remember: event.target.checked } })}
                color="primary"
              />
            }
            label="Remember me"
            className="mt-20"
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign in
          </Button>

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={showError}
            autoHideDuration={6000}
            onClose={this.closeError.bind(this)}
          >
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
          </Snackbar>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = {
  login
};

// Validate types
Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object
};

// Get props from state
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
