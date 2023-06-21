// Dependencies
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
import CourseActions from "../redux/actions/CourseActions";
import ExamActions from "../redux/actions/ExamActions";
import TeacherActions from "../redux/actions/TeacherActions";
import StudentActions from "../redux/actions/StudentActions";

class CourseEdit extends Component {
  // Init course
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsCourse.get(this.props.match.params.id);
      this.props.actionsExam.findBy_course(this.props.match.params.id);
      this.props.actionsStudent.findBy_courses(this.props.match.params.id);
      this.props.actionsTeacher.findBy_courses(this.props.match.params.id);
    }
  }

  // Insert props course in state
  static getDerivedStateFromProps(props, state) {
    if (props.course !== state.course) {
      return {
        course: props.course
      };
    }
    return null;
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.course._id) {
      this.props.actionsCourse.update(this.state.course).then(() => {
        this.props.history.push("/courses/");
      });
    } else {
      this.props.actionsCourse.create(this.state.course).then(() => {
        this.props.history.push("/courses/");
      });
    }
  }

  // Show content
  render() {
    const { course } = this.state;
    const { listExam, listStudent, listTeacher } = this.props;

    return (
      <div>
        <h1>Course Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="name"
            label="Name"
            value={course.name || ""}
            onChange={Utils.handleChange.bind(this, "course")}
            margin="normal"
            fullWidth
            required
            error={!course.name && course.name === ""}
          />

          {/* RELATIONS */}

          {/* EXTERNAL RELATIONS */}

          {/* External relation with exam */}
          <h3>Exam</h3>
          {!listExam || listExam.length === 0 ? (
            <div>No Exam associated</div>
          ) : (
            listExam.map((item) => (
              <Link to={`/exams/${item._id}`} key={item._id}>
                {item._id}
              </Link>
            ))
          )}

          {/* External relation with student */}
          <h3>Student</h3>
          {!listStudent || listStudent.length === 0 ? (
            <div>No Student associated</div>
          ) : (
            listStudent.map((item) => (
              <Link to={`/students/${item._id}`} key={item._id}>
                {item._id}
              </Link>
            ))
          )}

          {/* External relation with teacher */}
          <h3>Teacher</h3>
          {!listTeacher || listTeacher.length === 0 ? (
            <div>No Teacher associated</div>
          ) : (
            listTeacher.map((item) => (
              <Link to={`/teachers/${item._id}`} key={item._id}>
                {item._id}
              </Link>
            ))
          )}

          {/* Footer */}
          <div className="footer-card">
            <Link to="/courses/">Back to list</Link>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = (dispatch) => {
  return {
    actionsCourse: bindActionCreators(CourseActions, dispatch),
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsTeacher: bindActionCreators(TeacherActions, dispatch),
    actionsStudent: bindActionCreators(StudentActions, dispatch)
  };
};

// Validate types
CourseEdit.propTypes = {
  actionsCourse: PropTypes.object.isRequired,
  actionsExam: PropTypes.object.isRequired,
  actionsTeacher: PropTypes.object.isRequired,
  actionsStudent: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  listExam: PropTypes.array.isRequired,
  listStudent: PropTypes.array.isRequired,
  listTeacher: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    course: state.CourseReducer.course,
    listExam: state.ExamReducer.list,
    listStudent: state.StudentReducer.list,
    listTeacher: state.TeacherReducer.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
