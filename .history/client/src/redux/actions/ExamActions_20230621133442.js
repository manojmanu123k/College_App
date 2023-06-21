import actionsFunction from "./generated/ExamActionsGenerated";
import examApi from "../../api/examApi";

// Customize the base actions overriding the object "actionsFunction" below:
actionsFunction.loadExamList = function() {
  return function(dispatch) {
    console.log("This is my custom function");
    return examApi
      .getExams()
      .then(list => {
        dispatch(actionsFunction.loadExamSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

// Export the customized actions
export default actionsFunction;
