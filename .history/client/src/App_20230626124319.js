import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseEdit from "./pages/CourseEdit";
import CourseList from "./pages/CourseList";
import ExamEdit from "./pages/ExamEdit";
import ExamList from "./pages/ExamList";
import StudentEdit from "./pages/StudentEdit";
import StudentList from "./pages/StudentList";
import TeacherEdit from "./pages/TeacherEdit";
import TeacherList from "./pages/TeacherList";

class App extends Component {
  componentDidMount() {
    // Perform any necessary token verification or initialization here
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/courses" component={CourseList} />
            <Route exact path="/courses/:id" component={CourseEdit} />
            <Route exact path="/exams" component={ExamList} />
            <Route exact path="/exams/:id" component={ExamEdit} />
            <Route exact path="/students" component={StudentList} />
            <Route exact path="/students/:id" component={StudentEdit} />
            <Route exact path="/teachers" component={TeacherList} />
            <Route exact path="/teachers/:id" component={TeacherEdit} />
            {/* Add more routes if needed */}
          </Switch>
          <Footer />
        </Fragment>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
