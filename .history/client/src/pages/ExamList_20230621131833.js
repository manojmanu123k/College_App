import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions
import ExamActions from "../redux/actions/ExamActions";

class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      idDelete: null
    };
  }

  componentDidMount() {
    this.props.actionsExam.getAllExams();
  }

  deleteExam(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete() {
    this.props.actionsExam.deleteExam(this.state.idDelete).then(() => {
      this.props.actionsExam.getAllExams();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  render() {
    const columns = [
      {
        id: "place",
        type: "string",
        label: "Place"
      },
      {
        id: "score",
        type: "number",
        label: "Score"
      },
      {
        id: "valid",
        type: "boolean",
        label: "Valid"
      }
    ];
    const link = "/exams/";

    return (
      <div>
        <h1>Exam List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.deleteExam.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        <div className="footer-card">
          <Link to="/exams/new">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionsExam: bindActionCreators(ExamActions, dispatch)
  };
};

ExamList.propTypes = {
  actionsExam: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    list: state.ExamReducer.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
