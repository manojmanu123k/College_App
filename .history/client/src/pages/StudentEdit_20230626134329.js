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
import * as courseActions from "../redux/actions/CourseActions";
import * as studentActions from "../redux/actions/StudentActions";

class StudentEdit extends Component {
  // Init student
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsStudent.getStudent(this.props.match.params.id);
    }
  }

  // Insert props student in state
  static getDerivedStateFromProps(props, state) {
    if (props.student !== state.student) {
      return {
        student: props.student
      };
    }
    return null;
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.student._id) {
      this.props.actionsStudent
        .updateStudent(this.state.student)
        .then(() => {
          this.props.history.push("/students/");
        });
    } else {
      this.props.actionsStudent
        .createStudent(this.state.student)
        .then(() => {
          this.props.history.push("/students/");
        });
    }
  }

  // Show content
  render() {
    const { student } = this.state;
    return (
      <div className="edit-box">
        <form onSubmit={this.save.bind(this)}>
          <TextField
            id="name"
            label="Name"
            value={student.name || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Link to={"/students/"}>
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
StudentEdit.propTypes = {
  student: PropTypes.object.isRequired,
  actionsStudent: PropTypes.object.isRequired
};

// Redux connect
function mapStateToProps(state) {
  return {
    student: state.student
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsStudent: bindActionCreators(studentActions, dispatch),
    actionsCourse: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentEdit);
