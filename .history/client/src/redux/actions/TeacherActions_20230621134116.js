import actionsFunction from "./generated/TeacherActionsGenerated";
import teacherApi from "../../api/TeacherApi";

// Customize the base actions overriding the object "actionsFunction" below:
actionsFunction.loadTeacherList = function() {
  return function(dispatch) {
    console.log("This is my custom function");
    return teacherApi
      .getTeachers()
      .then(list => {
        dispatch(actionsFunction.loadTeacherSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

// Export the customized actions
export default actionsFunction;
