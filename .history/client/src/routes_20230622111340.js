import React, { Component } from "react";
import { Fragment } from "react";
import { Route, Switch } from "react-router";
import { PrivateRoute } from "./security/PrivateRoute";

import Paper from "@material-ui/core/Paper";

import CourseEdit from "./pages/CourseEdit";
import CourseList from "./pages/CourseList";
import ExamEdit from "./pages/ExamEdit";
import ExamList from "./pages/ExamList";
import StudentEdit from "./pages/StudentEdit";
import StudentList from "./pages/StudentList";
import TeacherEdit from "./pages/TeacherEdit";
import TeacherList from "./pages/TeacherList";

import UserApi from "./api/UserApi";
import CourseApi from "./api/CourseApi";
import ExamApi from "./api/ExamApi";
import StudentApi from "./api/StudentApi";
import TeacherApi from "./api/TeacherApi";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Fragment>
          <Paper>
            <div className="main-container">
              {/* Existing routes */}
              {/* ... */}

              {/* Custom routes using APIs and models */}
              <PrivateRoute
                exact
                path="/courses/:id"
                render={(props) => (
                  <CourseEdit
                    {...props}
                    courseApi={CourseApi}
                    studentApi={StudentApi}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/courses"
                render={(props) => (
                  <CourseList {...props} courseApi={CourseApi} />
                )}
              />
              <PrivateRoute
                exact
                path="/exams/:id"
                render={(props) => (
                  <ExamEdit
                    {...props}
                    examApi={ExamApi}
                    studentApi={StudentApi}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/exams"
                render={(props) => <ExamList {...props} examApi={ExamApi} />}
              />
              <PrivateRoute
                exact
                path="/students/:id"
                render={(props) => (
                  <StudentEdit
                    {...props}
                    studentApi={StudentApi}
                    courseApi={CourseApi}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/students"
                render={(props) => (
                  <StudentList {...props} studentApi={StudentApi} />
                )}
              />
              <PrivateRoute
                exact
                path="/teachers/:id"
                render={(props) => (
                  <TeacherEdit
                    {...props}
                    teacherApi={TeacherApi}
                    courseApi={CourseApi}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/teachers"
                render={(props) => (
                  <TeacherList {...props} teacherApi={TeacherApi} />
                )}
              />

              {/* ... */}
            </div>
          </Paper>
        </Fragment>
      </Switch>
    );
  }
}

export default Routes;
