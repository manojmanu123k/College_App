import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadExamList } from "../redux/actions/ExamActions";

class ExamList extends Component {
  componentDidMount() {
    this.props.loadExamList();
  }

  render() {
    const { exams } = this.props;

    return (
      <div>
        <h1>Exam List</h1>
        <ul>
          {exams.map((exam) => (
            <li key={exam.id}>{exam.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exams: state.examList.listExam
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loadExamList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
