// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";

// Table
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions
import CourseActions from "../redux/actions/CourseActions";

class CourseList extends Component {
  // Init component
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      idDelete: null
    };
  }

  // Load data on start
  componentDidMount() {
    this.props.actionsCourse.list();
  }

  // Delete data
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsCourse.delete(id).then(() => {
      this.props.actionsCourse.list();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  // Show content
  render() {
    const columns = [
      {
        id: "name",
        type: "string",
        label: "Name"
      }
    ];
    const link = "/courses/";

    return (
      <div>
        <h1>Course List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        <div className="footer-card">
          <Link to="/courses/new">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = (dispatch) => {
  return {
    actionsCourse: bindActionCreators(CourseActions, dispatch)
  };
};

// Validate types
CourseList.propTypes = {
  actionsCourse: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.CourseReducer.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
