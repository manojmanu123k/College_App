// Express
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import path from "path";

// Swagger
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

// Logging
import Logger from "/..../classes/Logger";

// Properties
import properties from "../properties.js";

// Security
import cors from "cors";
import helmet from "helmet";

// Controllers
import SecurityController from "../controllers/SecurityController";

// Start Import Controllers

// Database
import Database_Test_db from "./Database_Test_db.js";

// Controllers
import UserController from "../controllers/Test_db/UserController";
import CourseController from "../controllers/Test_db/CourseController";
import ExamController from "../controllers/Test_db/ExamController";
import StudentController from "../controllers/Test_db/StudentController";
import TeacherController from "../controllers/Test_db/TeacherController";

// End Import Controllers

class Server {
  constructor() {
    this.app = express();
  }

  /**
   * Start the server
   * @returns {Promise<void>}
   */
  async init() {
    Logger.info("Starting the server...");

    // Start Init Database
    await Database_Test_db.init();
    // End Init Database

    // Add parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Logger.expressMiddleware);

    // Security
    this.app.use(helmet());
    this.app.use(cors());

    // Swagger
    const swaggerDocument = yaml.load("./swagger.yaml");
    this.app.use(
      `${properties.api}/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    // Serve frontend files
    this.app.use(express.static(properties.publicPath));

    // Redirect frontend
    this.app.use("*", (req, res, next) => {
      if (
        req.originalUrl &&
        !req.originalUrl.startsWith("/api/") &&
        req.originalUrl.indexOf(".") === -1
      ) {
        res.status(200).sendFile(
          path.resolve(
            __dirname,
            "..",
            properties.publicPath,
            "index.html"
          )
        );
      } else {
        next();
      }
    });

    // Import controllers
    const router = express.Router();
    SecurityController.init(router);

    // Start Init Controllers
    UserController.init(router);
    CourseController.init(router);
    ExamController.init(router);
    StudentController.init(router);
    TeacherController.init(router);
    // End Init Controllers

    this.app.use("/", router);

    // Start App Server
    const server = http.createServer(this.app);
    server.listen(properties.port, () => {
      Logger.info(`Server started on port ${properties.port}`);
      Logger.info(
        `Swagger docs at http://localhost:${properties.port}${properties.api}/docs`
      );
    });
  }
}

export default new Server();
