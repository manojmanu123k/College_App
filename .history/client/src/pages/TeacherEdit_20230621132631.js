import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import TeacherActions from "../redux/actions/TeacherActions";
import ExamActions from "../redux/actions/ExamActions";
import CourseActions from "../redux/actions/CourseActions";

class TeacherEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsTeacher.getTeacher(this.props.match.params.id);
      this.props.actionsExam.findBy_teacher(this.props.match.params.id);
    }
    
    this.props.actionsCourse.listCourses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teacher !== this.props.teacher) {
      this.setState({
        teacher: this.props.teacher
      });
    }
  }

  save(event) {
    event.preventDefault();
    if (this.state.teacher._id) {
      this.props.actionsTeacher.updateTeacher(this.state.teacher).then(() => {
        this.props.history.push("/teachers/");
      });
    } else {
      this.props.actionsTeacher.createTeacher(this.state.teacher).then(() => {
        this.props.history.push("/teachers/");
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Teacher Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="lastname"
            label="Lastname"
            value={this.state.teacher.lastname || ""}
            onChange={Utils.handleChange.bind(this, "teacher")}
            margin="normal"
            fullWidth
            required
            error={!this.state.teacher.lastname || this.state.teacher.lastname === ""}
          />
          <TextField
            id="name"
            label="Name"
            value={this.state.teacher.name || ""}
            onChange={Utils.handleChange.bind(this, "teacher")}
            margin="normal"
            fullWidth
            required
            error={!this.state.teacher.name || this.state.teacher.name === ""}
          />
          
          {/* RELATIONS */}
          <h2 className="mb-20">Relations</h2>
          
          {/* Relation m:m _courses with course */}
          <FormControl fullWidth className="mb-20">
            <InputLabel htmlFor="_courses">_courses</InputLabel>
            <Select
              multiple
              value={this.state.teacher._courses || []}
              onChange={Utils.handleChangeSelect.bind(this, "teacher")}
              input={<Input id="_courses" name="_courses" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {this.props.listCourse.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  style={{
                    fontWeight: this.state.teacher._courses && this.state.teacher._courses.indexOf(item._id) === -1
                      ? "regular"
                      : "bold"
                  }}
                >
                  {item._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with exam */}
          <h3>Exam</h3>
          {this.props.listExam.length === 0 ? (
            <div>No Exam associated</div>
          ) : (
            this.props.listExam.map((item) => (
              <Link to={"/exams/" + item._id} key={item._id}>
                {item._id}
              </Link>
            ))
          )}
          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/teachers/">Back to list</Link>
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
    actionsTeacher: bindActionCreators(TeacherActions, dispatch),
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsCourse: bindActionCreators(CourseActions, dispatch)
  };
};

TeacherEdit.propTypes = {
  actionsTeacher: PropTypes.object.isRequired,
  actionsExam: PropTypes.object.isRequired,
  actionsCourse: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  listCourse: PropTypes.array.isRequired,
  listExam: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    teacher: state.TeacherReducer.teacher,
    listCourse: state.CourseReducer.list,
    listExam: state.ExamReducer.list
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherEdit);
