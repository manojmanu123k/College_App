import express from "express";
import http from "http";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import Logger from "./Logger";
import properties from "../properties.js";
import cors from "cors";
import helmet from "helmet";
import SecurityController from "../controllers/SecurityController";
import Database_Test_db from "./Database_Test_db.js";
import UserController from "../controllers/Test_db/UserController";
import CourseController from "../controllers/Test_db/CourseController";
import ExamController from "../controllers/Test_db/ExamController";
import StudentController from "../controllers/Test_db/StudentController";
import TeacherController from "../controllers/Test_db/TeacherController";

class Server {
  constructor() {
    this.app = express();
  }

  async init() {
    this.setupMiddleware();
    await this.initDatabase();
    this.setupSwagger();
    this.setupStaticFiles();
    await this.startServer();
    this.initControllers();
  }

  setupMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Logger.expressMiddleware);
    this.app.use(helmet());
    this.app.use(cors());
  }

  async initDatabase() {
    await Database_Test_db.init();
  }

  setupSwagger() {
    const swaggerDocument = yaml.load("./swagger.yaml");
    this.app.use(
      properties.api + "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  setupStaticFiles() {
    this.app.use(express.static(properties.publicPath));
    this.app.use("*", (req, res, next) => {
      if (req.originalUrl) {
        let url = req.originalUrl;
        if (!url.startsWith("/api/") && url.indexOf(".") == -1) {
          res.sendFile(
            path.resolve(
              __dirname +
                "//..//" +
                properties.publicPath.replace(/\//g, "//") +
                "//index.html"
            )
          );
        } else {
          next();
        }
      } else {
        next();
      }
    });
  }

  async startServer() {
    const server = http.Server(this.app);
    await server.listen(properties.port);
    Logger.info("Server started on port " + properties.port);
    Logger.info(
      "Swagger docs at http://localhost:" +
        properties.port +
        properties.api +
        "/docs"
    );
  }

  initControllers() {
    const router = express.Router();
    SecurityController.init(router);
    UserController.init(router);
    CourseController.init(router);
    ExamController.init(router);
    StudentController.init(router);
    TeacherController.init(router);
    this.app.use("/", router);
  }
}

export default new Server();
