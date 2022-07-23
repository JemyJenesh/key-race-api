import cors from "cors";
import express from "express";

import routes from "./routes";

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use("/api", routes);

  const server = app.listen(5000, () => {
    console.log("Server started at port:5000");
  });

  return server;
};
