import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Custom Actions
import * as courseActions from "../redux/actions/courseActions";

class TeacherEdit extends Component {
  // Init teacher
  constructor(props) {
    super(props);
    this.state = {
      teacher: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      // this.props.actions.getTeacher(this.props.match.params.id);
    }
  }

  // Insert props teacher in state
  static getDerivedStateFromProps(props, state) {
    if (props.teacher !== state.teacher) {
      return {
        teacher: props.teacher
      };
    }
    return null;
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.teacher._id) {
      // this.props.actions.updateTeacher(this.state.teacher);
    } else {
      // this.props.actions.createTeacher(this.state.teacher);
    }
  }

  // Show content
  render() {
    const { teacher } = this.state;
    return (
      <div className="edit-box">
        <form onSubmit={this.save.bind(this)}>
          <TextField
            id="name"
            label="Name"
            value={teacher.name || ""}
            onChange={Utils.handleChange.bind(this, "teacher")}
            margin="normal"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Link to={"/teachers/"}>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}

// Props validation
TeacherEdit.propTypes = {
  teacher: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

// Redux connect
function mapStateToProps(state) {
  return {
    teacher: state.teacher
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherEdit);
