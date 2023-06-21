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
  componentDidMount() {
    this.props.actionsCourse.getAllCourses();
  }

  // Delete data
  delete(id) {
    this.props.actionsCourse.deleteCourse(id).then(() => {
      this.props.actionsCourse.getAllCourses();
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

        <DialogDelete actionsCourse={this.props.actionsCourse} />

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
  actionsCourse: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.CourseReducer.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
