import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Custom Actions
import { fetchUser } from "../redux/actions/UserActions";

class Home extends Component {
  componentDidMount() {
    // Fetch user data when the component mounts
    this.props.fetchUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>Home</h2>

        <h3>Sitemap</h3>

        <div>
          <Link to="/students">Link to Student List</Link>
        </div>
        <div>
          <Link to="/teachers">Link to Teacher List</Link>
        </div>
        <div>
          <Link to="/courses">Link to Course List</Link>
        </div>
        <div>
          <Link to="/exams">Link to Exam List</Link>
        </div>

        <h3>User Details</h3>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = {
  fetchUser
};

// Validate types
Home.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

// Get props from state
function mapStateToProps(state) {
  return {
    user: state.UserReducer.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
