import actionsFunction from "./generated/TeacherActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import teacherApi from "../../api/teacherApi";
 import actionsFunction from "./generated/TeacherActionsGenerated";
import teacherApi from "../../api/teacherApi";

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

 actionsFunction.loadteacherList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return teacherApi
     .getteacherList()
     .then(list => {
       dispatch(actionsFunction.loadteacherSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
