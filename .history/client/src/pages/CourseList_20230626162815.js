import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../redux/actions/CourseActions";

function CourseList(props) {
  useEffect(() => {
    if (props.list.length === 0) {
      props.actions.loadCourseList().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
  }, []); // Remove props.actions from the dependency array

  // Rest of the component code
}

function mapStateToProps(state) {
  return {
    list: state.courseList ? state.courseList.listCourse : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
