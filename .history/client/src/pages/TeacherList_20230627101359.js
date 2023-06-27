import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import EnhancedTable from "../components/EnhancedTable";
import TeacherActions from "../redux/actions/TeacherActions";

class TeacherList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      idDelete: null
    };
  }

  componentDidMount() {
    this.props.actions.loadTeacherList();
  }

  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actions.deleteTeacher(id).then(() => {
      this.props.actions.loadTeacherList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  render() {
    const columns = [
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
    const link = "/teachers/";

    return (
      <div>
        <h1>Teacher List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={() => this.confirmDialogDelete(this.state.idDelete)}
        />

        <div className="footer-card">
          <Link to="/teachers/new">
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
    actions: bindActionCreators(TeacherActions, dispatch)
  };
};

TeacherList.propTypes = {
  actions: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    list: state.TeacherListReducer.listTeacher
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);
