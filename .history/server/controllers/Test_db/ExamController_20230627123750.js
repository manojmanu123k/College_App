import ExamControllerGenerated from "./generated/ExamControllerGenerated";
import Properties from "../../properties";
import ExamModel from "../../models/Test_db/ExamModel";
import { authorize } from "../../security/SecurityManager";
import ErrorManager from "../../classes/ErrorManager";

const customControllers = {
  init: router => {
    const baseUrl = `${Properties.api}/exam`;
    
    // Custom route
    router.get(baseUrl + "/:id", customControllers.get);
    
    // Init super
    ExamControllerGenerated.init(router);
  },

  get: async (req, res) => {
    try {
      console.log("This is my custom controller");
      const result = await ExamModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }
};

export default {
  ...ExamControllerGenerated,
  ...customControllers
};
