import * as types from "../actionTypes";
import examApi from "../../api/ExamApi";

export const loadExamList = () => {
  return function(dispatch) {
    console.log("This is my custom function");
    return examApi
      .getExams()
      .then(list => {
        dispatch(loadExamSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

const loadExamSuccess = (list) => {
  return {
    type: types.LIST_EXAM_SUCCESS,
    payload: list
  };
};

export default {
  loadExamList
};
