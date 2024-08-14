import { Router } from "express";
import CriminalController from "../controllers/criminal.controller";

const routes = () => {
  const router = Router();
  const controller = new CriminalController();
  
  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.show);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default routes;