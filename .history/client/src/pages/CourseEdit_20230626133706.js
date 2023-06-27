import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../redux/actions/CourseActions";
import * as examActions from "../redux/actions/ExamActions";
import * as teacherActions from "../redux/actions/TeacherActions";
import * as studentActions from "../redux/actions/StudentActions";
import Utils from "../utils/utils";

function CourseEdit(props) {
  useEffect(() => {
    const courseId = props.match.params.id;
    if (courseId) {
      props.courseActions.getCourse(courseId).catch((error) => {
        alert("Loading course failed" + error);
      });
    }

    if (props.listExam.length === 0) {
      props.examActions.loadExamList().catch((error) => {
        alert("Loading exams failed" + error);
      });
    }

    if (props.listStudent.length === 0) {
      props.studentActions.loadStudentList().catch((error) => {
        alert("Loading students failed" + error);
      });
    }

    if (props.listTeacher.length === 0) {
      props.teacherActions.loadTeacherList().catch((error) => {
        alert("Loading teachers failed" + error);
      });
    }
  }, [props.courseActions, props.examActions, props.studentActions, props.teacherActions]);

  // Rest of the component code
}

function mapStateToProps(state, ownProps) {
  return {
    course: state.courseReducer.course,
    listExam: state.examReducer.list,
    listStudent: state.studentReducer.list,
    listTeacher: state.teacherReducer.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    examActions: bindActionCreators(examActions, dispatch),
    studentActions: bindActionCreators(studentActions, dispatch),
    teacherActions: bindActionCreators(teacherActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
