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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Custom Actions
import ExamActions from "../redux/actions/ExamActions";
import StudentActions from "../redux/actions/StudentActions";
import CourseActions from "../redux/actions/CourseActions";
import TeacherActions from "../redux/actions/TeacherActions";

class ExamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: {
        place: "",
        score: "",
        valid: false,
        _course: "",
        _student: "",
        _teacher: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsExam.getExam(this.props.match.params.id);
    }

    this.props.actionsCourse.getAllCourses();
    this.props.actionsStudent.getAllStudents();
    this.props.actionsTeacher.getAllTeachers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exam !== this.props.exam) {
      this.setState({ exam: this.props.exam });
    }
  }

  save(event) {
    event.preventDefault();
    const { exam } = this.state;
    if (exam._id) {
      this.props.actionsExam.updateExam(exam).then(() => {
        this.props.history.push("/exams/");
      });
    } else {
      this.props.actionsExam.createExam(exam).then(() => {
        this.props.history.push("/exams/");
      });
    }
  }

  render() {
    const { exam } = this.state;
    const { listCourse, listStudent, listTeacher } = this.props;

    return (
      <div>
        <h1>Exam Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="place"
            label="Place"
            value={exam.place || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="score"
            label="Score"
            value={exam.score || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            type="number"
            margin="normal"
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                id="valid"
                checked={exam.valid || false}
                onChange={Utils.handleChangeCheck.bind(this, "exam", "valid")}
                color="primary"
              />
            }
            label="Valid"
            className="mt-20"
          />

          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>

          {/* Relation 1:m _course with course */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_course">
              Course
            </InputLabel>
            <Select
              value={exam._course || ""}
              onChange={Utils.handleChangeSelect.bind(this, "exam")}
              inputProps={{
                id: "_course",
                name: "_course"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listCourse &&
                listCourse.map((course) => (
                  <MenuItem value={course._id} key={course._id}>
                    {course.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Relation 1:m _student with student */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_student">
              Student
            </InputLabel>
            <Select
              value={exam._student || ""}
              onChange={Utils.handleChangeSelect.bind(this, "exam")}
              inputProps={{
                id: "_student",
                name: "_student"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listStudent &&
                listStudent.map((student) => (
                  <MenuItem value={student._id} key={student._id}>
                    {student.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Relation 1:m _teacher with teacher */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_teacher">
              Teacher
            </InputLabel>
            <Select
              value={exam._teacher || ""}
              onChange={Utils.handleChangeSelect.bind(this, "exam")}
              inputProps={{
                id: "_teacher",
                name: "_teacher"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listTeacher &&
                listTeacher.map((teacher) => (
                  <MenuItem value={teacher._id} key={teacher._id}>
                    {teacher.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Footer */}
          <div className="footer-card">
            <Link to="/exams/">Back to list</Link>

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
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsStudent: bindActionCreators(StudentActions, dispatch),
    actionsCourse: bindActionCreators(CourseActions, dispatch),
    actionsTeacher: bindActionCreators(TeacherActions, dispatch)
  };
};

ExamEdit.propTypes = {
  actionsExam: PropTypes.object.isRequired,
  actionsStudent: PropTypes.object.isRequired,
  actionsCourse: PropTypes.object.isRequired,
  actionsTeacher: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired,
  listCourse: PropTypes.array.isRequired,
  listStudent: PropTypes.array.isRequired,
  listTeacher: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    exam: state.ExamReducer.exam,
    listCourse: state.CourseReducer.list,
    listStudent: state.StudentReducer.list,
    listTeacher: state.TeacherReducer.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamEdit);
