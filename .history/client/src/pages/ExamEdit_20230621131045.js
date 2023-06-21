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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Custom Actions
import ExamActions from "../redux/actions/ExamActions";
import StudentActions from "../redux/actions/StudentActions";
import CourseActions from "../redux/actions/CourseActions";
import TeacherActions from "../redux/actions/TeacherActions";

class ExamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsExam.get(this.props.match.params.id);
    }

    this.props.actionsCourse.list();
    this.props.actionsStudent.list();
    this.props.actionsTeacher.list();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ exam: nextProps.exam });
  }

  save(event) {
    event.preventDefault();
    if (this.state.exam._id) {
      this.props.actionsExam.update(this.state.exam).then(() => {
        this.props.history.push("/exams/");
      });
    } else {
      this.props.actionsExam.create(this.state.exam).then(() => {
        this.props.history.push("/exams/");
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Exam Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="place"
            label="Place"
            value={this.state.exam.place || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="score"
            label="Score"
            value={this.state.exam.score || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            type="number"
            margin="normal"
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                id="valid"
                checked={this.state.exam.valid || false}
                onChange={Utils.handleChangeCheck.bind(this, "exam", "valid")}
                color="primary"
              />
            }
            label="valid"
            className="mt-20"
          />

          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>

          {/* Relation 1:m _course with course */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_course">
              _course
            </InputLabel>
            <Select
              value={this.state.exam._course || ""}
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
              {this.props.listCourse &&
                this.props.listCourse.map(row => (
                  <MenuItem value={row._id} key={row._id}>
                    {row._id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Relation 1:m _student with student */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_student">
              _student
            </InputLabel>
            <Select
              value={this.state.exam._student || ""}
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
              {this.props.listStudent &&
                this.props.listStudent.map(row => (
                  <MenuItem value={row._id} key={row._id}>
                    {row._id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Relation 1:m _teacher with teacher */}

          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_teacher">
              _teacher
            </InputLabel>
            <Select
              value={this.state.exam._teacher || ""}
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
              {this.props.listTeacher &&
                this.props.listTeacher.map(row => (
                  <MenuItem value={row._id} key={row._id}>
                    {row._id}
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

const mapDispatchToProps = dispatch => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamEdit);
