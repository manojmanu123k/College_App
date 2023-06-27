import actionsFunction from "./generated/StudentActionsGenerated";
import studentApi from "../../api/StudentApi";

// Customize the base actions overriding the object "actionsFunction" below:
actionsFunction.loadStudentList = function() {
  return function(dispatch) {
    console.log("This is my custom function");
    return studentApi
      .getStudents()
      .then(list => {
        dispatch(actionsFunction.loadStudentSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

// Export the customized actions
export default actionsFunction;
