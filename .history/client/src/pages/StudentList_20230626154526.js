import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import EnhancedTable from "../components/EnhancedTable";
import StudentActions from "../redux/actions/StudentActions";
import StudentListReducer from "../redux/reducers/StudentListReducer";
import StudentEditReducer from "../redux/reducers/StudentEditReducer";


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      idDelete: null
    };
  }

  componentDidMount() {
    this.props.actionsStudent.listStudents();
  }

  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsStudent.deleteStudent(id).then(() => {
      this.props.actionsStudent.listStudents();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  render() {
    const columns = [
      {
        id: "DOB",
        type: "date",
        label: "DOB"
      },
      {
        id: "lastname",
        type: "string",
        label: "Lastname"
      },
      {
        id: "name",
        type: "string",
        label: "Name"
      }
    ];
    const link = "/students/";

    return (
      <div>
        <h1>Student List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this, this.state.idDelete)}
        />

        <div className="footer-card">
          <Link to="/students/new">
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
    actionsStudent: bindActionCreators(StudentActions, dispatch)
  };
};

StudentList.propTypes = {
  actionsStudent: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    list: state.studentList.list
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
