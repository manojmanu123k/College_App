import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import Utils from "../utils/Utils";
import ExamActions from "../redux/actions/ExamActions";

class ExamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: {
        _id: "",
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
    const { actionsExam, actionsCourse, actionsStudent, actionsTeacher } = this.props;
    actionsExam.loadExamList();
    actionsCourse.loadCourseList();
    actionsStudent.loadStudentList();
    actionsTeacher.loadTeacherList();
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

const mapStateToProps = (state) => {
  return {
    exam: state.examEditReducer.exam,
    listCourse: state.examEditReducer.listCourse,
    listStudent: state.examEditReducer.listStudent,
    listTeacher: state.examEditReducer.listTeacher
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsCourse: bindActionCreators(CourseActions, dispatch),
    actionsStudent: bindActionCreators(StudentActions, dispatch),
    actionsTeacher: bindActionCreators(TeacherActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamEdit);
