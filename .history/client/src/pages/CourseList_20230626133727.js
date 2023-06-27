import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../redux/actions/courseActions";

function CourseList(props) {
  useEffect(() => {
    if (props.list.length === 0) {
      props.actions.loadCourseList().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
  }, [props.actions]);

  // Rest of the component code
}

function mapStateToProps(state, ownProps) {
  return {
    list: state.courseListReducer.listCourse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
