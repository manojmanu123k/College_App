import actionsFunction from "./generated/CourseActionsGenerated";
import courseApi from "../../api/CourseApi";

// Customize the base actions overriding the object "actionsFunction" below:
actionsFunction.loadCourseList = function() {
  return function(dispatch) {
    console.log("This is my custom function");
    return courseApi
      .getCourses()
      .then(list => {
        dispatch(actionsFunction.loadCourseSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

// Export the customized actions
export default actionsFunction;
