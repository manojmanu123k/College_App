// Dependencies
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Group from "@material-ui/icons/Group";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Divider from "@material-ui/core/Divider";
import SecurityService from "../security/SecurityService";
import UserActions from "../redux/actions/UserActions";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  user: {
    color: "white"
  }
};

class Navbar extends React.Component {
  state = {
    auth: SecurityService.getUser() != null,
    anchorEl: null,
    openDrawer: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = open => () => {
    this.setState({
      openDrawer: open
    });
  };

  logout = () => {
    this.props.actions.logout();
    this.handleClose();
    SecurityService.logout();
    this.props.history.push("/home");
  };

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;

    const sideList = (
      <div className={classes.list}>
        <div className="navbar-drawer-header">
          <div className="navbar-drawer-text">Colle</div>
        </div>
        <Divider />
        <List>
          {/* START LINK MENU */}
          <Link to="/courses">
            <ListItem button key="course">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="course" />
            </ListItem>
          </Link>
          <Link to="/exams">
            <ListItem button key="exam">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="exam" />
            </ListItem>
          </Link>
          <Link to="/students">
            <ListItem button key="student">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="student" />
            </ListItem>
          </Link>
          <Link to="/teachers">
            <ListItem button key="teacher">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="teacher" />
            </ListItem>
          </Link>
          {/* END LINK MENU */}
        </List>
      </div>
    );

    const loggedInUser = user && (
      <div>
        <IconButton
          aria-owns={anchorEl ? "navbar-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          className={classes.user}
        >
          {user.username}
          <KeyboardArrowDown />
        </IconButton>
        <Menu
          id="navbar-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/profile">
            <MenuItem onClick={this.handleClose}>
              <Person />
              Profile
            </MenuItem>
          </Link>
          {SecurityService.hasRole("ADMIN") && (
            <Link to="/users">
              <MenuItem onClick={this.handleClose}>
                <Group />
                User Management
              </MenuItem>
            </Link>
          )}
          <Divider />
          <MenuItem onClick={this.logout}>
            <PowerSettingsNew />
            Logout
          </MenuItem>
        </Menu>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {user && (
              <div>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  open={this.state.openDrawer}
                  onClose={this.toggleDrawer(false)}
                  onOpen={this.toggleDrawer(true)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {sideList}
                  </div>
                </SwipeableDrawer>
              </div>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/home" className="white">
                test
              </Link>
            </Typography>
            {loggedInUser}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
});

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Navbar)));
