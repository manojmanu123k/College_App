import * as types from "../actionTypes";
import ExamApi from "../../api/ExamApi";

export const loadExamList = () => {
  return function(dispatch) {
    return ExamApi.getExamList()
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
