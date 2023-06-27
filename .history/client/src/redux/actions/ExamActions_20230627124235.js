import * as types from "../actionTypes";
import ExamApi from "../../api/ExamApi";

export const loadExamList = () => {
  return function(dispatch) {
    return ExamApi.getExamList()
      .then(list => {
        dispatch(loadExamSuccess(list));
      })
      .catch(error => {
        dispatch(loadExamFailure(error));
      });
  };
};

const loadExamSuccess = (list) => {
  return {
    type: types.LIST_EXAM_SUCCESS,
    payload: list
  };
};

const loadExamFailure = (error) => {
  return {
    type: types.LIST_EXAM_FAILURE,
    error: error
  };
};

export default {
  loadExamList
};
